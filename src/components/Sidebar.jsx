import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Mic2,
  History,
  UserRound,
  Settings,
  LogOut,
  PanelLeftClose,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Logo, Button } from "./ui";

const links = [
  ["Dashboard", LayoutDashboard, "/dashboard"],
  ["New Recording", Mic2, "/dashboard#record"],
  ["History", History, "/dashboard#history"],
  ["Profile", UserRound, "/dashboard#profile"],
  ["Settings", Settings, "/dashboard#settings"],
];

export default function Sidebar({ open, onClose }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col border-r border-slate-200/70 bg-white/95 px-4 py-5 shadow-2xl shadow-slate-200/30 backdrop-blur-xl transition-transform duration-300 dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-slate-950/50 lg:translate-x-0 lg:shadow-none ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex items-center justify-between px-2">
        <Logo />
        <button
          aria-label="Close sidebar"
          onClick={onClose}
          className="icon-button lg:hidden"
        >
          <PanelLeftClose size={18} />
        </button>
      </div>
      <nav className="mt-10">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400 dark:text-slate-500">
          Workspace
        </p>
        <div className="space-y-1">
          {links.map(([name, Icon, to], i) => (
            <NavLink
              key={name}
              to={to}
              onClick={onClose}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all duration-200 ${i === 0 ? "bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-600 shadow-sm ring-1 ring-indigo-100/60 dark:from-indigo-950/40 dark:to-violet-950/40 dark:text-indigo-400 dark:ring-indigo-900/60" : "text-slate-500 hover:translate-x-0.5 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"}`}
            >
              <Icon size={18} strokeWidth={i === 0 ? 2.2 : 1.8} />
              <span>{name}</span>
              {i === 0 && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-500" />
              )}
            </NavLink>
          ))}
        </div>
      </nav>
      <div className="mt-auto overflow-hidden rounded-2xl border border-indigo-100/80 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-4 shadow-sm dark:border-indigo-900/50 dark:from-indigo-950/30 dark:via-slate-800 dark:to-violet-950/30">
        <div className="flex items-center justify-between">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/50">
            <Sparkles size={15} />
          </span>
          <span className="rounded-full bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400">
            Pro
          </span>
        </div>
        <p className="mt-3 text-sm font-bold dark:text-white">Unlock your potential</p>
        <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
          Unlimited recordings and smarter AI insights.
        </p>
        <Button className="mt-4 w-full py-2.5 text-xs">
          Upgrade plan <ChevronRight size={14} />
        </Button>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-2 dark:border-slate-700 dark:bg-slate-800/50">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-[10px] font-bold text-white dark:bg-indigo-600">
            AK
          </span>
          <div>
            <p className="text-[11px] font-bold dark:text-white">Amaan Khan</p>
            <p className="text-[9px] text-slate-400 dark:text-slate-500">Free workspace</p>
          </div>
        </div>
        <button
          aria-label="Log out"
          className="p-2 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400"
        >
          <LogOut size={15} />
        </button>
      </div>
    </aside>
  );
}
