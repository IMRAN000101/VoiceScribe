import { FileAudio, Sparkles, ListChecks } from "lucide-react";
import { Card } from "../ui";

const stats = [
  {
    title: "Total Recordings",
    key: "recordings",
    icon: FileAudio,
    color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 dark:text-indigo-400",
  },
  {
    title: "AI Summaries",
    key: "summaries",
    icon: Sparkles,
    color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400",
  },
  {
    title: "Action Items",
    key: "actions",
    icon: ListChecks,
    color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400",
  },
];

export default function DashboardStats({ statsData }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {stats.map(({ title, key, icon: Icon, color }) => (
        <Card
          key={key}
          className="border-white/80 p-6 shadow-premium dark:border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {title}
              </p>

              <h2 className="mt-2 text-3xl font-bold dark:text-white">
                {statsData[key]}
              </h2>
            </div>

            <span className={`grid h-12 w-12 place-items-center rounded-xl ${color}`}>
              <Icon size={22} />
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}