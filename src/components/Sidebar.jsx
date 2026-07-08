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
import LogoutModal from "./profile/LogoutModal";
import { Logo, Button } from "./ui";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const links = [
  ["Dashboard", LayoutDashboard, "/dashboard"],
  ["New Recording", Mic2, "/record"],
  ["History", History, "/history"],
  ["Profile", UserRound, "/profile"],
  ["Settings", Settings, "/settings"],
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  function handleLogout() {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  }
  return (
    <>
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
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all duration-200 ${isActive ? "bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-600 shadow-sm ring-1 ring-indigo-100/60 dark:from-indigo-950/40 dark:to-violet-950/40 dark:text-indigo-400 dark:ring-indigo-900/60" : "text-slate-500 hover:translate-x-0.5 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"}`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                    <span>{name}</span>
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
        <div className="mt-auto flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-2 dark:border-slate-700 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-[10px] font-bold text-white dark:bg-indigo-600">
              {user?.name
                ?.split(" ")
                .map((word) => word[0])
                .join("")}
            </span>
            <div>
              <p className="text-[11px] font-bold dark:text-white">
                {user?.name}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowLogoutModal(true)}
            aria-label="Log out"
            className="p-2 text-slate-400 transition-colors duration-200 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400"
          >
            <LogOut size={15} />
          </button>
        </div>
      </aside>
      <LogoutModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
