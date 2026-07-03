import { Card } from "../ui";
import { Bell, Download, Brain, Save } from "lucide-react";

const items = [
  { icon: Bell, title: "Notifications" },
  { icon: Download, title: "Export Options" },
  { icon: Brain, title: "AI Model Selection" },
  { icon: Save, title: "Auto Save" },
];

export default function ComingSoonCard() {
  return (
    <Card className="border-white/80 p-6 shadow-premium dark:border-slate-700">
      <h2 className="text-lg font-bold dark:text-white">Coming Soon</h2>

      <div className="mt-6 space-y-4">
        {items.map(({ icon: Icon, title }) => (
          <div
            key={title}
            className="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-700"
          >
            <div className="flex items-center gap-3">
              <Icon size={18} className="text-indigo-500" />
              <span className="font-medium dark:text-white">{title}</span>
            </div>

            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
              Soon
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
