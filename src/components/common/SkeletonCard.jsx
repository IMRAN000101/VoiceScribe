export default function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800 
        ${className}`}
    >
      <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mt-4 h-3 w-full rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mt-2 h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mt-2 h-3 w-4/6 rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}
