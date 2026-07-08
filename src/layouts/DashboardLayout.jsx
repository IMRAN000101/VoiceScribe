import { useState } from "react";
import { Menu, Search, Bell, ChevronDown, Command } from "lucide-react";
import Sidebar from "../components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout({
  children,
  searchTerm = "",
  setSearchTerm,
}) {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f6f7fb] dark:bg-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_75%_0%,rgba(99,102,241,.07),transparent_30%),radial-gradient(circle_at_15%_80%,rgba(139,92,246,.04),transparent_30%)] dark:bg-[radial-gradient(circle_at_75%_0%,rgba(99,102,241,.15),transparent_30%),radial-gradient(circle_at_15%_80%,rgba(139,92,246,.1),transparent_30%)]" />
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {open && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm dark:bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <main className="relative lg:pl-[272px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-white/80 bg-white/75 px-4 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/75 sm:px-6 xl:px-8">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open sidebar"
              onClick={() => setOpen(true)}
              className="icon-button lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div>
              <p className="text-base font-bold tracking-[-.02em] text-slate-950 dark:text-white sm:text-lg">
                Welcome back, {user?.name}{" "}
                <span className="inline-block origin-bottom-right animate-wave">
                  👋
                </span>
              </p>
              <p className="hidden text-[11px] font-medium text-slate-400 dark:text-slate-500 sm:block">
                {`${new Date().getDate()} ${new Date().toLocaleString("en-GB", { month: "long" }).toLowerCase()} ${new Date().getFullYear()}`}{" "}
                Your ideas are ready to flow
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {setSearchTerm && (
              <label className=" h-10 items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3 shadow-sm transition focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-indigo-600 dark:focus-within:ring-indigo-950 flex">
                <Search
                  size={16}
                  className="text-slate-400 dark:text-slate-500"
                />
                <input
                  className="w-40 bg-transparent text-xs outline-none dark:text-white dark:placeholder-slate-500 xl:w-52"
                  placeholder="Search recordings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="flex items-center gap-0.5 rounded-md border border-slate-200 bg-slate-50 px-1.5 py-1 text-[9px] font-semibold text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500">
                  <Command size={9} />K
                </span>
              </label>
            )}
            <button aria-label="Notifications" className="icon-button relative">
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-900" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 rounded-xl p-1.5 pr-2 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/30">
                {user?.name
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")}
              </span>
              <span className="hidden text-left xl:block">
                <b className="block text-xs dark:text-white">{user?.name}</b>
              </span>
              <ChevronDown
                size={13}
                className="hidden text-slate-400 dark:text-slate-500 xl:block"
              />
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
