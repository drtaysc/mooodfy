// Frontend Page - Home
import Link from 'next/link';
import TimelinePost from '@/components/TimelinePost';
import Footer from '@/components/Footer';
import { postController } from '@/server/controllers/postController';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getPosts() {
  try {
    return await postController.getAllPosts(20, 0);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      {/* Main Content - Light Cream */}
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

            {/* Timeline - Organic Design */}
            <div className="relative">
              {posts.length === 0 ? (
                <div className="text-center py-24">
                  <div className="inline-block p-8 rounded-organic-lg bg-white/50 shadow-mental mb-8">
                    <svg
                      className="w-20 h-20 text-mental-green"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-mental-brown mb-4">
                    No posts yet
                  </h2>
                  <p className="text-xl lg:text-2xl font-semibold text-mental-brown/60 max-w-2xl mx-auto">
                    Check back soon for new journal entries
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {posts.map((post, index) => (
                    <TimelinePost
                      key={post.id}
                      post={post}
                      isLast={index === posts.length - 1}
                    />
                  ))}
                </div>
              )}
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
