// Footer Component
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-mental-brown text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Mooodfy</h3>
            <p className="text-white/80">
              Record your mood, share your story, nurture your mind.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-white/80 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/80 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="text-white/80 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Admin</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/admin" className="text-white/80 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/posts/new" className="text-white/80 hover:text-white transition-colors">
                  Create Post
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Mooodfy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

