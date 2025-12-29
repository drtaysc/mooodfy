import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import AppStoreDownload from "@/components/AppStoreDownload";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mooodfy - Timeline Journal",
  description: "Record your mood, share your story - A timeline-based journaling platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-mental-cream">
          <Sidebar />
          <div className="lg:pl-24">
            {children}
          </div>
        </div>
        <AppStoreDownload />
      </body>
    </html>
  );
}
