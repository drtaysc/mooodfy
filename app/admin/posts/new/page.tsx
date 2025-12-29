// Backend Admin Page - Create New Post
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/api';
import { LoadingSpinner } from '@/components/Loading';

export default function AdminNewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    mood: '',
    tags: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tags = formData.tags
        ? formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
        : [];

      const post = await apiService.createPost({
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt || undefined,
        author: formData.author || undefined,
        mood: formData.mood || undefined,
        tags,
      });

      router.push(`/posts/${post.id}`);
    } catch (error: any) {
      console.error('Error creating post:', error);
      alert(`Failed to create entry: ${error.message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-mental-cream">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
        <div className="mb-12">
          <a
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
          </a>
        </div>

        <div className="bg-white rounded-organic-lg p-10 lg:p-16 shadow-mental-lg border-2 border-mental-green/10">
          <h1 className="text-5xl lg:text-6xl font-bold text-mental-brown mb-12">
            Create New Post
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-xl font-bold text-mental-brown mb-4"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-6 py-4 rounded-organic-lg border-2 border-mental-brown/20 bg-mental-cream text-mental-brown text-lg font-semibold focus:ring-4 focus:ring-mental-green/30 focus:border-mental-green transition-all"
                placeholder="Enter entry title..."
              />
            </div>

            <div>
              <label
                htmlFor="excerpt"
                className="block text-xl font-bold text-mental-brown mb-4"
              >
                Excerpt
              </label>
              <textarea
                id="excerpt"
                rows={3}
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                className="w-full px-6 py-4 rounded-organic-lg border-2 border-mental-brown/20 bg-mental-cream text-mental-brown text-lg font-semibold focus:ring-4 focus:ring-mental-green/30 focus:border-mental-green transition-all"
                placeholder="Enter a brief excerpt (optional)..."
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-xl font-bold text-mental-brown mb-4"
              >
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                required
                rows={12}
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full px-6 py-4 rounded-organic-lg border-2 border-mental-brown/20 bg-mental-cream text-mental-brown text-lg font-semibold focus:ring-4 focus:ring-mental-green/30 focus:border-mental-green transition-all min-h-[300px]"
                placeholder="Enter your journal content..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="author"
                  className="block text-xl font-bold text-mental-brown mb-4"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full px-6 py-4 rounded-organic-lg border-2 border-mental-brown/20 bg-mental-cream text-mental-brown text-lg font-semibold focus:ring-4 focus:ring-mental-green/30 focus:border-mental-green transition-all"
                  placeholder="Author name (optional)"
                />
              </div>

              <div>
                <label
                  htmlFor="mood"
                  className="block text-xl font-bold text-mental-brown mb-4"
                >
                  Mood
                </label>
                <input
                  type="text"
                  id="mood"
                  value={formData.mood}
                  onChange={(e) =>
                    setFormData({ ...formData, mood: e.target.value })
                  }
                  className="w-full px-6 py-4 rounded-organic-lg border-2 border-mental-brown/20 bg-mental-cream text-mental-brown text-lg font-semibold focus:ring-4 focus:ring-mental-green/30 focus:border-mental-green transition-all"
                  placeholder="e.g., Happy, Calm, Reflective..."
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-xl font-bold text-mental-brown mb-4"
              >
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full px-6 py-4 rounded-organic-lg border-2 border-mental-brown/20 bg-mental-cream text-mental-brown text-lg font-semibold focus:ring-4 focus:ring-mental-green/30 focus:border-mental-green transition-all"
                placeholder="e.g., Life, Thoughts, Feelings"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-10 py-5 rounded-organic-lg bg-mental-green text-white text-xl font-bold hover:shadow-mental-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading && <LoadingSpinner size="sm" />}
                {loading ? '发布中...' : '发布文章'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/')}
                disabled={loading}
                className="px-10 py-5 rounded-organic-lg border-2 border-mental-brown/20 text-mental-brown text-xl font-bold hover:bg-mental-cream hover:border-mental-brown/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                取消
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

