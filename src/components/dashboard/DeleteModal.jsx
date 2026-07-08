import { Trash2 } from "lucide-react";
import { Button } from "../ui";
import { createPortal } from "react-dom";

export default function DeleteModal({
  showDeleteModal,
  setShowDeleteModal,
  setRecordingToDelete,
  confirmDelete,
}) {
  if (!showDeleteModal) return null;

  return createPortal(
    <div className="fixed inset-0 z-[50] flex items-center justify-center bg-slate-900/60 backdrop-blur-md">
      <div
        className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 
      shadow-[0_20px_60px_rgba(15,23,42,.18)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/50"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-500/10">
            <Trash2 size={24} className="text-red-500" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Delete Recording?
            </h2>
          </div>
        </div>

        <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">
          Are you sure you want to permanently delete this recording? This
          action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              setShowDeleteModal(false);
              setRecordingToDelete(null);
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={confirmDelete}
            className="bg-red-600 text-white shadow-sm hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>, 
    document.body
  );
}
