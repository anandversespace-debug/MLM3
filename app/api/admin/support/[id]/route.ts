import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const ticket = await prisma.supportTicket.update({
      where: { id },
      data: {
        ...body,
        respondedAt: body.response ? new Date() : undefined,
        resolvedAt: body.status === 'RESOLVED' ? new Date() : undefined,
      }
    });

    return NextResponse.json({
      success: true,
      data: ticket
    });
  } catch (error) {
    console.error('Update support ticket error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update support ticket' },
      { status: 500 }
    );
  }
}
