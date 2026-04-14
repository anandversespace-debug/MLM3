'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

const defaultCommissionLevels = [
  { level: 1, percent: 10, label: 'Direct Referral' },
  { level: 2, percent: 7, label: 'Level 2' },
  { level: 3, percent: 5, label: 'Level 3' },
  { level: 4, percent: 4, label: 'Level 4' },
  { level: 5, percent: 3, label: 'Level 5' },
  { level: 6, percent: 2.5, label: 'Level 6' },
  { level: 7, percent: 2, label: 'Level 7' },
  { level: 8, percent: 1.5, label: 'Level 8' },
  { level: 9, percent: 1, label: 'Level 9' },
  { level: 10, percent: 0.5, label: 'Level 10' },
];

export default function MLMSettingsPage() {
  const [mlmEligibility, setMlmEligibility] = useState(10000);
  const [commissionLevels, setCommissionLevels] = useState(defaultCommissionLevels);
  const [minWithdrawal, setMinWithdrawal] = useState(500);
  const [autoApprove, setAutoApprove] = useState(false);

  const handleSave = () => {
    alert('MLM settings saved successfully!');
  };

  const updateCommission = (level: number, percent: number) => {
    setCommissionLevels(
      commissionLevels.map((item) =>
        item.level === level ? { ...item, percent } : item
      )
    );
  };

  const totalCommission = commissionLevels.reduce((sum, item) => sum + item.percent, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">MLM Settings</h1>
        <p className="text-foreground-secondary">Configure commission structure and eligibility</p>
      </div>

      {/* Eligibility Settings */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Eligibility Settings</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Minimum Purchase for MLM Eligibility (₹)
            </label>
            <input
              type="number"
              value={mlmEligibility}
              onChange={(e) => setMlmEligibility(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Minimum Withdrawal Amount (₹)
            </label>
            <input
              type="number"
              value={minWithdrawal}
              onChange={(e) => setMinWithdrawal(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Commission Structure */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-foreground">10-Level Commission Structure</h2>
          <div className="bg-primary-ultra-light px-4 py-2 rounded-lg">
            <span className="text-sm text-foreground-secondary">Total Commission: </span>
            <span className="text-lg font-bold text-primary">{totalCommission}%</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {commissionLevels.map((level) => (
            <div key={level.level} className="border-2 border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    L{level.level}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{level.label}</p>
                    <p className="text-xs text-foreground-secondary">Level {level.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <input
                    type="number"
                    value={level.percent}
                    onChange={(e) => updateCommission(level.level, Number(e.target.value))}
                    step="0.1"
                    min="0"
                    max="100"
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-right font-bold text-primary focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <p className="text-xs text-foreground-secondary mt-1">%</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded p-2 text-center">
                <p className="text-xs text-foreground-secondary">
                  ₹10,000 order → <strong className="text-primary">₹{(10000 * level.percent) / 100}</strong> commission
                </p>
              </div>
            </div>
          ))}
        </div>

        {totalCommission > 100 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">
              ⚠️ Warning: Total commission exceeds 100%! This is not sustainable.
            </p>
          </div>
        )}
      </div>

      {/* Auto Approval */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Withdrawal Settings</h2>
        <label className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-foreground">Auto-Approve Withdrawals</p>
            <p className="text-sm text-foreground-secondary">Automatically process withdrawals under ₹5,000</p>
          </div>
          <input
            type="checkbox"
            checked={autoApprove}
            onChange={(e) => setAutoApprove(e.target.checked)}
            className="w-5 h-5 text-primary rounded"
          />
        </label>
      </div>

      <Button variant="primary" size="lg" onClick={handleSave}>
        Save MLM Settings
      </Button>
    </div>
  );
}
