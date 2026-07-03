import { Card } from "../ui";

export default function PreferencesCard() {
  return (
    <Card className="border-white/80 p-6 shadow-premium dark:border-slate-700">
      <h2 className="text-lg font-bold dark:text-white">Preferences</h2>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Configure your default application preferences.
      </p>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium dark:text-white">
          Default Translation Language
        </label>

        <select className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
          <option>English</option>
          <option>Hindi</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Arabic</option>
        </select>
      </div>
    </Card>
  );
}
