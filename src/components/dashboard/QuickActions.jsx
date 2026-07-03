import { Mic2, History, ArrowRight } from "lucide-react";
import { Card, Button } from "../ui";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card className="border-white/80 p-6 shadow-premium dark:border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold dark:text-white">
            Quick Actions
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Jump directly to your most-used workspaces.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Button
          onClick={() => navigate("/record")}
          className="justify-between py-4"
        >
          <span className="flex items-center gap-2">
            <Mic2 size={18} />
            New Recording
          </span>
          <ArrowRight size={16} />
        </Button>

        <Button
          variant="secondary"
          onClick={() => navigate("/history")}
          className="justify-between py-4"
        >
          <span className="flex items-center gap-2">
            <History size={18} />
            View History
          </span>
          <ArrowRight size={16} />
        </Button>
      </div>
    </Card>
  );
}