'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency } from '@/utils/helpers';
import Link from 'next/link';

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    walletBalance: 0,
    totalEarnings: 0,
    totalReferrals: 0,
    pendingCommissions: 0,
  });

  useEffect(() => {
    // In production, fetch from API
    if (user) {
      setStats({
        totalOrders: 0,
        totalSpent: 0,
        walletBalance: user.walletBalance,
        totalEarnings: user.totalEarnings,
        totalReferrals: 0,
        pendingCommissions: 0,
      });
    }
  }, [user]);

  const statCards = [
    {
      title: 'Wallet Balance',
      value: formatCurrency(stats.walletBalance),
      icon: '💳',
      color: 'from-blue-500 to-blue-600',
      link: '/dashboard/wallet',
    },
    {
      title: 'Total Earnings',
      value: formatCurrency(stats.totalEarnings),
      icon: '💰',
      color: 'from-green-500 to-green-600',
      link: '/dashboard/earnings',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: '📦',
      color: 'from-purple-500 to-purple-600',
      link: '/dashboard/orders',
    },
    {
      title: 'Total Referrals',
      value: stats.totalReferrals.toString(),
      icon: '👥',
      color: 'from-orange-500 to-orange-600',
      link: '/dashboard/referrals',
    },
  ];

  if (!user) return null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user.name}!</h1>
        <p className="text-foreground-secondary">
          Here's an overview of your account
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            href={stat.link}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">{stat.icon}</span>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <span className="text-white text-2xl font-bold">{stat.icon}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
            <div className="text-sm text-foreground-secondary">{stat.title}</div>
          </Link>
        ))}
      </div>

      {/* MLM Status */}
      <div className="bg-gradient-to-r from-primary to-primary-hover rounded-xl shadow-lg p-8 text-white mb-8">
        <h2 className="text-2xl font-bold mb-4">MLM Commission Status</h2>
        {user.isEligibleForMLM ? (
          <div>
            <p className="text-lg mb-2">✅ You are eligible for MLM commissions!</p>
            <p className="text-primary-light">
              Share your referral code <span className="font-bold">{user.referralCode}</span> to start earning
            </p>
          </div>
        ) : (
          <div>
            <p className="text-lg mb-2">🎯 Purchase ₹10,000 worth of products to unlock MLM commissions</p>
            <p className="text-primary-light">
              Earn up to 10% commission on direct referrals across 10 levels!
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/products"
            className="p-4 border-2 border-primary rounded-lg hover:bg-primary-ultra-light transition-colors text-center"
          >
            <div className="text-3xl mb-2">🛍️</div>
            <div className="font-semibold text-foreground">Browse Products</div>
          </Link>
          <Link
            href="/dashboard/referrals"
            className="p-4 border-2 border-primary rounded-lg hover:bg-primary-ultra-light transition-colors text-center"
          >
            <div className="text-3xl mb-2">🔗</div>
            <div className="font-semibold text-foreground">My Referral Code</div>
          </Link>
          <Link
            href="/dashboard/wallet"
            className="p-4 border-2 border-primary rounded-lg hover:bg-primary-ultra-light transition-colors text-center"
          >
            <div className="text-3xl mb-2">💸</div>
            <div className="font-semibold text-foreground">Withdraw Funds</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
