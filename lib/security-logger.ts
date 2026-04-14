/**
 * Centralized logging system for security events
 */

export enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

export enum SecurityEventType {
  // Authentication
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGOUT = 'LOGOUT',
  PASSWORD_CHANGE = 'PASSWORD_CHANGE',
  PASSWORD_RESET = 'PASSWORD_RESET',
  OTP_GENERATED = 'OTP_GENERATED',
  OTP_VERIFIED = 'OTP_VERIFIED',
  TOKEN_REFRESHED = 'TOKEN_REFRESHED',
  
  // Authorization
  ACCESS_DENIED = 'ACCESS_DENIED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  ROLE_CHANGED = 'ROLE_CHANGED',
  
  // Security Violations
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  CSRF_VIOLATION = 'CSRF_VIOLATION',
  XSS_ATTEMPT = 'XSS_ATTEMPT',
  SQL_INJECTION_ATTEMPT = 'SQL_INJECTION_ATTEMPT',
  BRUTE_FORCE_DETECTED = 'BRUTE_FORCE_DETECTED',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  
  // Financial
  PAYMENT_INITIATED = 'PAYMENT_INITIATED',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  WITHDRAWAL_REQUESTED = 'WITHDRAWAL_REQUESTED',
  WITHDRAWAL_APPROVED = 'WITHDRAWAL_APPROVED',
  WITHDRAWAL_REJECTED = 'WITHDRAWAL_REJECTED',
  COMMISSION_PAID = 'COMMISSION_PAID',
  WALLET_UPDATED = 'WALLET_UPDATED',
  
  // MLM
  REFERRAL_CREATED = 'REFERRAL_CREATED',
  SELF_REFERRAL_BLOCKED = 'SELF_REFERRAL_BLOCKED',
  CIRCULAR_REFERRAL_BLOCKED = 'CIRCULAR_REFERRAL_BLOCKED',
  DUPLICATE_COMMISSION_BLOCKED = 'DUPLICATE_COMMISSION_BLOCKED',
  
  // Admin
  ADMIN_LOGIN = 'ADMIN_LOGIN',
  ADMIN_ACTION = 'ADMIN_ACTION',
  USER_BLOCKED = 'USER_BLOCKED',
  USER_UNBLOCKED = 'USER_UNBLOCKED',
  KYC_APPROVED = 'KYC_APPROVED',
  KYC_REJECTED = 'KYC_REJECTED',
  
  // System
  ERROR = 'ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  API_ERROR = 'API_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
}

export interface SecurityLogEntry {
  timestamp: Date;
  level: LogLevel;
  eventType: SecurityEventType;
  userId?: string;
  userEmail?: string;
  ipAddress?: string;
  userAgent?: string;
  resource?: string;
  action?: string;
  details?: any;
  metadata?: Record<string, any>;
}

/**
 * Log security event
 */
export async function logSecurityEvent(entry: SecurityLogEntry): Promise<void> {
  try {
    const logEntry = {
      ...entry,
      timestamp: entry.timestamp || new Date(),
    };

    // Console logging (for development)
    const logMessage = `[${logEntry.timestamp.toISOString()}] [${logEntry.level}] [${logEntry.eventType}]`;
    
    switch (logEntry.level) {
      case LogLevel.ERROR:
        console.error(logMessage, logEntry.details);
        break;
      case LogLevel.WARN:
        console.warn(logMessage, logEntry.details);
        break;
      case LogLevel.INFO:
        console.info(logMessage);
        break;
      case LogLevel.DEBUG:
        console.debug(logMessage);
        break;
    }

    // In production, send to logging service (e.g., Sentry, LogRocket, CloudWatch)
    if (process.env.NODE_ENV === 'production') {
      await sendToLoggingService(logEntry);
    }

    // Store critical security events in database
    if (shouldStoreInDatabase(logEntry)) {
      await storeSecurityLog(logEntry);
    }
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
}

/**
 * Determine if log should be stored in database
 */
function shouldStoreInDatabase(entry: SecurityLogEntry): boolean {
  const criticalEvents = [
    SecurityEventType.LOGIN_FAILED,
    SecurityEventType.ACCESS_DENIED,
    SecurityEventType.RATE_LIMIT_EXCEEDED,
    SecurityEventType.BRUTE_FORCE_DETECTED,
    SecurityEventType.SUSPICIOUS_ACTIVITY,
    SecurityEventType.PAYMENT_FAILED,
    SecurityEventType.WITHDRAWAL_REQUESTED,
    SecurityEventType.WITHDRAWAL_APPROVED,
    SecurityEventType.ADMIN_ACTION,
    SecurityEventType.ERROR,
  ];

  return criticalEvents.includes(entry.eventType) || entry.level === LogLevel.ERROR;
}

/**
 * Store security log in database
 */
async function storeSecurityLog(entry: SecurityLogEntry): Promise<void> {
  try {
    const { prisma } = await import('./prisma');
    
    await prisma.auditLog.create({
      data: {
        userId: entry.userId || null,
        action: `${entry.eventType}:${entry.action || 'unknown'}`,
        resource: entry.resource || 'system',
        ipAddress: entry.ipAddress || 'unknown',
        userAgent: entry.userAgent || 'unknown',
        details: entry.details ? JSON.stringify(entry.details) : null,
        type: 'SECURITY',
        severity: entry.level,
      },
    });
  } catch (error) {
    console.error('Failed to store security log:', error);
  }
}

/**
 * Send to external logging service
 */
async function sendToLoggingService(entry: SecurityLogEntry): Promise<void> {
  // Implement integration with your logging service
  // Examples: Sentry, LogRocket, AWS CloudWatch, Datadog
  
  if (!process.env.LOGGING_SERVICE_URL) {
    return;
  }

  try {
    await fetch(process.env.LOGGING_SERVICE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LOGGING_SERVICE_API_KEY}`,
      },
      body: JSON.stringify(entry),
    });
  } catch (error) {
    console.error('Failed to send to logging service:', error);
  }
}

/**
 * Convenience functions for common log events
 */
export const securityLogger = {
  // Authentication
  loginSuccess: (userId: string, email: string, ip: string) => 
    logSecurityEvent({
      timestamp: new Date(),
      level: LogLevel.INFO,
      eventType: SecurityEventType.LOGIN_SUCCESS,
      userId,
      userEmail: email,
      ipAddress: ip,
      action: 'user_login',
    }),

  loginFailed: (email: string, ip: string, reason?: string) => 
    logSecurityEvent({
      timestamp: new Date(),
      level: LogLevel.WARN,
      eventType: SecurityEventType.LOGIN_FAILED,
      userEmail: email,
      ipAddress: ip,
      action: 'login_failed',
      details: { reason },
    }),

  // Authorization
  accessDenied: (userId: string, resource: string, ip: string) => 
    logSecurityEvent({
      timestamp: new Date(),
      level: LogLevel.WARN,
      eventType: SecurityEventType.ACCESS_DENIED,
      userId,
      ipAddress: ip,
      resource,
      action: 'access_denied',
    }),

  // Security
  rateLimitExceeded: (ip: string, endpoint: string) => 
    logSecurityEvent({
      timestamp: new Date(),
      level: LogLevel.WARN,
      eventType: SecurityEventType.RATE_LIMIT_EXCEEDED,
      ipAddress: ip,
      resource: endpoint,
      action: 'rate_limit_exceeded',
    }),

  suspiciousActivity: (userId: string, ip: string, details: any) => 
    logSecurityEvent({
      timestamp: new Date(),
      level: LogLevel.ERROR,
      eventType: SecurityEventType.SUSPICIOUS_ACTIVITY,
      userId,
      ipAddress: ip,
      action: 'suspicious_activity',
      details,
    }),

  // Financial
  paymentSuccess: (userId: string, amount: number, transactionId: string) => 
    logSecurityEvent({
      timestamp: new Date(),
      level: LogLevel.INFO,
      eventType: SecurityEventType.PAYMENT_SUCCESS,
      userId,
      action: 'payment_success',
      details: { amount, transactionId },
    }),

  withdrawalApproved: (userId: string, amount: number, adminId: string) => 
    logSecurityEvent({
      timestamp: new Date(),
      level: LogLevel.INFO,
      eventType: SecurityEventType.WITHDRAWAL_APPROVED,
      userId,
      action: 'withdrawal_approved',
      details: { amount, adminId },
    }),

  // MLM
  selfReferralBlocked: (userId: string, referralCode: string) => 
    logSecurityEvent({
      timestamp: new Date(),
      level: LogLevel.WARN,
      eventType: SecurityEventType.SELF_REFERRAL_BLOCKED,
      userId,
      action: 'self_referral_blocked',
      details: { referralCode },
    }),

  // Admin
  adminAction: (adminId: string, action: string, details: any) => 
    logSecurityEvent({
      timestamp: new Date(),
      level: LogLevel.INFO,
      eventType: SecurityEventType.ADMIN_ACTION,
      userId: adminId,
      action,
      details,
    }),

  // Error
  error: (message: string, error: any, context?: any) => 
    logSecurityEvent({
      timestamp: new Date(),
      level: LogLevel.ERROR,
      eventType: SecurityEventType.ERROR,
      action: 'error',
      details: { message, error, context },
    }),
};
