import { Lock } from "lucide-react";
import { Card, Button } from "../ui";

export default function SecurityCard({onchangePassword}) {
  return (
    <Card className="border-white/80 p-6 shadow-premium dark:border-slate-700">
      <h2 className="text-lg font-bold dark:text-white">
        Security
      </h2>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Change your password to keep your account secure.
      </p>

      <Button onClick={onchangePassword} className="mt-6" >
        <Lock size={16} />
        Change Password
      </Button>
    </Card>
  );
}