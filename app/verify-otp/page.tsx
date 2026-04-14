'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

function VerifyOTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!email) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Invalid Request</h1>
        <p className="text-foreground-secondary mb-6">
          Email is required for OTP verification.
        </p>
        <Link href="/register">
          <Button variant="primary" size="lg">Go to Register</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Email Verified!</h1>
        <p className="text-foreground-secondary mb-6">
          Your email has been verified successfully. Redirecting to login...
        </p>
        <Link href="/login">
          <Button variant="primary" size="lg">Login Now</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">📧</div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Verify Email</h1>
        <p className="text-foreground-secondary">
          Enter the 6-digit OTP sent to <strong>{email}</strong>
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            OTP Code
          </label>
          <input
            type="text"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-center text-3xl tracking-widest font-bold"
            placeholder="000000"
            maxLength={6}
            pattern="\d{6}"
          />
          <p className="text-xs text-foreground-secondary mt-2 text-center">
            OTP expires in 10 minutes
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={loading}
          className="w-full"
        >
          {loading ? 'Verifying...' : 'Verify Email'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-foreground-secondary">
          Didn't receive OTP?{' '}
          <button className="text-primary hover:underline">
            Resend
          </button>
        </p>
      </div>
    </>
  );
}

export default function VerifyOTPPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-ultra-light to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl font-bold text-primary">
            MLM Platform
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <Suspense
            fallback={
              <div className="text-center py-8">
                <div className="animate-spin text-4xl mb-4">⏳</div>
                <p className="text-foreground-secondary">Loading...</p>
              </div>
            }
          >
            <VerifyOTPForm />
          </Suspense>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-foreground-secondary">
          <p>
            Already verified?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
