import { Trash2 } from "lucide-react";
import { Button } from "../ui";

export default function DeleteModal({
  showDeleteModal,
  setShowDeleteModal,
  setRecordingToDelete,
  confirmDelete,
}) {
  if (!showDeleteModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <Trash2 size={24} className="text-red-500" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              Delete Recording?
            </h2>
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-slate-400">
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

          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}