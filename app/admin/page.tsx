'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/utils/helpers';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingWithdrawals: 0,
    activeCoupons: 0,
    totalCommissions: 0,
    pendingKYC: 0,
    openTickets: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch('/api/admin/dashboard');
      const json = await res.json();
      if (json.success) {
        setStats(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard stats', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-foreground-secondary">Platform overview and statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-sm text-blue-100 mb-2">Total Users</p>
          <p className="text-4xl font-bold">{stats.totalUsers}</p>
          <p className="text-xs text-blue-100 mt-2">{stats.pendingKYC} pending KYC</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-sm text-green-100 mb-2">Total Revenue</p>
          <p className="text-4xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
          <p className="text-xs text-green-100 mt-2">From {stats.totalOrders} orders</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-sm text-purple-100 mb-2">Commissions Paid</p>
          <p className="text-4xl font-bold">{formatCurrency(stats.totalCommissions)}</p>
          <p className="text-xs text-purple-100 mt-2">MLM distributions</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-sm text-orange-100 mb-2">Products</p>
          <p className="text-4xl font-bold">{stats.totalProducts}</p>
          <p className="text-xs text-orange-100 mt-2">{stats.activeCoupons} active coupons</p>
        </div>
      </div>

      {/* Second Row Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-secondary mb-1">Pending Withdrawals</p>
              <p className="text-3xl font-bold text-foreground">{stats.pendingWithdrawals}</p>
            </div>
            <div className="text-4xl">💸</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-secondary mb-1">Open Support Tickets</p>
              <p className="text-3xl font-bold text-foreground">{stats.openTickets}</p>
            </div>
            <div className="text-4xl">🎫</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-secondary mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-foreground">{stats.totalOrders}</p>
            </div>
            <div className="text-4xl">📑</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href="/admin/users" className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors">
              <div className="text-3xl mb-2">👥</div>
              <p className="font-semibold text-foreground">Manage Users</p>
            </a>
            <a href="/admin/products" className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
              <div className="text-3xl mb-2">🛒</div>
              <p className="font-semibold text-foreground">Add Product</p>
            </a>
            <a href="/admin/orders" className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors">
              <div className="text-3xl mb-2">📑</div>
              <p className="font-semibold text-foreground">View Orders</p>
            </a>
            <a href="/admin/withdrawals" className="p-4 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition-colors">
              <div className="text-3xl mb-2">💸</div>
              <p className="font-semibold text-foreground">Withdrawals</p>
            </a>
            <a href="/admin/mlm" className="p-4 bg-pink-50 rounded-lg text-center hover:bg-pink-100 transition-colors">
              <div className="text-3xl mb-2">🌐</div>
              <p className="font-semibold text-foreground">MLM Network</p>
            </a>
            <a href="/admin/support" className="p-4 bg-red-50 rounded-lg text-center hover:bg-red-100 transition-colors">
              <div className="text-3xl mb-2">🎫</div>
              <p className="font-semibold text-foreground">Support Tickets</p>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Platform Health</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-foreground-secondary">Database Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Online</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-foreground-secondary">Payment Gateway</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Active</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-foreground-secondary">Email Service</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Active</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-foreground-secondary">MLM System</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Running</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-foreground-secondary">Pending Withdrawals</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">{stats.pendingWithdrawals}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
        <div className="text-center py-12 text-foreground-secondary">
          <div className="text-6xl mb-4">📊</div>
          <p>Activity feed will appear here once transactions start</p>
        </div>
      </div>
    </div>
  );
}
