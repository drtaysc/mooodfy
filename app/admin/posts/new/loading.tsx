// Loading UI for Create New Post Page
export default function NewPostLoading() {
  return (
    <div className="min-h-screen bg-mental-cream">
      <main className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
        {/* Back button skeleton */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-mental-brown/20 animate-pulse"></div>
            <div className="h-6 w-32 bg-mental-brown/20 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Form skeleton */}
        <div className="bg-white rounded-organic-lg p-10 lg:p-16 shadow-mental-lg border-2 border-mental-green/10">
          <div className="h-16 bg-mental-cream rounded-lg w-64 mb-12 animate-pulse"></div>

          <div className="space-y-6">
            {/* Title field skeleton */}
            <div>
              <div className="h-6 bg-mental-cream rounded-lg w-24 mb-4 animate-pulse"></div>
              <div className="h-14 bg-mental-cream rounded-organic-lg w-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            </div>

            {/* Excerpt field skeleton */}
            <div>
              <div className="h-6 bg-mental-cream rounded-lg w-32 mb-4 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-24 bg-mental-cream rounded-organic-lg w-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            </div>

            {/* Content field skeleton */}
            <div>
              <div className="h-6 bg-mental-cream rounded-lg w-28 mb-4 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <div className="h-64 bg-mental-cream rounded-organic-lg w-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>

            {/* Author and Mood fields skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="h-6 bg-mental-cream rounded-lg w-24 mb-4 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                <div className="h-14 bg-mental-cream rounded-organic-lg w-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
              </div>
              <div>
                <div className="h-6 bg-mental-cream rounded-lg w-20 mb-4 animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                <div className="h-14 bg-mental-cream rounded-organic-lg w-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
              </div>
            </div>

            {/* Tags field skeleton */}
            <div>
              <div className="h-6 bg-mental-cream rounded-lg w-48 mb-4 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="h-14 bg-mental-cream rounded-organic-lg w-full animate-pulse" style={{ animationDelay: '1.1s' }}></div>
            </div>

            {/* Buttons skeleton */}
            <div className="flex gap-4 pt-4">
              <div className="flex-1 h-14 bg-mental-cream rounded-organic-lg animate-pulse" style={{ animationDelay: '1.2s' }}></div>
              <div className="w-32 h-14 bg-mental-cream rounded-organic-lg animate-pulse" style={{ animationDelay: '1.3s' }}></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

