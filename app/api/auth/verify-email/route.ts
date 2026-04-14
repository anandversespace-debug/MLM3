import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyVerificationToken } from '@/lib/auth';
import { emailService } from '@/lib/email';
import { z } from 'zod';

const verifySchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = verifySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid input', errors: validation.error.issues },
        { status: 400 }
      );
    }

    const { token } = validation.data;

    // Verify token
    const email = verifyVerificationToken(token);

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired verification link' },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    if (user.isEligibleForMLM) {
        return NextResponse.json(
          { success: true, message: 'Email has already been verified' },
          { status: 200 }
        );
    }

    // Update user: activate and make eligible for MLM
    await prisma.user.update({
      where: { email },
      data: {
        isEligibleForMLM: true, // Assuming this serves as our verification flag
        isActive: true,
      },
    });

    // Send Welcome Email natively!
    await emailService.sendWelcome(user.email, user.name, user.referralCode || 'N/A');

    return NextResponse.json({
      success: true,
      message: 'Email successfully verified!',
    });
  } catch (error: any) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Verification failed computationally',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
