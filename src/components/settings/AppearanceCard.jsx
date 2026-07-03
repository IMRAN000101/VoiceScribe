import ThemeToggle from "../ThemeToggle";
import { Card } from "../ui";

export default function AppearanceCard() {
  return (
    <Card className="border-white/80 p-6 shadow-premium dark:border-slate-700">
      <h2 className="text-lg font-bold dark:text-white">Appearance</h2>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Personalize how VoiceScribe AI looks.
      </p>

      <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-700">
        <div>
          <p className="font-semibold dark:text-white">Theme</p>

          <p className="text-sm text-slate-500">
            Switch between light and dark mode.
          </p>
        </div>

        <ThemeToggle />
      </div>
    </Card>
  );
}
