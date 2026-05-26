export default function SkeletonCard() {
  return (
    <article className="glass rounded-xl p-4 border border-border">
      <div className="flex justify-between items-start min-h-6">
        <div className="shimmer w-16 h-4 rounded-full" />
      </div>

      <div className="shimmer w-3/4 h-4 rounded-lg mt-3" />
      <div className="shimmer w-1/2 h-4 rounded-lg mt-2" />
      
      <div className="shimmer w-full h-3 rounded-lg mt-4" />
      <div className="shimmer w-4/5 h-3 rounded-lg mt-2" />
      
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="shimmer w-24 h-3 rounded-lg" />
        <div className="shimmer w-12 h-3 rounded-full" />
      </div>
    </article>
  );
}
