'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    commission: true,
    orderUpdates: true,
    promotional: false,
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-foreground-secondary">Manage your account preferences</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Notification Preferences</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-foreground-secondary">Receive updates via email</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                className="w-5 h-5 text-primary rounded"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-foreground">Commission Alerts</p>
                <p className="text-sm text-foreground-secondary">Get notified when you earn commissions</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.commission}
                onChange={(e) => setNotifications({ ...notifications, commission: e.target.checked })}
                className="w-5 h-5 text-primary rounded"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-foreground">Order Updates</p>
                <p className="text-sm text-foreground-secondary">Track your order status</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.orderUpdates}
                onChange={(e) => setNotifications({ ...notifications, orderUpdates: e.target.checked })}
                className="w-5 h-5 text-primary rounded"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-foreground">Promotional Emails</p>
                <p className="text-sm text-foreground-secondary">Special offers and discounts</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.promotional}
                onChange={(e) => setNotifications({ ...notifications, promotional: e.target.checked })}
                className="w-5 h-5 text-primary rounded"
              />
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Security</h2>
          <div className="space-y-4">
            <Button variant="outline" size="lg" className="w-full">
              Change Password
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              Enable Two-Factor Authentication
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-xl shadow-md p-6 border-2 border-red-200">
          <h2 className="text-xl font-bold text-red-600 mb-6">Danger Zone</h2>
          <div className="space-y-4">
            <p className="text-sm text-foreground-secondary">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="w-full border-red-500 text-red-500 hover:bg-red-50"
            >
              Delete Account
            </Button>
          </div>
        </div>

        <Button variant="primary" size="lg" onClick={handleSave}>
          Save All Settings
        </Button>
      </div>
    </div>
  );
}
