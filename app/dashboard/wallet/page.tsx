'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/utils/helpers';

export default function WalletPage() {
  const { user } = useAuth();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);

  if (!user) return null;

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Withdrawal request of ${formatCurrency(parseFloat(withdrawAmount))} submitted!`);
    setWithdrawAmount('');
    setShowWithdrawForm(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Wallet</h1>
        <p className="text-foreground-secondary">Manage your earnings and withdrawals</p>
      </div>

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-8 text-white mb-8">
        <p className="text-sm text-green-100 mb-2">Available Balance</p>
        <div className="text-5xl font-bold mb-6">{formatCurrency(user.walletBalance)}</div>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setShowWithdrawForm(!showWithdrawForm)}
            disabled={user.walletBalance < 500}
          >
            {user.walletBalance < 500 ? 'Min ₹500 Required' : 'Withdraw Funds'}
          </Button>
        </div>
      </div>

      {/* Withdraw Form */}
      {showWithdrawForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-6">Request Withdrawal</h2>
          <form onSubmit={handleWithdraw} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Amount (₹)
              </label>
              <input
                type="number"
                min="500"
                max={user.walletBalance}
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter amount (min ₹500)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Bank Account Details
              </label>
              <textarea
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Account Number, IFSC Code, Account Holder Name"
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit" variant="primary" size="lg">
                Submit Request
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setShowWithdrawForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-3xl mb-3">💰</div>
          <div className="text-2xl font-bold text-foreground mb-1">
            {formatCurrency(user.totalEarnings)}
          </div>
          <div className="text-sm text-foreground-secondary">Total Earnings</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-3xl mb-3">📊</div>
          <div className="text-2xl font-bold text-foreground mb-1">₹0.00</div>
          <div className="text-sm text-foreground-secondary">Pending Withdrawals</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-3xl mb-3">✅</div>
          <div className="text-2xl font-bold text-foreground mb-1">₹0.00</div>
          <div className="text-sm text-foreground-secondary">Total Withdrawn</div>
        </div>
      </div>

      {/* Withdrawal Info */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Withdrawal Information</h2>
        <div className="space-y-3 text-foreground-secondary">
          <div className="flex items-start gap-3">
            <span className="text-primary">✓</span>
            <p>Minimum withdrawal amount: <strong>₹500</strong></p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary">✓</span>
            <p>Processing time: <strong>24-48 hours</strong></p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary">✓</span>
            <p>Withdrawals are processed via bank transfer</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary">✓</span>
            <p>No withdrawal fees</p>
          </div>
        </div>
      </div>
    </div>
  );
}
