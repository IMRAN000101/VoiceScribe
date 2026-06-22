import { Link, NavLink } from "react-router-dom";
import { Logo, Button } from "./ui";
import ThemeToggle from "./ThemeToggle";
export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/85 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/85">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          <a href="#features" className="hover:text-brand dark:hover:text-indigo-400">
            Features
          </a>
          <a href="#history" className="hover:text-brand dark:hover:text-indigo-400">
            History
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NavLink to="/login">
            <Button variant="ghost">Log in</Button>
          </NavLink>
          <NavLink to="/signup">
            <Button>Get Started</Button>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
