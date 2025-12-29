// Loading UI for Post Detail Page
import Loading from '@/components/Loading';

export default function PostLoading() {
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

        {/* Article skeleton */}
        <article className="bg-white rounded-organic-lg p-10 lg:p-16 shadow-mental-lg border-2 border-mental-green/10">
          {/* Header skeleton */}
          <header className="mb-12 space-y-6">
            <div className="h-20 bg-mental-cream rounded-lg w-full animate-pulse"></div>
            <div className="flex flex-wrap items-center gap-6">
              <div className="h-6 bg-mental-cream rounded-lg w-32 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="h-6 bg-mental-cream rounded-lg w-40 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-6 bg-mental-cream rounded-lg w-24 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="h-8 bg-mental-cream rounded-organic-lg w-24 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="h-8 bg-mental-cream rounded-organic-lg w-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="h-8 bg-mental-cream rounded-organic-lg w-24 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </header>

          {/* Content skeleton */}
          <div className="space-y-4">
            <div className="h-6 bg-mental-cream rounded-lg w-full animate-pulse"></div>
            <div className="h-6 bg-mental-cream rounded-lg w-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="h-6 bg-mental-cream rounded-lg w-5/6 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="h-6 bg-mental-cream rounded-lg w-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="h-6 bg-mental-cream rounded-lg w-4/5 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            <div className="h-6 bg-mental-cream rounded-lg w-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </article>
      </main>
    </div>
  );
}

