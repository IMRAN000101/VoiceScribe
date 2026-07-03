import { Copy } from "lucide-react";
import { Card } from "../ui";

export default function ResultCard({
  icon: Icon,
  title,
  label,
  color,
  children,
  isEmpty,
  emptyMessage,
  copyText,
  onCopy,
}) {
  const variants = {
    indigo:
      "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    emerald:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
    amber:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
    violet:
      "bg-violet-50 text-violer-600 dark:bg-violet-950/40 dark:text-violet-400",
  };

  return (
    <Card className="group animate-rise border-white/80 p-5 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-hover dark:border-slate-700 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`grid h-9 w-9 place-items-center rounded-xl ${variants[color]}`}
          >
            <Icon size={18} />
          </span>

          <div>
            <h2 className="text-sm font-bold dark:text-white">{title}</h2>

            <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
              {label}
            </p>
          </div>
        </div>

        <button className="icon-button" onClick={() => onCopy(copyText, title)}>
          <Copy size={14} />
        </button>
      </div>

      <div className="mt-5 min-h-[140px]">
        {isEmpty ? (
          <div className="flex min-h-[140px] items-center justify-center rounded-xl bg-slate-50/40 px-5 text-center dark:bg-slate-800/20">
            <p className="text-sm leading-6 text-slate-400 dark:text-slate-500">
              {emptyMessage}
            </p>
          </div>
        ) : (
          <div className="text-[13px] leading-6 text-slate-600 dark:text-slate-400">
            {children}
          </div>
        )}
      </div>
    </Card>
  );
}
