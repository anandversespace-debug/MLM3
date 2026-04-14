import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get complete user data with stats
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        referralCode: true,
        isEligibleForMLM: true,
        walletBalance: true,
        totalEarnings: true,
        createdAt: true,
      },
    });

    // Get order count
    const orderCount = await prisma.order.count({
      where: { userId: user.id },
    });

    // Get referral count
    const referralCount = await prisma.referralNetwork.count({
      where: { uplineId: user.id },
    });

    // Get recent orders
    const recentOrders = await prisma.order.findMany({
      where: { userId: user.id },
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        totalAmount: true,
        status: true,
        paymentStatus: true,
        createdAt: true,
      },
    });

    // Get recent commissions
    const recentCommissions = await prisma.commission.findMany({
      where: { userId: user.id },
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        level: true,
        amount: true,
        createdAt: true,
        fromUser: {
          select: {
            name: true,
          },
        },
      },
    });

    // Get recent notifications
    const notifications = await prisma.notification.findMany({
      where: { userId: user.id },
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        message: true,
        type: true,
        read: true,
        createdAt: true,
      },
    });

    const unreadNotifications = notifications.filter((n: any) => !n.read).length;

    return NextResponse.json({
      success: true,
      dashboard: {
        user: userData,
        stats: {
          totalOrders: orderCount,
          totalReferrals: referralCount,
          unreadNotifications,
        },
        recentOrders,
        recentCommissions,
        notifications,
      },
    });
  } catch (error: any) {
    console.error('Get dashboard error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch dashboard' },
      { status: 500 }
    );
  }
}
