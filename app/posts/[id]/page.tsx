// Frontend Page - Post Detail
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import { apiService } from '@/services/api';

async function getPost(id: string) {
  try {
    return await apiService.getPost(id);
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  const date = new Date(post.created_at);
  const formattedDate = format(date, 'MMMM dd, yyyy');
  const formattedTime = format(date, 'HH:mm');

  return (
    <main className="min-h-screen bg-mental-cream">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
        {/* Back button - Big bold */}
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
          <span className="text-xl font-bold">Back to Timeline</span>
        </Link>

        {/* Article - Big bold, organic design */}
        <article className="bg-white rounded-organic-lg p-10 lg:p-16 shadow-mental-lg border-2 border-mental-green/10">
          {/* Header - Big bold typography */}
          <header className="mb-12">
            <h1 className="text-5xl lg:text-7xl font-bold text-mental-brown mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-lg font-semibold text-mental-brown mb-8">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time dateTime={post.created_at}>{formattedDate}</time>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <time>{formattedTime}</time>
              </div>
              {post.mood && (
                <span className="px-5 py-2.5 rounded-organic-lg text-base font-bold bg-mental-green/10 text-mental-green border-2 border-mental-green/20">
                  {post.mood}
                </span>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
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
          </header>

          {/* Content - Big bold typography */}
          <div
            className="prose prose-xl max-w-none
              prose-headings:text-mental-brown prose-headings:font-bold
              prose-p:text-mental-brown prose-p:text-xl prose-p:leading-relaxed prose-p:font-semibold
              prose-a:text-mental-green prose-a:font-bold
              prose-strong:text-mental-brown prose-strong:font-bold
              prose-code:text-mental-green prose-code:font-bold"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />
        </article>
      </div>
    </main>
  );
}

