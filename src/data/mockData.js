import { FileText, Sparkles, ListChecks, Languages,Brain,Smile } from "lucide-react";

export const tones = {
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
export const features = [
  {
    icon: FileText,
    title: "Speech to Text",
    text: "Accurate transcripts from meetings, lectures, and conversations.",
    tone: "indigo"
  },
  {
    icon: Sparkles,
    title: "AI Summaries",
    text: "Turn long conversations into crisp, useful summaries in seconds.",
    tone: "blue"
  },
  {
    icon: ListChecks,
    title: "Action Items",
    text: "Automatically surface decisions, owners, and the next steps.",
    tone: "emerald"
  },
  {
    icon: Languages,
    title: "Transcript History",
    text: "Organize, search, and revisit every important conversation.",
    tone: "violet"
  },
  {
    icon: Brain,
    title: "Emotion Analysis",
    text: "Detect core emotional states to deeply understand user reactions.",
    tone: "rose"
  },
  {
    icon: Smile,
    title: "Sentiment Analysis",
    text: "Track the positive, negative, or neutral vibe of any chat.",
    tone: "amber"
  },
];
