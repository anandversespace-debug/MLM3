import Link from 'next/link';

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-6 text-foreground-secondary">
        <div>
          <h2 className="text-lg font-bold text-foreground">How does the 10-level MLM network work?</h2>
          <p className="mt-2 text-sm">When you successfully invite another user with your secure Referral Code, they are placed directly into your Level 1 downline. You will autonomously earn calculated percentage commissions every single time they purchase products!</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">How do I verify my identity natively?</h2>
          <p className="mt-2 text-sm">Visit the Dashboard Settings pane and confidently securely upload your valid digital KYC documentation to securely unlock complete wallet withdrawals.</p>
        </div>
        <div className="mt-12 text-center pt-8 border-t">
          <Link href="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
