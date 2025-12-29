// Loading UI for Admin Dashboard
export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-mental-cream">
      <main className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        {/* Back button skeleton */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-mental-brown/20 animate-pulse"></div>
            <div className="h-6 w-32 bg-mental-brown/20 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Header skeleton */}
        <div className="mb-12">
          <div className="h-16 bg-mental-cream rounded-lg w-96 mb-4 animate-pulse"></div>
          <div className="h-8 bg-mental-cream rounded-lg w-80 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
        </div>

        {/* Stats Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-organic-lg p-8 shadow-mental-lg border-2 border-mental-green/10">
            <div className="h-8 bg-mental-cream rounded-lg w-40 mb-4 animate-pulse"></div>
            <div className="h-16 bg-mental-cream rounded-lg w-24 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
          </div>
          <div className="bg-white rounded-organic-lg p-8 shadow-mental-lg border-2 border-mental-green/10">
            <div className="h-8 bg-mental-cream rounded-lg w-48 mb-4 animate-pulse"></div>
            <div className="h-16 bg-mental-cream rounded-lg w-24 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
          </div>
        </div>

        {/* Quick Actions skeleton */}
        <div className="bg-white rounded-organic-lg p-10 shadow-mental-lg border-2 border-mental-green/10 mb-12">
          <div className="h-10 bg-mental-cream rounded-lg w-48 mb-6 animate-pulse"></div>
          <div className="flex flex-wrap gap-4">
            <div className="h-12 bg-mental-cream rounded-organic-lg w-48 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="h-12 bg-mental-cream rounded-organic-lg w-32 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Recent Posts skeleton */}
        <div className="bg-white rounded-organic-lg p-10 shadow-mental-lg border-2 border-mental-green/10">
          <div className="h-10 bg-mental-cream rounded-lg w-48 mb-6 animate-pulse"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 rounded-organic-lg bg-mental-cream border-2 border-mental-brown/10"
              >
                <div className="space-y-3">
                  <div className="h-8 bg-white rounded-lg w-3/4 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                  <div className="h-6 bg-white rounded-lg w-full animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.1}s` }}></div>
                  <div className="h-5 bg-white rounded-lg w-1/2 animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.2}s` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

