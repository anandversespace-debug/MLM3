'use client';

import { useState, useEffect } from 'react';
import { formatDate } from '@/utils/helpers';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // In production: fetch from /api/notifications
    setNotifications([]);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  if (notifications.length === 0) {
    return (
      <div>
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
            <p className="text-foreground-secondary">Stay updated with your activity</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">🔔</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">No Notifications</h2>
          <p className="text-foreground-secondary">
            You're all caught up! Notifications will appear here
          </p>
        </div>
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
          <p className="text-foreground-secondary">
            {unreadCount} unread notification(s)
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-primary hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-xl shadow-md p-6 ${
              !notification.read ? 'border-l-4 border-primary' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{notification.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  {notification.title}
                </h3>
                <p className="text-sm text-foreground-secondary mb-2">
                  {notification.message}
                </p>
                <p className="text-xs text-foreground-secondary">
                  {formatDate(new Date(notification.createdAt))}
                </p>
              </div>
              {!notification.read && (
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
