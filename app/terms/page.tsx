import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-blue max-w-none text-foreground-secondary">
        <p className="mb-4">Welcome to AuraMLM! These Terms of Service govern your use of our platform.</p>
        <h2 className="text-xl font-bold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">By accessing or utilizing our e-commerce network, you strictly agree to be bound by these terms.</p>
        <h2 className="text-xl font-bold text-foreground mt-8 mb-4">2. Account Registration</h2>
        <p className="mb-4">You are responsible for maintaining the strict confidentiality of your account credentials and tokens.</p>
        <div className="mt-12 text-center">
          <Link href="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
