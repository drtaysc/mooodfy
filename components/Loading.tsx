// Loading Component - Reusable loading UI
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-6">
        {/* Animated spinner */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-organic-lg bg-mental-green/20 animate-pulse"></div>
          <div className="absolute inset-2 rounded-organic-lg bg-mental-green/40 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute inset-4 rounded-organic-lg bg-mental-green flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-white animate-bounce"></div>
          </div>
        </div>
        <p className="text-2xl font-bold text-mental-brown">加载中...</p>
      </div>
    </div>
  );
}

// Loading spinner for inline use
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 rounded-full border-4 border-mental-green/20"></div>
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-mental-green animate-spin"></div>
    </div>
  );
}

// Skeleton loader for posts
export function PostSkeleton() {
  return (
    <article className="relative flex gap-8">
      {/* Timeline dot skeleton */}
      <div className="relative z-10 flex-shrink-0">
        <div className="w-16 h-16 rounded-organic-lg bg-mental-green/20 animate-pulse"></div>
      </div>

      {/* Post content skeleton */}
      <div className="flex-1 pt-4">
        <div className="bg-white rounded-organic-lg p-8 shadow-mental border-2 border-mental-green/10">
          <div className="space-y-4">
            <div className="h-10 bg-mental-cream rounded-lg w-3/4 animate-pulse"></div>
            <div className="h-6 bg-mental-cream rounded-lg w-1/2 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="h-24 bg-mental-cream rounded-lg w-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="flex gap-2">
              <div className="h-8 bg-mental-cream rounded-organic-lg w-20 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="h-8 bg-mental-cream rounded-organic-lg w-20 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// Timeline skeleton loader
export function TimelineSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-8">
      {Array.from({ length: count }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
}

