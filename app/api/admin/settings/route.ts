import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const settings = await prisma.settings.findFirst();

    if (!settings) {
      // Create default settings if not exists
      const created = await prisma.settings.create({
        data: {}
      });
      return NextResponse.json({
        success: true,
        data: created
      });
    }

    return NextResponse.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Fetch settings error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const settings = await prisma.settings.findFirst();

    if (!settings) {
      const created = await prisma.settings.create({
        data: body
      });
      return NextResponse.json({
        success: true,
        data: created
      });
    }

    const updated = await prisma.settings.update({
      where: { id: settings.id },
      data: body
    });

    return NextResponse.json({
      success: true,
      data: updated
    });
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
