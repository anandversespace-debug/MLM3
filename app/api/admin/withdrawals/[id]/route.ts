import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['APPROVED', 'REJECTED', 'PROCESSED'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    const withdrawal = await prisma.withdrawRequest.findUnique({
      where: { id }
    });

    if (!withdrawal) {
      return NextResponse.json(
        { success: false, error: 'Withdrawal not found' },
        { status: 404 }
      );
    }

    const updated = await prisma.withdrawRequest.update({
      where: { id },
      data: {
        status,
        processedAt: new Date(),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    });

    // If approved, deduct from wallet
    if (status === 'APPROVED' || status === 'PROCESSED') {
      await prisma.user.update({
        where: { id: withdrawal.userId },
        data: {
          walletBalance: {
            decrement: withdrawal.amount
          }
        }
      });

      // Create transaction record
      await prisma.transaction.create({
        data: {
          userId: withdrawal.userId,
          type: 'WITHDRAWAL',
          amount: withdrawal.amount,
          description: `Withdrawal ${status.toLowerCase()}`,
          status: 'COMPLETED',
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: updated
    });
  } catch (error) {
    console.error('Update withdrawal error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update withdrawal' },
      { status: 500 }
    );
  }
}
