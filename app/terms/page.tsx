// Terms of Service Page
import Link from 'next/link';

export default function TermsPage() {
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
            Terms of Service
          </h1>

          <div className="prose prose-xl max-w-none
            prose-headings:text-mental-brown prose-headings:font-bold
            prose-p:text-mental-brown prose-p:text-lg prose-p:leading-relaxed
            prose-a:text-mental-green prose-a:font-bold
            prose-strong:text-mental-brown prose-strong:font-bold
            prose-ul:text-mental-brown prose-li:text-mental-brown">
            
            <p className="text-mental-brown/70 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-mental-brown mb-4">1. Acceptance of Terms</h2>
              <p className="text-mental-brown mb-4">
                By accessing and using this Mooodfy platform, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-mental-brown mb-4">2. Use License</h2>
              <p className="text-mental-brown mb-4">
                Permission is granted to temporarily access the materials on this website for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-mental-brown mb-4">3. Privacy</h2>
              <p className="text-mental-brown mb-4">
                Your use of this platform is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-mental-brown mb-4">4. Content</h2>
              <p className="text-mental-brown mb-4">
                All content published on this platform is for informational purposes only and should not be considered as professional medical advice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-mental-brown mb-4">5. Disclaimer</h2>
              <p className="text-mental-brown mb-4">
                The materials on this website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-mental-brown mb-4">6. Contact Information</h2>
              <p className="text-mental-brown mb-4">
                If you have any questions about these Terms of Service, please contact us through our <Link href="/support" className="text-mental-green hover:underline">support page</Link>.
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}

