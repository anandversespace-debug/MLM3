import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Get total users in network
    const totalUsers = await prisma.user.count({
      where: {
        referredBy: { not: null }
      }
    });

    // Get eligible users
    const eligibleUsers = await prisma.user.count({
      where: {
        isEligibleForMLM: true
      }
    });

    // Get total commissions
    const commissionData = await prisma.commission.aggregate({
      where: {
        status: 'CREDITED'
      },
      _sum: {
        amount: true
      }
    });
    const totalCommissions = commissionData._sum.amount || 0;

    // Get total network connections
    const totalNetworks = await prisma.referralNetwork.count();

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        eligibleUsers,
        totalCommissions,
        totalNetworks
      }
    });
  } catch (error) {
    console.error('MLM stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch MLM statistics' },
      { status: 500 }
    );
  }
}
