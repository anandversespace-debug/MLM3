import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('accessToken')?.value || request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get user's commissions
    const commissions = await prisma.commission.findMany({
      where: { userId: user.id },
      include: {
        order: {
          select: {
            id: true,
            createdAt: true,
            totalAmount: true,
          },
        },
        fromUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, commissions });
  } catch (error: any) {
    console.error('Get commissions error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch commissions' },
      { status: 500 }
    );
  }
}
