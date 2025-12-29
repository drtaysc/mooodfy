// Loading UI for Home Page
import { TimelineSkeleton } from '@/components/Loading';

export default function Loading() {
  return (
    <main className="min-h-screen bg-mental-cream">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        {/* Header - Big Bold Typography */}
        <div className="mb-16">
          <h1 className="text-7xl lg:text-8xl font-bold text-mental-brown mb-6 leading-tight">
            Mooodfy
          </h1>
          <p className="text-2xl lg:text-3xl font-semibold text-mental-brown/70 max-w-3xl leading-relaxed">
            Record your mood, share your story, nurture your mind
          </p>
        </div>

        {/* Timeline Skeleton */}
        <div className="relative">
          <TimelineSkeleton count={5} />
        </div>
      </div>
    </main>
  );
}

