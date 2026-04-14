'use client';

import { useState } from 'react';
import { formatCurrency, formatDate } from '@/utils/helpers';

export default function TransactionsPage() {
  const [transactions] = useState<any[]>([]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Transactions</h1>
        <p className="text-foreground-secondary">Complete transaction history</p>
      </div>

      {transactions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">No Transactions</h2>
          <p className="text-foreground-secondary">
            Transactions will appear here once you start earning
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground-secondary uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground-secondary uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground-secondary uppercase">Description</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-foreground-secondary uppercase">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="px-6 py-4 text-sm text-foreground-secondary">
                    {formatDate(new Date(tx.date))}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      tx.type === 'CREDIT' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{tx.description}</td>
                  <td className={`px-6 py-4 text-sm text-right font-semibold ${
                    tx.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {tx.type === 'CREDIT' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
