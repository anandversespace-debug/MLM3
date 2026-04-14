'use client';

import { useState, useEffect } from 'react';

export default function InventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?limit=100');
      const json = await res.json();
      if (json.success) {
        let filtered = json.data.products;
        if (filter === 'LOW') {
          filtered = filtered.filter((p: any) => p.stock > 0 && p.stock < 10);
        } else if (filter === 'OUT') {
          filtered = filtered.filter((p: any) => p.stock === 0);
        }
        setProducts(filtered);
      }
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Inventory / Stock Management</h1>
        <p className="text-foreground-secondary">Monitor and manage product stock levels</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {[
            { value: 'ALL', label: '📦 All Products' },
            { value: 'LOW', label: '⚠️ Low Stock (<10)' },
            { value: 'OUT', label: '❌ Out of Stock' },
          ].map((status) => (
            <button
              key={status.value}
              onClick={() => setFilter(status.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No products found for this filter
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${
                product.stock === 0
                  ? 'border-red-500'
                  : product.stock < 10
                  ? 'border-yellow-500'
                  : 'border-green-500'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
                  <p className="text-sm text-foreground-secondary mt-1">{product.category || 'Uncategorized'}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    product.stock === 0
                      ? 'bg-red-100 text-red-800'
                      : product.stock < 10
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {product.stock === 0 ? 'OUT OF STOCK' : `${product.stock} units`}
                </span>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-foreground-secondary">Price:</span>
                  <span className="font-medium">₹{product.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-secondary">Status:</span>
                  <span className={`font-medium ${product.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {product.stock < 10 && product.stock > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800 font-medium">⚠️ Low Stock Alert</p>
                  <p className="text-xs text-yellow-700 mt-1">Consider restocking soon</p>
                </div>
              )}

              {product.stock === 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-red-800 font-medium">❌ Out of Stock</p>
                  <p className="text-xs text-red-700 mt-1">Product needs immediate restocking</p>
                </div>
              )}

              <button className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors">
                Update Stock
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
