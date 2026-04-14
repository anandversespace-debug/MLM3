'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/utils/helpers';
import Link from 'next/link';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const removeFromWishlist = (id: string) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  if (wishlist.length === 0) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Wishlist</h1>
          <p className="text-foreground-secondary">Saved products for later</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">❤️</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Your Wishlist is Empty</h2>
          <p className="text-foreground-secondary mb-6">
            Save products you love to buy later
          </p>
          <Link href="/products">
            <Button variant="primary" size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Wishlist</h1>
        <p className="text-foreground-secondary">{wishlist.length} saved items</p>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="aspect-square bg-gray-200 relative">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-6xl">📦</div>
              )}
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-1 truncate">{product.name}</h3>
              <p className="text-2xl font-bold text-primary mb-3">{formatCurrency(product.price)}</p>
              <Link href={`/products/${product.id}`}>
                <Button variant="primary" size="sm" className="w-full">View Product</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
