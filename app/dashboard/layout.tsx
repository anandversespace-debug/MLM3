'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: '📊' },
  { name: 'Orders', href: '/dashboard/orders', icon: '📦' },
  { name: 'Referrals', href: '/dashboard/referrals', icon: '👥' },
  { name: 'Earnings', href: '/dashboard/earnings', icon: '💰' },
  { name: 'Wallet', href: '/dashboard/wallet', icon: '💳' },
  { name: 'Transactions', href: '/dashboard/transactions', icon: '📈' },
  { name: 'Wishlist', href: '/dashboard/wishlist', icon: '❤️' },
  { name: 'Profile', href: '/dashboard/profile', icon: '👤' },
  { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  { name: 'Notifications', href: '/dashboard/notifications', icon: '🔔' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden lg:flex lg:flex-col sticky top-0 h-screen">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
          <p className="text-sm text-foreground-secondary mt-1">{user.name}</p>
        </div>
        
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-primary text-white'
                  : 'text-foreground hover:bg-primary-ultra-light'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="w-full p-4 border-t mt-auto">
          <Button variant="outline" className="w-full" onClick={() => router.push('/')}>
            ← Back to Home
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm lg:hidden">
          <div className="px-4 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Dashboard</h2>
            <Button variant="outline" size="sm" onClick={() => router.push('/')}>
              Home
            </Button>
          </div>
          <div className="px-4 pb-4 flex gap-2 overflow-x-auto">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === item.href
                    ? 'bg-primary text-white'
                    : 'bg-surface text-foreground'
                }`}
              >
                {item.icon} {item.name}
              </Link>
            ))}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
