'use client';

export default function NotificationsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Notification Management</h1>
        <p className="text-foreground-secondary">Manage email templates and broadcast notifications</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">📧 Email Templates</h2>
          <p className="text-foreground-secondary mb-4">Manage email templates for automated notifications</p>
          <div className="space-y-2">
            {['Welcome Email', 'Commission Notification', 'Order Confirmation', 'Withdrawal Update', 'Password Reset'].map((template) => (
              <div key={template} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{template}</span>
                <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">Edit</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">📱 SMS & WhatsApp Templates</h2>
          <p className="text-foreground-secondary mb-4">Configure SMS and WhatsApp message templates</p>
          <div className="space-y-2">
            {['Order Update SMS', 'OTP Verification', 'Payment Receipt', 'Withdrawal Alert'].map((template) => (
              <div key={template} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{template}</span>
                <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">Edit</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">📢 Broadcast Notification</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notification Title</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900" placeholder="e.g., System Maintenance" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea rows={4} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900" placeholder="Enter your message..."></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Send Via</label>
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900">
                <option>Email</option>
                <option>SMS</option>
                <option>WhatsApp</option>
                <option>All Channels</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-900">
                <option>All Users</option>
                <option>Active Users Only</option>
                <option>MLM Eligible Users</option>
                <option>Custom Segment</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="button" className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark">
              Send Broadcast
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
