import { Button } from "../ui";
import { Mic2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmptyState({
  title = "Nothing here yet",
  description = "Create your first item to get started.",
  buttonText = "Get Started",
  buttonLink = "/record",
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
      <div className="grid h-20 w-20 place-items-center rounded-full bg-indigo-100 dark:bg-indigo-950/40">
        <Mic2 className="text-indigo-600 dark:text-indigo-400" size={36} />
      </div>

      <h2 className="mt-6 text-2xl font-bold dark:text-white">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-slate-500 dark:text-slate-400">
        {description}
      </p>

      <Button
        className="mt-8"
        onClick={() => navigate(buttonLink)}
      >
        {buttonText}
      </Button>
    </div>
  );
}