export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-800 bg-gray-900 p-4 shadow-lg shadow-black/20">
      <div className="mb-3 h-5 w-3/4 rounded bg-gray-800" />
      <div className="mb-2 h-4 w-full rounded bg-gray-800" />
      <div className="mb-2 h-4 w-5/6 rounded bg-gray-800" />
      <div className="mt-4 flex items-center justify-between">
        <div className="h-6 w-16 rounded-full bg-gray-800" />
        <div className="h-4 w-24 rounded bg-gray-800" />
      </div>
    </div>
  );
}
