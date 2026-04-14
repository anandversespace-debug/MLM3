'use client';

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">System Settings</h1>
        <p className="text-foreground-secondary">Configure general settings, payment gateways, and integrations</p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">⚙️ General Settings</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900" defaultValue="MLM E-Commerce Platform" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site URL</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900" defaultValue="http://localhost:3000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900" defaultValue="support@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900" defaultValue="+91 1234567890" />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="button" className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark">
                Save General Settings
              </button>
            </div>
          </form>
        </div>

        {/* Payment Gateway */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">💳 Payment Gateway Settings</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Razorpay Key ID</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900" placeholder="rzp_live_xxxxx" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Razorpay Key Secret</label>
                <input type="password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900" placeholder="••••••••••" />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="button" className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark">
                Save Payment Settings
              </button>
            </div>
          </form>
        </div>

        {/* Email/SMTP Settings */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">📧 Email / SMTP Configuration</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Host</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900" defaultValue="smtp.gmail.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Port</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900" defaultValue="587" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Username</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900" defaultValue="your-email@gmail.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Password</label>
                <input type="password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900" placeholder="••••••••••" />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="button" className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark">
                Save Email Settings
              </button>
            </div>
          </form>
        </div>

        {/* Tax/GST Settings */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">🧾 Tax / GST Settings</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GST Rate (%)</label>
                <input type="number" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900" defaultValue="18" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GSTIN Number</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900" placeholder="22AAAAA0000A1Z5" />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="button" className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark">
                Save Tax Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
