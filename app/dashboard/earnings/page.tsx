'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency } from '@/utils/helpers';

export default function EarningsPage() {
  const { user } = useAuth();
  const [earningsData] = useState({
    totalEarned: user?.totalEarnings || 0,
    thisMonth: 0,
    lastMonth: 0,
    pending: 0,
    levelBreakdown: [
      { level: 1, amount: 0, count: 0 },
      { level: 2, amount: 0, count: 0 },
      { level: 3, amount: 0, count: 0 },
    ],
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Earnings</h1>
        <p className="text-foreground-secondary">Track your commission earnings</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary to-primary-hover rounded-xl shadow-lg p-6 text-white">
          <p className="text-sm text-primary-light mb-2">Total Earned</p>
          <p className="text-3xl font-bold">{formatCurrency(earningsData.totalEarned)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-sm text-foreground-secondary mb-2">This Month</p>
          <p className="text-3xl font-bold text-foreground">{formatCurrency(earningsData.thisMonth)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-sm text-foreground-secondary mb-2">Last Month</p>
          <p className="text-3xl font-bold text-foreground">{formatCurrency(earningsData.lastMonth)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-sm text-foreground-secondary mb-2">Pending</p>
          <p className="text-3xl font-bold text-foreground">{formatCurrency(earningsData.pending)}</p>
        </div>
      </div>

      {/* Level Breakdown */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Earnings by Level</h2>
        <div className="space-y-4">
          {earningsData.levelBreakdown.map((level) => (
            <div key={level.level} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  L{level.level}
                </div>
                <div>
                  <p className="font-semibold text-foreground">Level {level.level}</p>
                  <p className="text-sm text-foreground-secondary">{level.count} commission(s)</p>
                </div>
              </div>
              <p className="text-xl font-bold text-primary">{formatCurrency(level.amount)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
