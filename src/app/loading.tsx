export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-500"></div>
        <p className="text-sm font-medium">Loading Application...</p>
      </div>
    </div>
  );
}
