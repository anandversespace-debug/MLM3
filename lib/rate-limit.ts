import { NextRequest, NextResponse } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory rate limit store (use Redis in production)
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Rate limiting configuration
 */
const RATE_LIMITS = {
  // Authentication endpoints - stricter limits
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 10,
  },
  // API endpoints - moderate limits
  API: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
  },
  // General endpoints - relaxed limits
  GENERAL: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 200,
  },
  // Payment endpoints - very strict
  PAYMENT: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 50,
  },
};

/**
 * Clean up expired entries periodically
 */
function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupExpiredEntries, 5 * 60 * 1000);

/**
 * Rate limiting middleware
 */
export function rateLimit(request: NextRequest, type: 'AUTH' | 'API' | 'GENERAL' | 'PAYMENT' = 'GENERAL') {
  try {
    const config = RATE_LIMITS[type];
    const now = Date.now();
    
    // Get client identifier (IP address)
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Create rate limit key
    const key = `${type}:${ip}`;
    
    // Get or create rate limit entry
    let entry = rateLimitStore.get(key);
    
    if (!entry || entry.resetTime < now) {
      // Create new entry
      entry = {
        count: 1,
        resetTime: now + config.windowMs,
      };
      rateLimitStore.set(key, entry);
    } else {
      // Increment count
      entry.count++;
      rateLimitStore.set(key, entry);
      
      // Check if limit exceeded
      if (entry.count > config.maxRequests) {
        const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
        
        return {
          limited: true,
          retryAfter,
          response: NextResponse.json(
            {
              success: false,
              error: 'Too many requests. Please try again later.',
              retryAfter,
            },
            {
              status: 429,
              headers: {
                'Retry-After': retryAfter.toString(),
                'X-RateLimit-Limit': config.maxRequests.toString(),
                'X-RateLimit-Remaining': '0',
                'X-RateLimit-Reset': entry.resetTime.toString(),
              },
            }
          ),
        };
      }
    }
    
    // Return rate limit headers
    const remaining = Math.max(0, config.maxRequests - entry.count);
    
    return {
      limited: false,
      headers: {
        'X-RateLimit-Limit': config.maxRequests.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': entry.resetTime.toString(),
      },
    };
  } catch (error) {
    console.error('Rate limiting error:', error);
    // Fail open - allow request if rate limiting fails
    return { limited: false, headers: {} };
  }
}

/**
 * Get client IP address
 */
export function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for') || 
         request.headers.get('x-real-ip') || 
         'unknown';
}

/**
 * Check if IP is suspicious (basic fraud detection)
 */
export function isSuspiciousIP(ip: string): boolean {
  // Implement IP blacklisting logic
  // Could integrate with services like AbuseIPDB
  const suspiciousPatterns = [
    // Add known malicious IP ranges
  ];
  
  return false;
}

/**
 * Track failed login attempts
 */
const failedLoginAttempts = new Map<string, { count: number; lockoutUntil: number }>();

export function trackFailedLogin(ip: string) {
  const now = Date.now();
  const entry = failedLoginAttempts.get(ip);
  
  if (!entry || entry.lockoutUntil < now) {
    failedLoginAttempts.set(ip, { count: 1, lockoutUntil: now + 15 * 60 * 1000 });
  } else {
    entry.count++;
    
    // Lockout after 5 failed attempts
    if (entry.count >= 5) {
      entry.lockoutUntil = now + 30 * 60 * 1000; // 30 minute lockout
      failedLoginAttempts.set(ip, entry);
    }
  }
}

export function isLockedOut(ip: string): boolean {
  const entry = failedLoginAttempts.get(ip);
  
  if (!entry) {
    return false;
  }
  
  const now = Date.now();
  
  if (entry.lockoutUntil > now) {
    return true;
  }
  
  // Lockout expired, remove entry
  failedLoginAttempts.delete(ip);
  return false;
}

export function resetFailedLogins(ip: string) {
  failedLoginAttempts.delete(ip);
}
