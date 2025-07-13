'use client'

import dynamic from 'next/dynamic';

// Dynamic import for Hero component with loading state
const Hero = dynamic(() => import("@/components/Hero"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">
        <div className="h-12 bg-gray-200 rounded-lg w-64 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-96 mb-8"></div>
        <div className="flex gap-4">
          <div className="h-12 bg-gray-200 rounded w-32"></div>
          <div className="h-12 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </div>
  ),
  ssr: true
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero section */}
      <Hero />
    </main>
  );
}
