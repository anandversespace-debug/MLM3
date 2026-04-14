import { z } from 'zod';

// User Registration Schema
export const registerSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .transform(val => val.trim()),
  email: z.string()
    .email('Invalid email address')
    .toLowerCase()
    .transform(val => val.trim()),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  referralCode: z.string().optional().nullable(),
});

// User Login Schema
export const loginSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .toLowerCase()
    .transform(val => val.trim()),
  password: z.string()
    .min(1, 'Password is required')
    .max(100),
});

// OTP Verification Schema
export const otpSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .toLowerCase(),
  otp: z.string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must contain only numbers'),
});

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .toLowerCase()
    .transform(val => val.trim()),
});

// Reset Password Schema
export const resetPasswordSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .toLowerCase(),
  otp: z.string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must contain only numbers'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100)
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

// Admin Creation Schema
export const adminCreateSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50)
    .transform(val => val.trim()),
  email: z.string()
    .email('Invalid email address')
    .toLowerCase()
    .transform(val => val.trim()),
  role: z.enum(['ADMIN', 'SUPER_ADMIN', 'MODERATOR'], {
    message: 'Invalid role'
  }),
});

// Product Schema
export const productSchema = z.object({
  name: z.string()
    .min(2, 'Product name must be at least 2 characters')
    .max(100)
    .transform(val => val.trim()),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(5000)
    .transform(val => val.trim()),
  price: z.number()
    .positive('Price must be positive')
    .max(1000000, 'Price cannot exceed ₹1,000,000'),
  category: z.string()
    .min(1, 'Category is required')
    .max(50),
  stock: z.number()
    .int('Stock must be an integer')
    .nonnegative('Stock cannot be negative'),
  images: z.array(z.string().url('Invalid image URL')).optional(),
});

// Coupon Schema
export const couponSchema = z.object({
  code: z.string()
    .min(3, 'Code must be at least 3 characters')
    .max(20, 'Code must be less than 20 characters')
    .toUpperCase()
    .regex(/^[A-Z0-9]+$/, 'Code must contain only uppercase letters and numbers'),
  discountType: z.enum(['PERCENTAGE', 'FIXED']),
  discountValue: z.number()
    .positive('Discount value must be positive')
    .max(100, 'Percentage discount cannot exceed 100'),
  minOrderValue: z.number()
    .nonnegative('Minimum order value cannot be negative'),
  maxUses: z.number()
    .int('Max uses must be an integer')
    .positive('Max uses must be positive'),
  expiresAt: z.string()
    .datetime('Invalid date format')
    .optional(),
});

// Order Schema
export const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1, 'Product ID is required'),
    quantity: z.number()
      .int('Quantity must be an integer')
      .positive('Quantity must be positive'),
  })).min(1, 'Order must contain at least one item'),
  shippingAddress: z.object({
    address: z.string().min(5, 'Address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode'),
    phone: z.string().regex(/^\d{10}$/, 'Invalid phone number'),
  }),
});

// Withdrawal Schema
export const withdrawalSchema = z.object({
  amount: z.number()
    .positive('Amount must be positive')
    .min(100, 'Minimum withdrawal amount is ₹100')
    .max(100000, 'Maximum withdrawal amount is ₹100,000'),
  bankDetails: z.object({
    accountHolderName: z.string().min(2, 'Account holder name is required'),
    accountNumber: z.string().min(8, 'Invalid account number'),
    ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code'),
    bankName: z.string().min(2, 'Bank name is required'),
    branchName: z.string().min(2, 'Branch name is required'),
  }),
});

// KYC Schema
export const kycSchema = z.object({
  idProofType: z.enum(['AADHAAR', 'PAN', 'PASSPORT', 'DRIVING_LICENSE']),
  idProofNumber: z.string()
    .min(8, 'Invalid ID proof number')
    .max(20),
  address: z.string().min(10, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode'),
  documents: z.array(z.string().url('Invalid document URL'))
    .min(1, 'At least one document is required'),
});

// Support Ticket Schema
export const supportTicketSchema = z.object({
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200)
    .transform(val => val.trim()),
  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(5000)
    .transform(val => val.trim()),
  category: z.enum(['GENERAL', 'PAYMENT', 'MLM', 'WITHDRAWAL', 'TECHNICAL', 'OTHER']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
});

// Payment Verification Schema
export const paymentVerificationSchema = z.object({
  razorpay_order_id: z.string().min(1, 'Order ID is required'),
  razorpay_payment_id: z.string().min(1, 'Payment ID is required'),
  razorpay_signature: z.string().min(1, 'Signature is required'),
  amount: z.number().positive('Amount must be positive'),
  orderId: z.string().min(1, 'Order ID is required'),
});

// Profile Update Schema
export const profileUpdateSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50)
    .optional(),
  phone: z.string()
    .regex(/^\d{10}$/, 'Invalid phone number')
    .optional(),
  address: z.object({
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode').optional(),
  }).optional(),
});

// Token Refresh Schema
export const tokenRefreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// Type exports
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type OTPInput = z.infer<typeof otpSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type AdminCreateInput = z.infer<typeof adminCreateSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type CouponInput = z.infer<typeof couponSchema>;
export type OrderInput = z.infer<typeof orderSchema>;
export type WithdrawalInput = z.infer<typeof withdrawalSchema>;
export type KYCInput = z.infer<typeof kycSchema>;
export type SupportTicketInput = z.infer<typeof supportTicketSchema>;
export type PaymentVerificationInput = z.infer<typeof paymentVerificationSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
