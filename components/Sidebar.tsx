'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <aside className="hidden lg:flex w-24 flex-col items-center py-8 bg-mental-brown min-h-screen fixed left-0 top-0 z-50">
      <div className="mb-8">
        <Link href="/" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          <div className="w-6 h-6 grid grid-cols-2 gap-1">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </Link>
      </div>
      <nav className="flex flex-col gap-4">
        <Link 
          href="/" 
          className={`w-16 h-16 rounded-2xl transition-colors flex items-center justify-center ${
            isActive('/') && pathname === '/'
              ? 'bg-white/10 hover:bg-white/20'
              : 'hover:bg-white/10'
          }`}
          title="首页"
        >
          <svg className={`w-8 h-8 ${isActive('/') && pathname === '/' ? 'text-white' : 'text-white/60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
        <Link 
          href="/support" 
          className={`w-16 h-16 rounded-2xl transition-colors flex items-center justify-center ${
            isActive('/support')
              ? 'bg-white/10 hover:bg-white/20'
              : 'hover:bg-white/10'
          }`}
          title="支持"
        >
          <svg className={`w-8 h-8 ${isActive('/support') ? 'text-white' : 'text-white/60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </Link>
        <Link 
          href="/privacy" 
          className={`w-16 h-16 rounded-2xl transition-colors flex items-center justify-center ${
            isActive('/privacy')
              ? 'bg-white/10 hover:bg-white/20'
              : 'hover:bg-white/10'
          }`}
          title="隐私政策"
        >
          <svg className={`w-8 h-8 ${isActive('/privacy') ? 'text-white' : 'text-white/60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </Link>
        <Link 
          href="/terms" 
          className={`w-16 h-16 rounded-2xl transition-colors flex items-center justify-center ${
            isActive('/terms')
              ? 'bg-white/10 hover:bg-white/20'
              : 'hover:bg-white/10'
          }`}
          title="服务条款"
        >
          <svg className={`w-8 h-8 ${isActive('/terms') ? 'text-white' : 'text-white/60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </Link>
      </nav>
    </aside>
  );
}

