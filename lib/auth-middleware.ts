import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from './security';
import { prisma } from './prisma';

export interface AuthenticatedRequest extends NextRequest {
  userId?: string;
  userEmail?: string;
  userRole?: string;
}

/**
 * Middleware to verify JWT access token
 * Adds user info to request if valid
 */
export async function authenticateToken(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        error: 'Authentication required',
        status: 401
      };
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return {
        error: 'Invalid token format',
        status: 401
      };
    }

    // Verify token
    const decoded = verifyAccessToken(token);
    
    if (!decoded) {
      return {
        error: 'Invalid or expired token',
        status: 401
      };
    }

    // Check if token type is access
    if (decoded.type !== 'access') {
      return {
        error: 'Invalid token type',
        status: 401
      };
    }

    // Verify user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
      }
    });

    if (!user) {
      return {
        error: 'User not found',
        status: 401
      };
    }

    // Check if user is blocked
    if (user.status === 'BLOCKED') {
      return {
        error: 'Account has been blocked',
        status: 403
      };
    }

    return {
      success: true,
      userId: user.id,
      userEmail: user.email,
      userRole: user.role,
    };

  } catch (error) {
    console.error('Authentication error:', error);
    return {
      error: 'Authentication failed',
      status: 500
    };
  }
}

/**
 * Middleware to verify admin access
 */
export async function requireAdmin(request: NextRequest) {
  const auth = await authenticateToken(request);

  if (!auth.success) {
    return auth;
  }

  // Check if user has admin role
  if (auth.userRole !== 'ADMIN') {
    return {
      error: 'Admin access required',
      status: 403
    };
  }

  return auth;
}

/**
 * Middleware to verify super admin access
 */
export async function requireSuperAdmin(request: NextRequest) {
  const auth = await authenticateToken(request);

  if (!auth.success) {
    return auth;
  }

  // Check admin role and permissions
  const admin = await prisma.adminUser.findUnique({
    where: { email: auth.userEmail },
    select: {
      role: true,
      isActive: true,
    }
  });

  if (!admin) {
    return {
      error: 'Admin account not found',
      status: 403
    };
  }

  if (!admin.isActive) {
    return {
      error: 'Admin account is deactivated',
      status: 403
    };
  }

  // Only SUPER_ADMIN can perform certain actions
  if (admin.role !== 'SUPER_ADMIN') {
    return {
      error: 'Super admin access required',
      status: 403
    };
  }

  return auth;
}

/**
 * Ownership check - ensure user can only access their own resources
 */
export function checkOwnership(resourceUserId: string, authenticatedUserId: string) {
  return resourceUserId === authenticatedUserId;
}

/**
 * Role-based permission check
 */
export function checkPermission(userRole: string, requiredRole: string) {
  const roleHierarchy = {
    'USER': 0,
    'MODERATOR': 1,
    'ADMIN': 2,
    'SUPER_ADMIN': 3,
  };

  return (roleHierarchy as any)[userRole] >= (roleHierarchy as any)[requiredRole];
}
