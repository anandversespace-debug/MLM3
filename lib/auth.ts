import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

/**
 * Hash password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Verify password
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Generate JWT token
 */
export function generateToken(userId: string, email: string, role: string): string {
  return jwt.sign(
    {
      userId,
      email,
      role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * Get user from token
 */
export async function getUserFromToken(token: string) {
  const decoded = verifyToken(token);
  if (!decoded) return null;

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      referralCode: true,
      role: true,
      walletBalance: true,
      totalEarnings: true,
      isEligibleForMLM: true,
      isActive: true,
    },
  });

  return user;
}

/**
 * Generate password reset token (simple approach using timestamp)
 */
export function generateResetToken(): string {
  return jwt.sign({ timestamp: Date.now() }, JWT_SECRET, { expiresIn: '1h' });
}

/**
 * Verify password reset token
 */
export function verifyResetToken(token: string): boolean {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return !!(decoded as any).timestamp;
  } catch {
    return false;
  }
}

/**
 * Generate email verification token
 */
export function generateVerificationToken(email: string): string {
  return jwt.sign({ email, purpose: 'email-verification' }, JWT_SECRET, { expiresIn: '24h' });
}

/**
 * Verify email verification token
 */
export function verifyVerificationToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded && decoded.purpose === 'email-verification' && decoded.email) {
      return decoded.email;
    }
    return null;
  } catch {
    return null;
  }
}
