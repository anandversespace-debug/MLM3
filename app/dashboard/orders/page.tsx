'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency, formatDate } from '@/utils/helpers';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // In production: fetch from /api/orders
    setOrders([]);
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
        <p className="text-foreground-secondary">View your order history</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">No Orders Yet</h2>
          <p className="text-foreground-secondary mb-6">
            Start shopping to see your orders here
          </p>
          <a
            href="/products"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-hover"
          >
            Browse Products
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-foreground-secondary">
                    Order #{order.id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-sm text-foreground-secondary">
                    {formatDate(new Date(order.createdAt))}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'DELIVERED'
                      ? 'bg-green-100 text-green-700'
                      : order.status === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {order.items.length} item(s)
                  </p>
                  <p className="text-sm text-foreground-secondary">
                    Payment: {order.paymentStatus}
                  </p>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(order.totalAmount)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
