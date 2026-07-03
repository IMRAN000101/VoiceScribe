import { LogOut } from "lucide-react";
import { Card, Button } from "../ui";

export default function AccountCard({ onLogout }) {
  return (
    <Card className="border-white/80 p-6 shadow-premium dark:border-slate-700">
      <h2 className="text-lg font-bold dark:text-white">
        Account
      </h2>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Sign out from your VoiceScribe AI workspace.
      </p>

      <Button
        variant="danger"
        className="mt-6"
        onClick={onLogout}
      >
        <LogOut size={16} />
        Logout
      </Button>
    </Card>
  );
}