// Frontend Component - Timeline Post Card
import Link from 'next/link';
import { format } from 'date-fns';
import { BlogPost } from '@/types/blog';

interface TimelinePostProps {
  post: BlogPost;
  isLast?: boolean;
}

export default function TimelinePost({ post, isLast = false }: TimelinePostProps) {
  const date = new Date(post.created_at);
  const formattedDate = format(date, 'MMM dd, yyyy');
  const formattedTime = format(date, 'HH:mm');

  return (
    <article className="relative flex gap-8 group">
      {/* Timeline line - Green gradient */}
      {!isLast && (
        <div className="absolute left-8 top-24 bottom-0 w-1 bg-gradient-to-b from-mental-green/40 via-mental-green/20 to-transparent" />
      )}
      
      {/* Timeline dot - Green design */}
      <div className="relative z-10 flex-shrink-0">
        <div className="w-16 h-16 rounded-organic-lg bg-mental-green flex items-center justify-center shadow-mental-lg ring-4 ring-cream">
          <div className="w-10 h-10 rounded-full bg-white/90" />
        </div>
      </div>

      {/* Post content - Big bold, organic design */}
      <div className="flex-1 pt-4">
        <div className="bg-white rounded-organic-lg p-8 shadow-mental hover:shadow-mental-lg transition-all duration-300 border-2 border-transparent hover:border-mental-green/20">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <Link href={`/posts/${post.id}`}>
                <h2 className="text-3xl lg:text-4xl font-bold text-mental-brown hover:text-mental-green transition-colors cursor-pointer mb-4 leading-tight">
                  {post.title}
                </h2>
              </Link>
              <div className="flex items-center gap-4 text-base font-semibold text-mental-brown">
                <span>{post.author}</span>
                <span>•</span>
                <time dateTime={post.created_at}>{formattedDate}</time>
                <span>•</span>
                <time>{formattedTime}</time>
              </div>
            </div>
            {post.mood && (
              <span className="px-5 py-2.5 rounded-organic-lg text-sm font-bold bg-mental-green/10 text-mental-green border-2 border-mental-green/20">
                {post.mood}
              </span>
            )}
          </div>

          {post.excerpt && (
            <p className="text-xl font-semibold text-mental-brown mb-6 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-organic-lg text-sm font-bold bg-mental-cream text-mental-brown border-2 border-mental-brown/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <Link
            href={`/posts/${post.id}`}
            className="inline-flex items-center gap-3 mt-6 text-lg font-bold text-mental-green hover:text-mental-brown transition-colors group"
          >
            Read more
            <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

