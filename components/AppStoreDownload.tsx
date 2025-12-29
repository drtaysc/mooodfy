// App Store Download Link Component - Sticky Bottom Right
'use client';

import Link from 'next/link';

export default function AppStoreDownload() {
  // 替换为实际的 App Store 链接
  const appStoreUrl = 'https://apps.apple.com/app/your-app-id';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-black text-white px-6 py-4 rounded-2xl shadow-mental-lg hover:shadow-mental transition-all duration-300 hover:scale-105"
        aria-label=" App Store Download"
      >
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 4.96 7.59 9.38 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
        <div className="flex flex-col">
          <span className="text-xs leading-tight">Download from</span>
          <span className="text-sm font-semibold leading-tight">App Store</span>
        </div>
      </Link>
    </div>
  );
}

