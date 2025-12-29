'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed, please try again');
        setLoading(false);
        return;
      }

      // 登录成功，重定向到管理页面
      router.push('/admin');
      router.refresh();
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login, please try again');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-mental-cream flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-organic-lg p-10 lg:p-16 shadow-mental-lg border-2 border-mental-green/10">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-mental-brown hover:text-mental-green mb-8 transition-colors group"
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
              <span className="text-xl font-bold">Back to Home</span>
            </Link>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-mental-brown mb-8 leading-tight">
            Admin Login
          </h1>

          {error && (
            <div className="mb-6 p-4 rounded-organic-lg bg-red-50 border-2 border-red-200">
              <p className="text-red-800 font-semibold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xl font-bold text-mental-brown mb-4">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-6 py-4 rounded-organic-lg border-2 border-mental-brown/20 bg-mental-cream text-mental-brown text-lg font-semibold focus:ring-4 focus:ring-mental-green/30 focus:border-mental-green transition-all"
                placeholder="your.email@example.com"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xl font-bold text-mental-brown mb-4">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-6 py-4 rounded-organic-lg border-2 border-mental-brown/20 bg-mental-cream text-mental-brown text-lg font-semibold focus:ring-4 focus:ring-mental-green/30 focus:border-mental-green transition-all"
                placeholder="Enter password"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-10 py-5 rounded-organic-lg bg-mental-green text-white text-xl font-bold hover:shadow-mental-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

