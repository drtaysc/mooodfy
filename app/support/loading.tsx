// Loading UI for Support Page
export default function SupportLoading() {
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
        <div className="bg-white rounded-organic-lg p-10 lg:p-16 shadow-mental-lg border-2 border-mental-green/10">
          <div className="h-16 bg-mental-cream rounded-lg w-48 mb-8 animate-pulse"></div>

          {/* FAQ skeleton */}
          <div className="mb-12">
            <div className="h-10 bg-mental-cream rounded-lg w-80 mb-6 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-6 bg-mental-cream rounded-lg w-full animate-pulse" style={{ animationDelay: `${0.2 + i * 0.1}s` }}></div>
                  <div className="h-5 bg-mental-cream rounded-lg w-5/6 animate-pulse" style={{ animationDelay: `${0.3 + i * 0.1}s` }}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Form skeleton */}
          <div>
            <div className="h-10 bg-mental-cream rounded-lg w-64 mb-6 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="space-y-6">
              <div>
                <div className="h-6 bg-mental-cream rounded-lg w-24 mb-4 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                <div className="h-14 bg-mental-cream rounded-organic-lg w-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
              </div>
              <div>
                <div className="h-6 bg-mental-cream rounded-lg w-28 mb-4 animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                <div className="h-14 bg-mental-cream rounded-organic-lg w-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
              </div>
              <div>
                <div className="h-6 bg-mental-cream rounded-lg w-32 mb-4 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="h-14 bg-mental-cream rounded-organic-lg w-full animate-pulse" style={{ animationDelay: '1.1s' }}></div>
              </div>
              <div>
                <div className="h-6 bg-mental-cream rounded-lg w-32 mb-4 animate-pulse" style={{ animationDelay: '1.2s' }}></div>
                <div className="h-40 bg-mental-cream rounded-organic-lg w-full animate-pulse" style={{ animationDelay: '1.3s' }}></div>
              </div>
              <div className="h-14 bg-mental-cream rounded-organic-lg w-full animate-pulse" style={{ animationDelay: '1.4s' }}></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

