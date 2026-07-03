import DashboardLayout from "../layouts/DashboardLayout";
import AppearanceCard from "../components/settings/AppearanceCard";
import PreferencesCard from "../components/settings/PreferenceCard";
import ComingSoonCard from "../components/settings/ComingSoonCard";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1480px] space-y-7 p-4 pb-10 sm:p-6 xl:p-8">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">
            Settings
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Customize your VoiceScribe AI experience and preferences.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <AppearanceCard />
          <PreferencesCard />
        </div>

        <ComingSoonCard />
      </div>
    </DashboardLayout>
  );
}