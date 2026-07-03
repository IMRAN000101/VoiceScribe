import { LogOut } from "lucide-react";
import { Button } from "../ui";

export default function LogoutModal({
  open,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <LogOut size={24} className="text-red-500" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              Logout?
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              You'll need to log in again to access your workspace.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="danger" onClick={onConfirm}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}