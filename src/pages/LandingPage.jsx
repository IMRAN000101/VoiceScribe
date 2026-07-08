import { ArrowRight, Play, CheckCircle2, Zap, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button, Card, Logo } from "../components/ui";
import { features } from "../data/mockData";
export default function LandingPage() {
  const tones = {
    indigo: {
      tile: "from-indigo-50 to-violet-50/70 border-indigo-100/80 dark:from-indigo-950/40 dark:to-violet-950/40 dark:border-indigo-900/60",
      icon: "bg-indigo-600 text-white shadow-indigo-200 dark:shadow-indigo-900/50",
      button:
        "text-indigo-600 group-hover:bg-indigo-600 dark:text-indigo-400 dark:group-hover:bg-indigo-600",
    },
    blue: {
      tile: "from-blue-50 to-cyan-50/60 border-blue-100/80 dark:from-blue-950/40 dark:to-cyan-950/40 dark:border-blue-900/60",
      icon: "bg-blue-600 text-white shadow-blue-200 dark:shadow-blue-900/50",
      button:
        "text-blue-600 group-hover:bg-blue-600 dark:text-blue-400 dark:group-hover:bg-blue-600",
    },
    emerald: {
      tile: "from-emerald-50 to-teal-50/60 border-emerald-100/80 dark:from-emerald-950/40 dark:to-teal-950/40 dark:border-emerald-900/60",
      icon: "bg-emerald-600 text-white shadow-emerald-200 dark:shadow-emerald-900/50",
      button:
        "text-emerald-600 group-hover:bg-emerald-600 dark:text-emerald-400 dark:group-hover:bg-emerald-600",
    },
    amber: {
      tile: "from-amber-50 to-orange-50/60 border-amber-100/80 dark:from-amber-950/40 dark:to-orange-950/40 dark:border-amber-900/60",
      icon: "bg-amber-500 text-white shadow-amber-200 dark:shadow-amber-900/50",
      button:
        "text-amber-600 group-hover:bg-amber-500 dark:text-amber-400 dark:group-hover:bg-amber-500",
    },
    rose: {
      tile: "from-rose-50 to-pink-50/60 border-rose-100/80 dark:from-rose-950/40 dark:to-pink-950/40 dark:border-rose-900/60",
      icon: "bg-rose-500 text-white shadow-rose-200 dark:shadow-rose-900/50",
      button:
        "text-rose-600 group-hover:bg-rose-500 dark:text-rose-400 dark:group-hover:bg-rose-500",
    },
    violet: {
      tile: "from-violet-50 to-purple-50/60 border-violet-100/80 dark:from-violet-950/40 dark:to-purple-950/40 dark:border-violet-900/60",
      icon: "bg-violet-600 text-white shadow-violet-200 dark:shadow-violet-900/50",
      button:
        "text-violet-600 group-hover:bg-violet-600 dark:text-violet-400 dark:group-hover:bg-violet-600",
    },
  };
  return (
    <div className="dark:bg-slate-950">
      <Navbar />
      <main>
        <section className="relative overflow-hidden px-5 pb-24 pt-20 text-center dark:bg-slate-950 lg:pb-32 lg:pt-28">
          <div className="grid-bg absolute inset-0 -z-20 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="absolute left-1/2 top-12 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-200/50 blur-3xl dark:bg-indigo-900/30" />
          <div className="mx-auto max-w-5xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-xs font-semibold text-brand shadow-sm dark:border-indigo-900 dark:bg-slate-800">
              <Zap size={14} /> Your AI meeting copilot
            </span>
            <h1 className="text-balance mt-7 text-5xl font-extrabold tracking-[-.045em] text-slate-950 dark:text-white md:text-7xl">
              Turn speech into{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-300">
                actionable insights
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-8 text-slate-600 dark:text-slate-300">
              Record meetings, lectures, and conversations. Convert speech into
              text and unlock AI-powered insights.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/dashboard">
                <Button className="w-full px-6 py-3.5 sm:w-auto">
                  Start Recording <ArrowRight size={17} />
                </Button>
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-5 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-500" />
                No credit card required
              </span>
              <span className="flex gap-1.5">
                <ShieldCheck size={15} className="text-emerald-500" />
                Secure by design
              </span>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="bg-slate-50 px-5 py-24 dark:bg-slate-900/50"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-brand">
                Everything you need
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight dark:text-white md:text-4xl">
                From conversation to clarity
              </h2>
              <p className="mt-4 text-slate-500 dark:text-slate-400">
                Spend less time taking notes and more time moving great work
                forward.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, text, tone }) => {
                const theme = tones[tone] || tones.indigo;
                return (
                  <Card
                    key={title}
                    className="group p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-brand group-hover:bg-brand group-hover:text-white dark:bg-indigo-950/40 dark:group-hover:bg-brand">
                      <Icon size={21} />
                    </div>
                    <h3 className="mt-5 font-bold dark:text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {text}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
        <section
          id="history"
          className="px-5 py-24 text-center dark:bg-slate-950"
        >
          <h2 className="text-3xl font-bold dark:text-white">
            Ready to remember everything?
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Start recording and organizing conversations in seconds.
          </p>
          <Link to="/signup">
            <Button className="mt-7 px-7 py-3.5">
              Get started <ArrowRight size={17} />
            </Button>
          </Link>
        </section>
      </main>
      <footer className="border-t border-slate-200 px-5 py-8 dark:border-slate-700 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <Logo />
          <p className="text-sm text-slate-400 dark:text-slate-500">
            © 2026 VoiceScribe AI. Built for better conversations.
          </p>
        </div>
      </footer>
    </div>
  );
}
