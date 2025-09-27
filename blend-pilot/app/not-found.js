"use client";

import Link from "next/link";

// Disable static generation to prevent build errors
export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <main className="bg-[#010409] text-white min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold text-[#007BFF] mb-4 font-rajdhani">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-white mb-4 font-rajdhani">
          Page Not Found
        </h2>
        <p className="text-gray-300 mb-8 max-w-md mx-auto font-sora">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-[#007BFF] text-white rounded-lg hover:bg-blue-600 transition-colors font-sora"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
