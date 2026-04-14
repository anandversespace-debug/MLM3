import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken, generateVerificationToken } from '@/lib/auth';
import { generateReferralCode, isValidEmail } from '@/utils/helpers';
import { emailService } from '@/lib/email';
import { buildReferralNetwork } from '@/lib/mlm';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
  referralCode: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid input', errors: validation.error.issues },
        { status: 400 }
      );
    }

    const { name, email, password, phone, referralCode } = validation.data;

    // Validate email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Validate referral code if provided
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
      });

      if (!referrer) {
        return NextResponse.json(
          { success: false, message: 'Invalid referral code' },
          { status: 400 }
        );
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate unique referral code
    const userReferralCode = generateReferralCode(Date.now().toString());

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        referralCode: userReferralCode,
      },
    });

    // Build referral network if referral code provided
    if (referralCode) {
      await buildReferralNetwork(user.id, referralCode);
    }

    // Generate secure email verification token and magic link
    const verificationToken = generateVerificationToken(email);
    const domain = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';
    const verifyLink = `${domain}/verify-email?token=${verificationToken}`;

    // Send verification email
    await emailService.sendVerificationEmail(email, name, verifyLink);

    // Generate token (but user needs to verify OTP first)
    const token = generateToken(user.id, user.email, user.role);

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful. We sent a secure verification link to your email.',
        data: {
          userId: user.id,
          email: user.email,
          token,
          requiresVerification: true,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Registration failed',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
