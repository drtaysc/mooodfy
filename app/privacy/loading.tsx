// Loading UI for Privacy Policy Page
export default function PrivacyLoading() {
  return (
    <div className="min-h-screen bg-mental-cream">
      <main className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
        {/* Back button skeleton */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-mental-brown/20 animate-pulse"></div>
            <div className="h-6 w-32 bg-mental-brown/20 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Content skeleton */}
        <article className="bg-white rounded-organic-lg p-10 lg:p-16 shadow-mental-lg border-2 border-mental-green/10">
          <div className="h-16 bg-mental-cream rounded-lg w-80 mb-8 animate-pulse"></div>
          <div className="h-5 bg-mental-cream rounded-lg w-48 mb-8 animate-pulse" style={{ animationDelay: '0.1s' }}></div>

          <div className="space-y-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <section key={i} className="space-y-4">
                <div className="h-10 bg-mental-cream rounded-lg w-96 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                <div className="h-6 bg-mental-cream rounded-lg w-full animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.1}s` }}></div>
                <div className="h-6 bg-mental-cream rounded-lg w-5/6 animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.2}s` }}></div>
              </section>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}

