import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="group relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-slate-200/80 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md dark:border-slate-700/80 dark:bg-slate-900 dark:text-amber-300 dark:hover:border-slate-600 dark:hover:shadow-indigo-950/30"
    >
      <span className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-slate-800 dark:via-slate-900 dark:to-indigo-950" />
      <Sun
        size={18}
        className={`relative transition-all duration-300 ${
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        }`}
      />
      <Moon
        size={18}
        className={`absolute transition-all duration-300 ${
          isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
    </button>
  );
}
