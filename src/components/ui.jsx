import { Mic2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Logo({ light = false }) {
  const navigate = useNavigate();
  return (
    <div className="animate-fadeIn">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="flex items-center gap-2.5 font-bold text-lg hover:cursor-pointer"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-200/40 dark:shadow-indigo-900/20">
          <Mic2 size={19} />
        </span>

        <span
          className={light ? "text-white" : "text-slate-900 dark:text-white"}
        >
          VoiceScribe <b className="text-brand">AI</b>
        </span>
      </div>
    </div>
  );
}
export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary:
      "bg-brand text-white shadow-md shadow-indigo-200/40 hover:bg-indigo-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-300/30 dark:shadow-indigo-900/20 dark:hover:shadow-indigo-900/40",
    secondary:
      "bg-white text-slate-800 border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:border-indigo-600 dark:hover:bg-slate-700",
    ghost:
      "text-slate-600 hover:text-brand hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-slate-800",
    danger:
      "bg-white border border-red-200 text-red-600 hover:bg-red-50 dark:bg-red-950/20 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40",
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-slate-700 dark:bg-slate-800 ${className}`}
    >
      {children}
    </div>
  );
}
