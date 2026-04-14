import { prisma } from './prisma';
import { getCommissionPercent } from '../utils/helpers';
import { emailService } from './email';

/**
 * Build referral network when a new user registers with a referral code
 */
export async function buildReferralNetwork(newUserId: string, referralCode: string) {
  try {
    // Find the user who owns the referral code
    const referrer = await prisma.user.findUnique({
      where: { referralCode },
    });

    if (!referrer) {
      throw new Error('Invalid referral code');
    }

    // Create level 1 relationship
    await prisma.referralNetwork.create({
      data: {
        uplineId: referrer.id,
        downlineId: newUserId,
        level: 1,
      },
    });

    // Get referrer's upline chain and create relationships for levels 2-10
    let currentUplineId = referrer.referredBy;
    let level = 2;

    while (currentUplineId && level <= 10) {
      await prisma.referralNetwork.create({
        data: {
          uplineId: currentUplineId,
          downlineId: newUserId,
          level,
        },
      });

      // Get the next upline
      const uplineUser = await prisma.user.findUnique({
        where: { id: currentUplineId },
        select: { referredBy: true },
      });

      currentUplineId = uplineUser?.referredBy || null;
      level++;
    }

    // Update the new user's referredBy field
    await prisma.user.update({
      where: { id: newUserId },
      data: {
        referredBy: referrer.id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error building referral network:', error);
    throw error;
  }
}

/**
 * Get upline chain for a user (up to 10 levels)
 */
export async function getUplineChain(userId: string, maxLevel: number = 10) {
  const uplineChain: Array<{ userId: string; level: number; isEligibleForMLM: boolean; email: string; name: string }> = [];

  let currentUserId = userId;
  
  for (let level = 1; level <= maxLevel; level++) {
    const network = await prisma.referralNetwork.findFirst({
      where: {
        downlineId: currentUserId,
        level,
      },
      select: {
        upline: {
          select: {
            id: true,
            isEligibleForMLM: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!network?.upline) break;

    uplineChain.push({
      userId: network.upline.id,
      level,
      isEligibleForMLM: network.upline.isEligibleForMLM,
      email: network.upline.email,
      name: network.upline.name,
    });

    // Get the next downline to traverse up
    const nextNetwork = await prisma.referralNetwork.findFirst({
      where: {
        downlineId: network.upline.id,
        level: 1,
      },
    });

    if (!nextNetwork) break;
    currentUserId = nextNetwork.uplineId;
  }

  return uplineChain;
}

/**
 * Distribute commissions to upline members after a successful purchase
 */
export async function distributeCommissions(
  orderId: string,
  buyerId: string,
  orderAmount: number
) {
  try {
    // Get buyer's upline chain
    const uplineChain = await getUplineChain(buyerId, 10);

    const commissions: any[] = [];

    for (const upline of uplineChain) {
      // Skip if not eligible for MLM commissions
      if (!upline.isEligibleForMLM) continue;

      // Get commission percentage for this level
      const commissionPercent = getCommissionPercent(upline.level);
      
      // Calculate commission amount
      const commissionAmount = (orderAmount * commissionPercent) / 100;

      // Create commission record
      const commission = await prisma.commission.create({
        data: {
          userId: upline.userId,
          fromUserId: buyerId,
          level: upline.level,
          amount: commissionAmount,
          orderId,
          status: 'CREDITED',
        },
      });

      // Add to user's wallet
      await prisma.user.update({
        where: { id: upline.userId },
        data: {
          walletBalance: {
            increment: commissionAmount,
          },
          totalEarnings: {
            increment: commissionAmount,
          },
        },
      });

      // Create transaction record
      await prisma.transaction.create({
        data: {
          userId: upline.userId,
          type: 'COMMISSION',
          amount: commissionAmount,
          description: `Level ${upline.level} commission from order ${orderId}`,
          status: 'COMPLETED',
        },
      });

      // Send email notification
      await emailService.sendCommissionNotification(
        upline.email,
        upline.name,
        commissionAmount,
        upline.level
      );

      // Create in-app notification
      await prisma.notification.create({
        data: {
          userId: upline.userId,
          title: 'Commission Earned! 🎉',
          message: `You earned ₹${commissionAmount.toFixed(2)} from Level ${upline.level} referral commission.`,
          type: 'COMMISSION',
        },
      });

      commissions.push(commission);
    }

    return { success: true, commissions };
  } catch (error) {
    console.error('Error distributing commissions:', error);
    throw error;
  }
}

/**
 * Check and update user MLM eligibility (₹10,000 minimum purchase)
 */
export async function updateMLMEligibility(userId: string) {
  try {
    // Calculate total purchases
    const totalPurchases = await prisma.order.aggregate({
      where: {
        userId,
        status: {
          in: ['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'],
        },
      },
      _sum: {
        totalAmount: true,
      },
    });

    const totalAmount = totalPurchases._sum.totalAmount || 0;

    // Update eligibility if total purchases >= ₹10,000
    if (totalAmount >= 10000) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          isEligibleForMLM: true,
        },
      });

      return { eligible: true, totalAmount };
    }

    return { eligible: false, totalAmount };
  } catch (error) {
    console.error('Error updating MLM eligibility:', error);
    throw error;
  }
}

/**
 * Get user's referral network statistics
 */
export async function getReferralStats(userId: string) {
  try {
    // Get direct referrals (level 1)
    const directReferrals = await prisma.referralNetwork.count({
      where: {
        uplineId: userId,
        level: 1,
      },
    });

    // Get total referrals (all levels)
    const totalReferrals = await prisma.referralNetwork.count({
      where: {
        uplineId: userId,
      },
    });

    // Get indirect referrals
    const indirectReferrals = totalReferrals - directReferrals;

    // Get earnings by level
    const commissionsByLevel = await prisma.commission.groupBy({
      by: ['level'],
      where: {
        userId,
        status: 'CREDITED',
      },
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    });

    const earningsByLevel = commissionsByLevel.map((item: any) => ({
      level: item.level,
      amount: item._sum.amount || 0,
      count: item._count.id,
    }));

    // Get total commissions
    const totalCommissions = await prisma.commission.aggregate({
      where: {
        userId,
        status: 'CREDITED',
      },
      _sum: {
        amount: true,
      },
    });

    return {
      totalReferrals,
      directReferrals,
      indirectReferrals,
      earningsByLevel,
      totalCommissions: totalCommissions._sum.amount || 0,
    };
  } catch (error) {
    console.error('Error getting referral stats:', error);
    throw error;
  }
}

/**
 * Get user's downline network tree
 */
export async function getDownlineNetwork(userId: string) {
  try {
    const network = await prisma.referralNetwork.findMany({
      where: {
        uplineId: userId,
      },
      include: {
        downline: {
          select: {
            id: true,
            name: true,
            email: true,
            referralCode: true,
            createdAt: true,
          },
        },
      },
      orderBy: [
        { level: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return network;
  } catch (error) {
    console.error('Error getting downline network:', error);
    throw error;
  }
}
