import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

// GET - Get wallet balance
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

    // Get user with wallet info
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        walletBalance: true,
        totalEarnings: true,
        isEligibleForMLM: true,
      },
    });

    // Get pending withdrawals
    const pendingWithdrawals = await prisma.withdrawRequest.aggregate({
      where: {
        userId: user.id,
        status: 'PENDING',
      },
      _sum: {
        amount: true,
      },
    });

    // Get total withdrawn
    const totalWithdrawn = await prisma.withdrawRequest.aggregate({
      where: {
        userId: user.id,
        status: 'COMPLETED',
      },
      _sum: {
        amount: true,
      },
    });

    return NextResponse.json({
      success: true,
      wallet: {
        balance: userData?.walletBalance || 0,
        totalEarnings: userData?.totalEarnings || 0,
        isEligibleForMLM: userData?.isEligibleForMLM || false,
        pendingWithdrawals: pendingWithdrawals._sum.amount || 0,
        totalWithdrawn: totalWithdrawn._sum.amount || 0,
      },
    });
  } catch (error: any) {
    console.error('Get wallet error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch wallet' },
      { status: 500 }
    );
  }
}

// POST - Request withdrawal
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { amount, bankDetails } = body;

    if (!amount || amount < 500) {
      return NextResponse.json(
        { error: 'Minimum withdrawal amount is ₹500' },
        { status: 400 }
      );
    }

    // Check user balance
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: { walletBalance: true },
    });

    if (!userData || userData.walletBalance < amount) {
      return NextResponse.json(
        { error: 'Insufficient wallet balance' },
        { status: 400 }
      );
    }

    // Create withdrawal request
    const withdrawal = await prisma.withdrawRequest.create({
      data: {
        userId: user.id,
        amount,
        bankDetails,
        status: 'PENDING',
      },
    });

    // Deduct from wallet
    await prisma.user.update({
      where: { id: user.id },
      data: {
        walletBalance: {
          decrement: amount,
        },
      },
    });

    // Create transaction record
    await prisma.transaction.create({
      data: {
        userId: user.id,
        type: 'WITHDRAWAL',
        amount: -amount,
        description: `Withdrawal request #${withdrawal.id.slice(-8).toUpperCase()}`,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Withdrawal request submitted successfully',
      withdrawal,
    });
  } catch (error: any) {
    console.error('Withdrawal error:', error);
    return NextResponse.json(
      { error: error.message || 'Withdrawal failed' },
      { status: 500 }
    );
  }
}
