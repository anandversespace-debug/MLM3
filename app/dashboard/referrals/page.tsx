'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';

export default function ReferralsPage() {
  const { user } = useAuth();
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    directReferrals: 0,
    indirectReferrals: 0,
    totalCommissions: 0,
  });

  const referralLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/register?ref=${user?.referralCode}`;

  useEffect(() => {
    // In production, fetch from API
    setReferralStats({
      totalReferrals: 0,
      directReferrals: 0,
      indirectReferrals: 0,
      totalCommissions: 0,
    });
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied!');
  };

  const copyCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      alert('Referral code copied!');
    }
  };

  if (!user) return null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Referrals</h1>
        <p className="text-foreground-secondary">Share your code and earn commissions</p>
      </div>

      {/* Referral Code & Link */}
      <div className="bg-gradient-to-r from-primary to-primary-hover rounded-xl shadow-lg p-8 text-white mb-8">
        <h2 className="text-2xl font-bold mb-6">Your Referral Code</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur rounded-lg p-6">
            <p className="text-sm text-primary-light mb-2">Referral Code</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold tracking-wider">{user.referralCode}</span>
              <Button variant="secondary" size="sm" onClick={copyCode}>
                Copy
              </Button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-6">
            <p className="text-sm text-primary-light mb-2">Referral Link</p>
            <div className="flex items-center justify-between">
              <span className="text-sm truncate mr-4">{referralLink}</span>
              <Button variant="secondary" size="sm" onClick={copyToClipboard}>
                Copy
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-3xl mb-3">👥</div>
          <div className="text-3xl font-bold text-foreground mb-1">{referralStats.totalReferrals}</div>
          <div className="text-sm text-foreground-secondary">Total Referrals</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-3xl mb-3">🎯</div>
          <div className="text-3xl font-bold text-foreground mb-1">{referralStats.directReferrals}</div>
          <div className="text-sm text-foreground-secondary">Direct Referrals</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-3xl mb-3">💰</div>
          <div className="text-3xl font-bold text-primary mb-1">₹{referralStats.totalCommissions.toFixed(2)}</div>
          <div className="text-sm text-foreground-secondary">Total Earned</div>
        </div>
      </div>

      {/* Commission Structure */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Commission Structure</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { level: 1, percent: 10, label: 'Direct' },
            { level: 2, percent: 7, label: 'Level 2' },
            { level: 3, percent: 5, label: 'Level 3' },
            { level: 4, percent: 4, label: 'Level 4' },
            { level: 5, percent: 3, label: 'Level 5' },
          ].map((item) => (
            <div key={item.level} className="border-2 border-primary rounded-lg p-4 text-center">
              <div className="text-sm text-foreground-secondary mb-1">{item.label}</div>
              <div className="text-2xl font-bold text-primary">{item.percent}%</div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-primary-ultra-light rounded-lg">
          <p className="text-sm text-foreground-secondary">
            💡 Earn commissions from all 10 levels! Levels 6-10: 2.5%, 2%, 1.5%, 1%, 0.5%
          </p>
        </div>
      </div>

      {/* How to Earn More */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">How to Maximize Earnings</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="text-3xl">1️⃣</div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Share Your Code</h3>
              <p className="text-sm text-foreground-secondary">Share on social media, WhatsApp, email</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-3xl">2️⃣</div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Build Network</h3>
              <p className="text-sm text-foreground-secondary">Help others succeed in their journey</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-3xl">3️⃣</div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Earn Passively</h3>
              <p className="text-sm text-foreground-secondary">Get commissions from 10 levels deep</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
