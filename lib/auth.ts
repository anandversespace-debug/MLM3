import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  console.error('FATAL: JWT_SECRET is missing in production environment!');
}

const USED_SECRET = JWT_SECRET || 'temporary-dev-secret-key-replace-this';
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
    USED_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, USED_SECRET);
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
  return jwt.sign({ timestamp: Date.now() }, USED_SECRET, { expiresIn: '1h' });
}

/**
 * Verify password reset token
 */
export function verifyResetToken(token: string): boolean {
  try {
    const decoded = jwt.verify(token, USED_SECRET);
    return !!(decoded as any).timestamp;
  } catch {
    return false;
  }
}

/**
 * Generate email verification token
 */
export function generateVerificationToken(email: string): string {
  return jwt.sign({ email, purpose: 'email-verification' }, USED_SECRET, { expiresIn: '24h' });
}

/**
 * Verify email verification token
 */
export function verifyVerificationToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, USED_SECRET) as any;
    if (decoded && decoded.purpose === 'email-verification' && decoded.email) {
      return decoded.email;
    }
    return null;
  } catch {
    return null;
  }
}

