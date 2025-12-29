// Support Page
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/Loading';
import { apiService } from '@/services/api';

export default function SupportPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiService.createTicket({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      console.error('Error submitting ticket:', error);
      alert(`提交失败：${error.message || 'Please try again later'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-mental-cream">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
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
          <span className="text-xl font-bold">Back to Home</span>
        </Link>

        <div className="bg-white rounded-organic-lg p-10 lg:p-16 shadow-mental-lg border-2 border-mental-green/10">
          <h1 className="text-5xl lg:text-7xl font-bold text-mental-brown mb-8 leading-tight">
            Support
          </h1>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-mental-brown mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-mental-brown mb-2">How do I create a journal entry?</h3>
                <p className="text-mental-brown">
                  Journal entries can be created through the admin dashboard. Contact an administrator for access.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-mental-brown mb-2">Can I edit my posts?</h3>
                <p className="text-mental-brown">
                  Currently, posts can only be edited through the admin dashboard. Please contact support if you need assistance.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-mental-brown mb-2">Is my information secure?</h3>
                <p className="text-mental-brown">
                  Yes, we take your privacy seriously. Please review our <Link href="/privacy" className="text-mental-green hover:underline">Privacy Policy</Link> for more information.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-mental-brown mb-6">Contact Support</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xl font-bold text-mental-brown mb-4">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-organic-lg border-2 border-mental-brown/20 bg-mental-cream text-mental-brown text-lg font-semibold focus:ring-4 focus:ring-mental-green/30 focus:border-mental-green transition-all"
                  placeholder="Your name"
                />
              </div>

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
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xl font-bold text-mental-brown mb-4">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-6 py-4 rounded-organic-lg border-2 border-mental-brown/20 bg-mental-cream text-mental-brown text-lg font-semibold focus:ring-4 focus:ring-mental-green/30 focus:border-mental-green transition-all"
                  placeholder="What can we help you with?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xl font-bold text-mental-brown mb-4">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-6 py-4 rounded-organic-lg border-2 border-mental-brown/20 bg-mental-cream text-mental-brown text-lg font-semibold focus:ring-4 focus:ring-mental-green/30 focus:border-mental-green transition-all"
                  placeholder="Please describe your issue or question..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-10 py-5 rounded-organic-lg bg-mental-green text-white text-xl font-bold hover:shadow-mental-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading && <LoadingSpinner size="sm" />}
                {loading ? 'Sending...' : 'Submit Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

