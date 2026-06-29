export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-500"></div>

        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Loading...
        </p>
      </div>
    </div>
  );
}