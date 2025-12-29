// Admin Dashboard
import Link from 'next/link';
import { apiService } from '@/services/api';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import LogoutButton from '@/components/LogoutButton';

async function getStats() {
  try {
    const posts = await apiService.getPosts(1000, 0);
    const ticketStats = await apiService.getTicketStats();
    const recentTickets = await apiService.getTickets(10, 0);
    
    return {
      totalPosts: posts.length,
      publishedPosts: posts.filter(p => p.published).length,
      recentPosts: posts.slice(0, 5),
      ticketStats,
      recentTickets,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      totalPosts: 0,
      publishedPosts: 0,
      recentPosts: [],
      ticketStats: {
        total: 0,
        open: 0,
        in_progress: 0,
        resolved: 0,
        closed: 0,
      },
      recentTickets: [],
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <main className="min-h-screen bg-mental-cream">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        <div className="mb-12 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-mental-brown hover:text-mental-green transition-colors group"
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
            <span className="text-xl font-bold">Back to Blog</span>
          </Link>
          <LogoutButton />
        </div>

        <div className="mb-12">
          <h1 className="text-5xl lg:text-7xl font-bold text-mental-brown mb-4 leading-tight">
            Admin Dashboard
          </h1>
          <p className="text-2xl font-semibold text-mental-brown/70">
            Manage your blog posts and content
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-organic-lg p-8 shadow-mental-lg border-2 border-mental-green/10">
            <h2 className="text-2xl font-bold text-mental-brown mb-4">Total Posts</h2>
            <p className="text-5xl font-bold text-mental-green">{stats.totalPosts}</p>
          </div>

          <div className="bg-white rounded-organic-lg p-8 shadow-mental-lg border-2 border-mental-green/10">
            <h2 className="text-2xl font-bold text-mental-brown mb-4">Published Posts</h2>
            <p className="text-5xl font-bold text-mental-green">{stats.publishedPosts}</p>
          </div>

          <div className="bg-white rounded-organic-lg p-8 shadow-mental-lg border-2 border-mental-green/10">
            <h2 className="text-2xl font-bold text-mental-brown mb-4">Support Tickets</h2>
            <p className="text-5xl font-bold text-mental-green">{stats.ticketStats.total}</p>
            <p className="text-sm font-semibold text-mental-brown/60 mt-2">
              {stats.ticketStats.open} 待处理
            </p>
          </div>

          <div className="bg-white rounded-organic-lg p-8 shadow-mental-lg border-2 border-mental-green/10">
            <h2 className="text-2xl font-bold text-mental-brown mb-4">Open Tickets</h2>
            <p className="text-5xl font-bold text-mental-green">{stats.ticketStats.open}</p>
            <p className="text-sm font-semibold text-mental-brown/60 mt-2">
              {stats.ticketStats.in_progress} 处理中
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-organic-lg p-10 shadow-mental-lg border-2 border-mental-green/10 mb-12">
          <h2 className="text-3xl font-bold text-mental-brown mb-6">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/posts/new"
              className="px-8 py-4 rounded-organic-lg bg-mental-green text-white text-xl font-bold hover:shadow-mental-lg hover:scale-105 transition-all duration-300"
            >
              Create New Post
            </Link>
            <Link
              href="/"
              className="px-8 py-4 rounded-organic-lg border-2 border-mental-brown/20 text-mental-brown text-xl font-bold hover:bg-mental-cream hover:border-mental-brown/40 transition-all"
            >
              View Blog
            </Link>
          </div>
        </div>

        {/* Recent Support Tickets */}
        <div className="bg-white rounded-organic-lg p-10 shadow-mental-lg border-2 border-mental-green/10 mb-12">
          <h2 className="text-3xl font-bold text-mental-brown mb-6">Recent Support Tickets</h2>
          {stats.recentTickets.length === 0 ? (
            <p className="text-mental-brown text-lg">暂无支持工单</p>
          ) : (
            <div className="space-y-4">
              {stats.recentTickets.map((ticket: any) => {
                const statusColors: Record<string, string> = {
                  open: 'bg-yellow-100 text-yellow-800 border-yellow-300',
                  in_progress: 'bg-blue-100 text-blue-800 border-blue-300',
                  resolved: 'bg-green-100 text-green-800 border-green-300',
                  closed: 'bg-gray-100 text-gray-800 border-gray-300',
                };
                
                return (
                  <div
                    key={ticket.id}
                    className="p-6 rounded-organic-lg bg-mental-cream border-2 border-mental-brown/10 hover:border-mental-green/30 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-mental-brown">
                            {ticket.subject}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold border ${statusColors[ticket.status] || statusColors.open}`}>
                            {ticket.status === 'open' ? '待处理' : 
                             ticket.status === 'in_progress' ? '处理中' :
                             ticket.status === 'resolved' ? '已解决' : '已关闭'}
                          </span>
                        </div>
                        <p className="text-mental-brown mb-3 line-clamp-2">{ticket.message}</p>
                        <div className="flex items-center gap-4 text-sm font-semibold text-mental-brown">
                          <span>{ticket.name}</span>
                          <span>•</span>
                          <span>{ticket.email}</span>
                          <span>•</span>
                          <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-organic-lg p-10 shadow-mental-lg border-2 border-mental-green/10">
          <h2 className="text-3xl font-bold text-mental-brown mb-6">Recent Posts</h2>
          {stats.recentPosts.length === 0 ? (
            <p className="text-mental-brown text-lg">No posts yet. Create your first post!</p>
          ) : (
            <div className="space-y-4">
              {stats.recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-6 rounded-organic-lg bg-mental-cream border-2 border-mental-brown/10 hover:border-mental-green/30 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link
                        href={`/posts/${post.id}`}
                        className="text-2xl font-bold text-mental-brown hover:text-mental-green transition-colors mb-2 block"
                      >
                        {post.title}
                      </Link>
                      <p className="text-mental-brown mb-2">{post.excerpt || 'No excerpt'}</p>
                      <div className="flex items-center gap-4 text-sm font-semibold text-mental-brown">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        {post.mood && (
                          <>
                            <span>•</span>
                            <span className="px-3 py-1 rounded-full bg-mental-green/10 text-mental-green border border-mental-green/20">
                              {post.mood}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Link
                        href={`/posts/${post.id}`}
                        className="px-4 py-2 rounded-organic-lg bg-mental-green text-white font-bold hover:shadow-mental transition-all"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

