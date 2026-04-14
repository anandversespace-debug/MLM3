'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/utils/helpers';

export default function MLMSystemPage() {
  const [activeTab, setActiveTab] = useState('network');
  const [stats, setStats] = useState({
    totalUsers: 0,
    eligibleUsers: 0,
    totalCommissions: 0,
    totalNetworks: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMLMStats();
  }, []);

  const fetchMLMStats = async () => {
    try {
      const res = await fetch('/api/admin/mlm/stats');
      const json = await res.json();
      if (json.success) {
        setStats(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch MLM stats', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">MLM System Management</h1>
        <p className="text-foreground-secondary">Manage referral network and commissions</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-sm text-blue-100 mb-2">Total Users in Network</p>
          <p className="text-4xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-sm text-green-100 mb-2">MLM Eligible Users</p>
          <p className="text-4xl font-bold">{stats.eligibleUsers}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-sm text-purple-100 mb-2">Total Commissions Paid</p>
          <p className="text-4xl font-bold">{formatCurrency(stats.totalCommissions)}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-sm text-orange-100 mb-2">Network Connections</p>
          <p className="text-4xl font-bold">{stats.totalNetworks}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex gap-4 p-4">
            {[
              { id: 'network', label: '🌐 Network Tree' },
              { id: 'commissions', label: '💰 Commission Logs' },
              { id: 'eligible', label: '✅ Eligible Users' },
              { id: 'top-earners', label: '🏆 Top Earners' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'network' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌐</div>
              <p className="text-lg font-medium text-foreground mb-2">Referral Network Tree</p>
              <p className="text-foreground-secondary">Interactive network visualization will be displayed here</p>
              <p className="text-sm text-foreground-secondary mt-2">Shows user relationships across all 10 levels</p>
            </div>
          )}

          {activeTab === 'commissions' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💰</div>
              <p className="text-lg font-medium text-foreground mb-2">Commission Logs</p>
              <p className="text-foreground-secondary">Complete history of all commission distributions</p>
            </div>
          )}

          {activeTab === 'eligible' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <p className="text-lg font-medium text-foreground mb-2">MLM Eligible Users</p>
              <p className="text-foreground-secondary">Users who have completed ₹10,000+ purchases</p>
            </div>
          )}

          {activeTab === 'top-earners' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏆</div>
              <p className="text-lg font-medium text-foreground mb-2">Top Earners Leaderboard</p>
              <p className="text-foreground-secondary">Highest earning users from MLM commissions</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Link to Settings */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">Commission Structure</h3>
            <p className="text-foreground-secondary">Configure level-wise commission percentages</p>
          </div>
          <a
            href="/admin/mlm-settings"
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Go to Settings →
          </a>
        </div>
      </div>
    </div>
  );
}
