'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const adminMenuItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/users', label: 'User Management', icon: '👥' },
  { href: '/admin/admins', label: 'Admin Management', icon: '🛂' },
  { href: '/admin/products', label: 'Product Management', icon: '🛒' },
  { href: '/admin/inventory', label: 'Inventory', icon: '📦' },
  { href: '/admin/orders', label: 'Orders', icon: '📑' },
  { href: '/admin/transactions', label: 'Transactions', icon: '💰' },
  { href: '/admin/withdrawals', label: 'Withdrawals', icon: '💸' },
  { href: '/admin/mlm', label: 'MLM System', icon: '🌐' },
  { href: '/admin/coupons', label: 'Coupons', icon: '🎟️' },
  { href: '/admin/notifications', label: 'Notifications', icon: '📢' },
  { href: '/admin/media', label: 'Media Library', icon: '🖼️' },
  { href: '/admin/content', label: 'Content/CMS', icon: '🧾' },
  { href: '/admin/support', label: 'Support', icon: '🎫' },
  { href: '/admin/reports', label: 'Reports', icon: '📈' },
  { href: '/admin/security', label: 'Security', icon: '🔐' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  { href: '/admin/audit-logs', label: 'Audit Logs', icon: '🧪' },
  { href: '/', label: 'Back to Site', icon: '🌐' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || (user && user.role !== 'ADMIN')) {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-foreground-secondary">Access Denied. Admin only.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white transition-all duration-300 flex flex-col sticky top-0 h-screen ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <p className="text-sm text-gray-400">Management Console</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-800 rounded"
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {adminMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="w-full p-4 border-t border-gray-700 mt-auto">
          <div className="flex items-center gap-4 px-4 py-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold">
              {user.name.charAt(0)}
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">
            {adminMenuItems.find((item) => item.href === pathname)?.label || 'Admin'}
          </h2>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
