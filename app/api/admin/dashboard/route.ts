import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Get total users
    const totalUsers = await prisma.user.count();
    
    // Get pending KYC
    const pendingKYC = await prisma.user.count({
      where: { kycStatus: 'SUBMITTED' }
    });
    
    // Get total products
    const totalProducts = await prisma.product.count();
    
    // Get total orders
    const totalOrders = await prisma.order.count();
    
    // Get total revenue
    const revenueData = await prisma.order.aggregate({
      where: {
        status: {
          in: ['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED']
        }
      },
      _sum: {
        totalAmount: true
      }
    });
    const totalRevenue = revenueData._sum.totalAmount || 0;
    
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
    
    // Get pending withdrawals
    const pendingWithdrawals = await prisma.withdrawRequest.count({
      where: {
        status: 'PENDING'
      }
    });
    
    // Get active coupons
    const activeCoupons = await prisma.coupon.count({
      where: {
        isActive: true
      }
    });
    
    // Get open support tickets
    const openTickets = await prisma.supportTicket.count({
      where: {
        status: { in: ['OPEN', 'IN_PROGRESS'] }
      }
    });
    
    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        pendingWithdrawals,
        activeCoupons,
        totalCommissions,
        pendingKYC,
        openTickets
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}
