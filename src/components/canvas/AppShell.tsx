'use client';

import dynamic from 'next/dynamic';

// Dynamically import the main canvas view to prevent SSR issues with tldraw
// This must be inside a 'use client' file in Next.js 16+
const MainView = dynamic(() => import('@/components/canvas/MainView'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-500"></div>
        <p className="text-sm font-medium">Loading Editor...</p>
      </div>
    </div>
  ),
});

export function AppShell() {
  return <MainView />;
}
