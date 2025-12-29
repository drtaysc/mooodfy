// Privacy Policy Page
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-mental-cream">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-mental-brown hover:text-mental-green mb-12 transition-colors group"
        >
          <svg
            className="w-8 h-8 transform group-hover:-translate-x-2 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-xl font-bold">Back to Home</span>
        </Link>

        <article className="bg-white rounded-organic-lg p-10 lg:p-16 shadow-mental-lg border-2 border-mental-green/10">
          <h1 className="text-5xl lg:text-7xl font-bold text-mental-brown mb-8 leading-tight">
            Privacy Policy
          </h1>

          <div className="prose prose-xl max-w-none
            prose-headings:text-mental-brown prose-headings:font-bold
            prose-p:text-mental-brown prose-p:text-lg prose-p:leading-relaxed
            prose-a:text-mental-green prose-a:font-bold
            prose-strong:text-mental-brown prose-strong:font-bold
            prose-ul:text-mental-brown prose-li:text-mental-brown">
            
            <p className="text-mental-brown/70 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-mental-brown mb-4">1. Information We Collect</h2>
              <p className="text-mental-brown mb-4">
                We collect information that you provide directly to us, including when you create an account, post content, or contact us for support.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-mental-brown mb-4">2. How We Use Your Information</h2>
              <p className="text-mental-brown mb-4">
                We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-mental-brown mb-4">3. Information Sharing</h2>
              <p className="text-mental-brown mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share information only as described in this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-mental-brown mb-4">4. Data Security</h2>
              <p className="text-mental-brown mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-mental-brown mb-4">5. Your Rights</h2>
              <p className="text-mental-brown mb-4">
                You have the right to access, update, or delete your personal information at any time. Please contact us to exercise these rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-mental-brown mb-4">6. Contact Us</h2>
              <p className="text-mental-brown mb-4">
                If you have questions about this Privacy Policy, please contact us through our <Link href="/support" className="text-mental-green hover:underline">support page</Link>.
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}

