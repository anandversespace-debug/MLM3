'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/utils/helpers';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string;
  category: string;
  isActive: boolean;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setProduct(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images ? JSON.parse(product.images)[0] : undefined,
    });
    
    alert(`Added ${quantity} item(s) to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h2>
          <Link href="/products">
            <Button variant="primary">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2 text-foreground-secondary">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li>/</li>
            <li><Link href="/products" className="hover:text-primary">Products</Link></li>
            <li>/</li>
            <li className="text-foreground">{product.name}</li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-gradient-to-br from-primary-light to-primary-ultra-light rounded-2xl h-96 flex items-center justify-center">
            <svg className="w-32 h-32 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>

          {/* Product Info */}
          <div>
            <div className="text-sm font-medium text-primary mb-2 uppercase tracking-wide">
              {product.category}
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>
            
            <div className="mb-6">
              <span className="text-4xl font-bold text-primary">
                {formatCurrency(product.price)}
              </span>
            </div>

            <div className="prose prose-lg mb-8">
              <p className="text-foreground-secondary">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock === 0 ? (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              ) : product.stock < 10 ? (
                <span className="text-orange-600 font-semibold">Only {product.stock} left in stock</span>
              ) : (
                <span className="text-green-600 font-semibold">In Stock ({product.stock} available)</span>
              )}
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-16 text-center text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              {product.stock > 0 && (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-1"
                >
                  Add to Cart - {formatCurrency(product.price * quantity)}
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push('/products')}
              >
                Back to Products
              </Button>
            </div>

            {/* MLM Info */}
            <div className="mt-8 bg-primary-ultra-light rounded-xl p-6">
              <h3 className="font-semibold text-primary mb-2">💡 Earn with MLM</h3>
              <p className="text-sm text-foreground-secondary mb-2">
                Purchase products worth ₹10,000 to become eligible for MLM commissions.
              </p>
              <p className="text-sm text-foreground-secondary">
                Earn up to 10% commission on direct referrals across 10 levels!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
