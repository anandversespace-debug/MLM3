'use client';

export default function SecurityPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Security & Compliance</h1>
        <p className="text-foreground-secondary">KYC verification, fraud detection, and access control</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">🔐 KYC Verification Queue</h2>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-foreground-secondary">No pending KYC verifications</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">🚨 Fraud Detection Logs</h2>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🛡️</div>
            <p className="text-foreground-secondary">No suspicious activities detected</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-foreground mb-4">🔒 Access Control Settings</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-sm text-foreground-secondary">Require 2FA for admin logins</p>
            </div>
            <input type="checkbox" className="w-5 h-5 text-primary rounded" />
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">IP Whitelisting</p>
              <p className="text-sm text-foreground-secondary">Restrict admin access to specific IPs</p>
            </div>
            <input type="checkbox" className="w-5 h-5 text-primary rounded" />
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Session Timeout</p>
              <p className="text-sm text-foreground-secondary">Auto-logout after inactivity</p>
            </div>
            <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
              <option>4 hours</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">🌐 Login Activity Logs</h2>
        <div className="text-center py-8 text-foreground-secondary">
          <p>No recent login activity to display</p>
        </div>
      </div>
    </div>
  );
}
