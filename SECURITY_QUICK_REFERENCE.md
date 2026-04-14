# 🔒 SECURITY QUICK REFERENCE

## 📚 DOCUMENTATION

| Document | Purpose | Lines |
|----------|---------|-------|
| **SECURITY_IMPLEMENTATION_GUIDE.md** | Complete implementation guide with code examples | 880 |
| **SECURITY_AUDIT_SUMMARY.md** | Final audit summary with metrics | 545 |
| **SECURITY_QUICK_REFERENCE.md** | This file - Quick lookup | - |

---

## 🔐 AUTHENTICATION

### **JWT Tokens**
```typescript
import { generateAccessToken, generateRefreshToken, verifyAccessToken } from '@/lib/security';

// Generate
const accessToken = generateAccessToken({ userId, email, role });
const refreshToken = generateRefreshToken({ userId });

// Verify
const decoded = verifyAccessToken(token);
```

### **Password Hashing**
```typescript
import { hashPassword, verifyPassword } from '@/lib/security';

// Hash
const hash = await hashPassword(plainPassword);

// Verify
const isValid = await verifyPassword(inputPassword, storedHash);
```

### **OTP**
```typescript
import { generateOTP, hashOTP, verifyOTP } from '@/lib/security';

// Generate & Hash
const otp = generateOTP(); // "123456"
const hashedOTP = await hashOTP(otp);

// Verify
const isValid = verifyOTP(inputOTP, storedHash);
```

---

## 🛡️ VALIDATION

### **Quick Validation**
```typescript
import { loginSchema, registerSchema } from '@/lib/validations';

const result = loginSchema.safeParse(requestBody);

if (!result.success) {
  return NextResponse.json({ errors: result.error.errors }, { status: 400 });
}

const validatedData = result.data;
```

### **Available Schemas**
- `registerSchema` - User registration
- `loginSchema` - User login
- `otpSchema` - OTP verification
- `forgotPasswordSchema` - Password reset
- `resetPasswordSchema` - New password
- `productSchema` - Product CRUD
- `couponSchema` - Coupon management
- `orderSchema` - Order placement
- `withdrawalSchema` - Withdrawal requests
- `kycSchema` - KYC submission
- `supportTicketSchema` - Support tickets
- `adminCreateSchema` - Admin creation
- `paymentVerificationSchema` - Payment validation
- `profileUpdateSchema` - Profile updates

---

## 🚦 RATE LIMITING

### **Apply Rate Limit**
```typescript
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const limit = rateLimit(request, 'AUTH'); // AUTH, API, GENERAL, PAYMENT
  
  if (limit.limited) {
    return limit.response; // Returns 429 response
  }
  
  // Proceed...
}
```

### **Rate Limits**
| Type | Window | Limit | Use For |
|------|--------|-------|---------|
| AUTH | 15 min | 10 | Login, register, OTP |
| PAYMENT | 1 hour | 50 | Payment operations |
| API | 15 min | 100 | General API calls |
| GENERAL | 15 min | 200 | Public endpoints |

### **Failed Login Tracking**
```typescript
import { trackFailedLogin, isLockedOut, resetFailedLogins } from '@/lib/rate-limit';

// On failed login
trackFailedLogin(ip);

// Check before login
if (isLockedOut(ip)) {
  return NextResponse.json({ error: 'Locked out' }, { status: 429 });
}

// On successful login
resetFailedLogins(ip);
```

---

## 🔑 AUTHENTICATION MIDDLEWARE

### **Protect Routes**
```typescript
import { authenticateToken, requireAdmin } from '@/lib/auth-middleware';

// Require authentication
const auth = await authenticateToken(request);
if (!auth.success) {
  return NextResponse.json({ error: auth.error }, { status: auth.status });
}

// Require admin
const auth = await requireAdmin(request);
if (!auth.success) {
  return NextResponse.json({ error: auth.error }, { status: auth.status });
}

// Access user info
const { userId, userEmail, userRole } = auth;
```

### **Ownership Check**
```typescript
import { checkOwnership } from '@/lib/auth-middleware';

if (!checkOwnership(resource.userId, authenticatedUserId)) {
  return NextResponse.json({ error: 'Access denied' }, { status: 403 });
}
```

---

## 📝 SECURITY LOGGING

### **Log Events**
```typescript
import { securityLogger } from '@/lib/security-logger';

// Authentication
await securityLogger.loginSuccess(userId, email, ip);
await securityLogger.loginFailed(email, ip, 'Invalid password');

// Security
await securityLogger.accessDenied(userId, resource, ip);
await securityLogger.rateLimitExceeded(ip, endpoint);
await securityLogger.suspiciousActivity(userId, ip, details);

// Financial
await securityLogger.paymentSuccess(userId, amount, transactionId);
await securityLogger.withdrawalApproved(userId, amount, adminId);

// MLM
await securityLogger.selfReferralBlocked(userId, referralCode);

// Admin
await securityLogger.adminAction(adminId, action, details);

// Error
await securityLogger.error(message, error, context);
```

### **Custom Logging**
```typescript
import { logSecurityEvent, LogLevel, SecurityEventType } from '@/lib/security-logger';

await logSecurityEvent({
  timestamp: new Date(),
  level: LogLevel.WARN,
  eventType: SecurityEventType.SUSPICIOUS_ACTIVITY,
  userId: 'xxx',
  ipAddress: '1.2.3.4',
  action: 'custom_action',
  details: { key: 'value' },
});
```

---

## 🔒 SECURITY HEADERS

### **Apply Headers**
```typescript
import { applySecurityHeaders, handleCORS } from '@/lib/security-headers';

export async function GET(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  
  applySecurityHeaders(request, response);
  handleCORS(request, response);
  
  return response;
}
```

### **Headers Applied**
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Strict-Transport-Security
- ✅ Referrer-Policy
- ✅ Permissions-Policy
- ✅ Content-Security-Policy
- ✅ X-Request-ID

---

## 🌐 MIDDLEWARE

### **Automatic Protection**
All routes automatically protected by `middleware.ts`:
- Security headers applied
- CORS handled for API routes
- Rate limiting on API endpoints
- Route protection (/admin, /dashboard)
- Auth redirects

### **Matcher Config**
```typescript
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/health).*)',
    '/api/:path*',
  ],
};
```

---

## 💳 PAYMENT SECURITY

### **Webhook Validation**
```typescript
import crypto from 'crypto';

function verifyWebhook(body: string, signature: string, secret: string): boolean {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature)
  );
}
```

### **Idempotency**
```typescript
const processedPayments = new Set<string>();

async function handlePayment(paymentId: string) {
  if (processedPayments.has(paymentId)) {
    return { alreadyProcessed: true };
  }
  
  processedPayments.add(paymentId);
  // Process payment...
}
```

---

## 🌐 MLM FRAUD PREVENTION

### **Self-Referral Check**
```typescript
if (referralCode === user.referralCode) {
  await securityLogger.selfReferralBlocked(userId, referralCode);
  throw new Error('Self-referral not allowed');
}
```

### **Circular Reference Detection**
```typescript
async function detectCircularReferral(userId: string, referredById: string): Promise<boolean> {
  let currentId = referredById;
  const visited = new Set<string>();
  
  while (currentId) {
    if (currentId === userId) return true;
    if (visited.has(currentId)) break;
    
    visited.add(currentId);
    const user = await prisma.user.findUnique({
      where: { id: currentId },
      select: { referredById: true }
    });
    
    currentId = user?.referredById;
  }
  
  return false;
}
```

---

## 🔐 2FA FOR ADMINS

### **Generate Secret**
```typescript
import speakeasy from 'speakeasy';

const secret = speakeasy.generateSecret({
  name: 'MLM Platform',
  length: 32,
});

// Save secret.otpauth_url for QR code
// Save secret.base32 for verification
```

### **Verify Token**
```typescript
const isValid = speakeasy.totp.verify({
  secret: user.twoFactorSecret,
  encoding: 'base32',
  token: inputToken,
  window: 1,
});
```

---

## 📁 FILE UPLOAD

### **Signed Upload URL**
```typescript
import cloudinary from '@/lib/cloudinary';

function generateSignedUploadUrl(folder: string) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET
  );
  
  return { timestamp, signature, apiKey: process.env.CLOUDINARY_API_KEY, folder };
}
```

### **File Validation**
```typescript
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

function validateFile(file: File) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  
  if (file.size > MAX_SIZE) {
    throw new Error('File too large');
  }
}
```

---

## 🔧 ENVIRONMENT VARIABLES

```bash
# Required
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
NODE_ENV=production

# Payment
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
RAZORPAY_WEBHOOK_SECRET=xxx

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=app-password

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

---

## ✅ SECURITY CHECKLIST

### **API Route Template**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { mySchema } from '@/lib/validations';
import { authenticateToken } from '@/lib/auth-middleware';
import { rateLimit } from '@/lib/rate-limit';
import { securityLogger } from '@/lib/security-logger';

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting
    const limit = rateLimit(request, 'API');
    if (limit.limited) return limit.response;
    
    // 2. Authentication
    const auth = await authenticateToken(request);
    if (!auth.success) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    
    // 3. Validation
    const body = await request.json();
    const result = mySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ errors: result.error.errors }, { status: 400 });
    }
    
    // 4. Business logic
    const data = result.data;
    // ... perform operation
    
    // 5. Log success
    await securityLogger.adminAction(auth.userId, 'action_name', data);
    
    // 6. Return response
    return NextResponse.json({ success: true, data });
    
  } catch (error) {
    // 7. Log error
    await securityLogger.error('Operation failed', error);
    
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

---

## 📊 MONITORING

### **Check Rate Limits**
```typescript
import { getClientIP } from '@/lib/rate-limit';

const ip = getClientIP(request);
```

### **Suspicious Activity Detection**
```typescript
// Monitor for patterns
const recentLogins = await prisma.auditLog.count({
  where: {
    userId,
    action: 'LOGIN_SUCCESS',
    createdAt: { gte: new Date(Date.now() - 3600000) }
  }
});

if (recentLogins > 10) {
  await securityLogger.suspiciousActivity(userId, ip, {
    reason: 'Excessive logins',
    count: recentLogins
  });
}
```

---

## 🎯 QUICK WINS

### **1. Secure Login API**
See `SECURITY_IMPLEMENTATION_GUIDE.md` Section 16 for complete example.

### **2. Protect Admin Routes**
```typescript
const auth = await requireAdmin(request);
if (!auth.success) return NextResponse.json({ error: auth.error }, { status: auth.status });
```

### **3. Add Rate Limiting**
```typescript
const limit = rateLimit(request, 'AUTH');
if (limit.limited) return limit.response;
```

### **4. Log Important Events**
```typescript
await securityLogger.loginSuccess(userId, email, ip);
```

### **5. Validate All Inputs**
```typescript
const result = mySchema.safeParse(body);
if (!result.success) return NextResponse.json({ errors: result.error.errors }, { status: 400 });
```

---

## 🚨 COMMON PATTERNS

### **Error Response**
```typescript
return NextResponse.json(
  { success: false, error: 'Error message' },
  { status: 400 }
);
```

### **Success Response**
```typescript
return NextResponse.json(
  { success: true, data: result },
  { status: 200 }
);
```

### **Authenticated Response**
```typescript
const response = NextResponse.json({ success: true, data });
response.cookies.set('refreshToken', refreshToken, getSecureCookieOptions());
return response;
```

---

## 📞 NEED HELP?

1. **Implementation Guide**: `SECURITY_IMPLEMENTATION_GUIDE.md`
2. **Audit Summary**: `SECURITY_AUDIT_SUMMARY.md`
3. **Code Examples**: See guide Section 16
4. **Security Checklist**: See guide Section 14

---

**Stay Secure! 🔒**
