'use client';

import { useState } from 'react';
import { formatCurrency } from '@/utils/helpers';

export default function AdminReportsPage() {
  const [reportData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalCommissions: 0,
    averageOrderValue: 0,
    topProducts: [],
    recentActivity: [],
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
        <p className="text-foreground-secondary">Platform performance and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-sm text-green-100 mb-2">Total Revenue</p>
          <p className="text-3xl font-bold">{formatCurrency(reportData.totalRevenue)}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-sm text-blue-100 mb-2">Total Orders</p>
          <p className="text-3xl font-bold">{reportData.totalOrders}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-sm text-purple-100 mb-2">Total Users</p>
          <p className="text-3xl font-bold">{reportData.totalUsers}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-sm text-orange-100 mb-2">Commissions Paid</p>
          <p className="text-3xl font-bold">{formatCurrency(reportData.totalCommissions)}</p>
        </div>
      </div>

      {/* Analytics Sections */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Overview */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Sales Overview</h2>
          <div className="text-center py-12 text-foreground-secondary">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-lg font-medium mb-2">Sales Chart</p>
            <p className="text-sm">Sales data will appear here once orders start coming in</p>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Top Products</h2>
          {reportData.topProducts.length === 0 ? (
            <div className="text-center py-12 text-foreground-secondary">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-lg font-medium mb-2">No Sales Yet</p>
              <p className="text-sm">Top selling products will be displayed here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reportData.topProducts.map((product: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{product.name}</p>
                      <p className="text-sm text-foreground-secondary">{product.sales} sales</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-primary">{formatCurrency(product.revenue)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MLM Analytics */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">MLM Network Growth</h2>
          <div className="text-center py-12 text-foreground-secondary">
            <div className="text-6xl mb-4">🌐</div>
            <p className="text-lg font-medium mb-2">Network Chart</p>
            <p className="text-sm">Network growth visualization will appear here</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Commission Distribution</h2>
          <div className="text-center py-12 text-foreground-secondary">
            <div className="text-6xl mb-4">💰</div>
            <p className="text-lg font-medium mb-2">Commission Chart</p>
            <p className="text-sm">Commission breakdown by level will be shown here</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Recent Activity</h2>
        {reportData.recentActivity.length === 0 ? (
          <div className="text-center py-12 text-foreground-secondary">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-lg font-medium mb-2">No Activity Yet</p>
            <p className="text-sm">Recent platform activity will be displayed here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reportData.recentActivity.map((activity: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{activity.icon}</div>
                  <div>
                    <p className="font-semibold text-foreground">{activity.title}</p>
                    <p className="text-sm text-foreground-secondary">{activity.description}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground-secondary">{activity.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Export Options */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Export Reports</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary-ultra-light transition-all">
            <div className="text-3xl mb-2">📄</div>
            <p className="font-semibold text-foreground">Export as PDF</p>
            <p className="text-sm text-foreground-secondary">Download report</p>
          </button>
          <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary-ultra-light transition-all">
            <div className="text-3xl mb-2">📊</div>
            <p className="font-semibold text-foreground">Export as Excel</p>
            <p className="text-sm text-foreground-secondary">Spreadsheet format</p>
          </button>
          <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary-ultra-light transition-all">
            <div className="text-3xl mb-2">📈</div>
            <p className="font-semibold text-foreground">Export as CSV</p>
            <p className="text-sm text-foreground-secondary">Data table format</p>
          </button>
        </div>
      </div>
    </div>
  );
}
