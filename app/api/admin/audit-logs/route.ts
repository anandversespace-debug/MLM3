import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'admin';

    let logs: any[] = [];

    if (type === 'admin') {
      logs = await prisma.adminActivityLog.findMany({
        include: {
          admin: {
            select: {
              name: true,
              email: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 100,
      });
    } else {
      logs = await prisma.auditLog.findMany({
        include: {
          user: {
            select: {
              name: true,
              email: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 100,
      });
    }

    return NextResponse.json({
      success: true,
      data: logs
    });
  } catch (error) {
    console.error('Fetch audit logs error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch audit logs' },
      { status: 500 }
    );
  }
}
