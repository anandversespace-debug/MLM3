import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-blue max-w-none text-foreground-secondary">
        <p className="mb-4">Your privacy is critically important to us.</p>
        <h2 className="text-xl font-bold text-foreground mt-8 mb-4">1. Data Collection</h2>
        <p className="mb-4">We securely collect data necessary strictly to manage your account, wallet ledger, and network lineage.</p>
        <h2 className="text-xl font-bold text-foreground mt-8 mb-4">2. Third-Party Integrations</h2>
        <p className="mb-4">Your financial information is securely tokenized via trusted network providers (e.g. Razorpay).</p>
        <div className="mt-12 text-center">
          <Link href="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
