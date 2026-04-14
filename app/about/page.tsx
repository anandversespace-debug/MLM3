import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-ultra-light to-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">About Us</h1>
          <p className="text-xl text-foreground-secondary">
            Revolutionizing e-commerce with opportunities for everyone to earn
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
          <p className="text-foreground-secondary mb-8">
            We believe that everyone deserves the opportunity to earn passive income while shopping for quality products.
            Our platform combines e-commerce with a powerful 10-level MLM system, allowing you to build a network
            and earn commissions from your referrals.
          </p>

          <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 my-12">
            <div className="text-center">
              <div className="text-5xl mb-4">1️⃣</div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-foreground-secondary">Create your free account and get your unique referral code</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">2️⃣</div>
              <h3 className="text-xl font-semibold mb-2">Shop</h3>
              <p className="text-foreground-secondary">Purchase products worth ₹10,000 to become eligible</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">3️⃣</div>
              <h3 className="text-xl font-semibold mb-2">Earn</h3>
              <p className="text-foreground-secondary">Share your code and earn from 10 levels of referrals</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Us?</h2>
          <ul className="space-y-3 text-foreground-secondary">
            <li>✅ Up to 10% commission on direct referrals</li>
            <li>✅ 10-level deep commission structure</li>
            <li>✅ Real-time commission tracking</li>
            <li>✅ Instant wallet withdrawals</li>
            <li>✅ Quality products at competitive prices</li>
            <li>✅ Secure payment gateway</li>
            <li>✅ 24/7 customer support</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Earning?</h2>
          <p className="text-xl text-primary-light mb-8">Join thousands of members already earning with our platform</p>
          <Link href="/register">
            <Button variant="secondary" size="lg">Join Now - It's Free</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
