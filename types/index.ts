export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  referralCode: string;
  role: 'USER' | 'ADMIN';
  walletBalance: number;
  totalEarnings: number;
  isEligibleForMLM: boolean;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  images?: string;
  category?: string;
  isActive: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Commission {
  id: string;
  userId: string;
  fromUserId: string;
  level: number;
  amount: number;
  status: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'PURCHASE' | 'COMMISSION' | 'WITHDRAWAL' | 'REFUND';
  amount: number;
  description?: string;
  status: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  type?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalSpent: number;
  totalEarnings: number;
  walletBalance: number;
  totalReferrals: number;
  pendingCommissions: number;
}

export interface MLMStats {
  totalReferrals: number;
  directReferrals: number;
  indirectReferrals: number;
  earningsByLevel: { level: number; amount: number; count: number }[];
  totalCommissions: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
