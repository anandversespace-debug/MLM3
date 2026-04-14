'use client';

import { useState, useEffect } from 'react';
import { formatDate } from '@/utils/helpers';
import { Button } from '@/components/ui/Button';

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'PERCENTAGE',
    discountValue: '',
    minOrderValue: '',
    maxUses: '',
    expiryDate: '',
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await fetch('/api/admin/coupons');
      const json = await res.json();
      if (json.success) {
        setCoupons(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch coupons', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          discountValue: parseFloat(formData.discountValue),
          minOrderValue: parseFloat(formData.minOrderValue),
          maxUses: parseInt(formData.maxUses),
        }),
      });
      if (res.ok) {
        setShowCreateForm(false);
        setFormData({ code: '', discountType: 'PERCENTAGE', discountValue: '', minOrderValue: '', maxUses: '', expiryDate: '' });
        fetchCoupons();
      }
    } catch (err) {
      console.error('Failed to create coupon', err);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      if (res.ok) {
        fetchCoupons();
      }
    } catch (err) {
      console.error('Failed to update coupon', err);
    }
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Coupon & Offers Management</h1>
          <p className="text-foreground-secondary">Create and manage discount coupons</p>
        </div>
        <Button variant="primary" size="lg" onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : '+ Create Coupon'}
        </Button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Create New Coupon</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code *</label>
                <input
                  required
                  type="text"
                  value={formData.code}
                  onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900"
                  placeholder="e.g., SAVE20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type *</label>
                <select
                  value={formData.discountType}
                  onChange={e => setFormData({...formData, discountType: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900"
                >
                  <option value="PERCENTAGE">Percentage (%)</option>
                  <option value="FIXED">Fixed Amount (₹)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value *</label>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.discountValue}
                  onChange={e => setFormData({...formData, discountValue: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900"
                  placeholder={formData.discountType === 'PERCENTAGE' ? 'e.g., 20' : 'e.g., 100'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Order Value (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.minOrderValue}
                  onChange={e => setFormData({...formData, minOrderValue: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900"
                  placeholder="e.g., 500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Uses</label>
                <input
                  type="number"
                  min="0"
                  value={formData.maxUses}
                  onChange={e => setFormData({...formData, maxUses: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900"
                  placeholder="0 = unlimited"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={e => setFormData({...formData, expiryDate: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="primary">Create Coupon</Button>
            </div>
          </form>
        </div>
      )}

      {/* Coupons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : coupons.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No coupons found. Create your first coupon!
          </div>
        ) : (
          coupons.map((coupon) => (
            <div key={coupon.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground font-mono">{coupon.code}</h3>
                  <p className="text-sm text-foreground-secondary mt-1">
                    {coupon.discountType === 'PERCENTAGE' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {coupon.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="space-y-2 text-sm text-foreground-secondary mb-4">
                <div className="flex justify-between">
                  <span>Min Order:</span>
                  <span className="font-medium">₹{coupon.minOrderValue}</span>
                </div>
                <div className="flex justify-between">
                  <span>Uses:</span>
                  <span className="font-medium">{coupon.usedCount} / {coupon.maxUses === 0 ? '∞' : coupon.maxUses}</span>
                </div>
                {coupon.expiryDate && (
                  <div className="flex justify-between">
                    <span>Expires:</span>
                    <span className="font-medium">{formatDate(new Date(coupon.expiryDate))}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleStatus(coupon.id, coupon.isActive)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    coupon.isActive
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {coupon.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
