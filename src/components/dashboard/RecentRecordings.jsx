import { ChevronRight, Mic2, Play, Search } from "lucide-react";
import { Button, Card } from "../ui";
import { useNavigate } from "react-router-dom";

const RecentRecordings = ({
  recordings,
  filteredAndSortedRecordings,
  editingId,
  editedTitle,
  setEditingId,
  setEditedTitle,
  handleUpdatedTitle,
  handleOpenRecording,
  setRecordingToDelete,
  setShowDeleteModal,
  showViewAll = true,
  readOnly=false,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      id="history"
      className="animate-rise overflow-hidden border-white/80 shadow-premium dark:border-slate-700"
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 dark:border-slate-700 sm:px-6">
        <div>
          <h2 className="font-bold tracking-tight dark:text-white">
            Recent recordings
          </h2>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Your latest captured conversations
          </p>
        </div>
        {showViewAll && (
          <button
            onClick={() => navigate("/history")}
            className="group flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400"
          >
            View all{" "}
            <ChevronRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        )}
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {recordings.length === 0 ? (
          <div className="py-16 text-center">
            <Mic2 size={42} className="mx-auto text-slate-400" />

            <p className="mt-4 text-lg font-semibold">No recordings yet</p>

            <p className="text-sm text-slate-500">
              Record your first meeting to see it here.
            </p>
          </div>
        ) : filteredAndSortedRecordings.length === 0 ? (
          <div className="py-16 text-center">
            <Search size={42} className="mx-auto text-slate-400" />

            <p className="mt-4 text-lg font-semibold">No matching recordings</p>

            <p className="text-sm text-slate-500">
              Try searching with a different keyword.
            </p>
          </div>
        ) : (
          filteredAndSortedRecordings.map((recording) => (
            <div
              key={recording._id}
              className="group grid items-center gap-3 px-5 py-4 transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/50 sm:grid-cols-[2fr_1fr_auto] sm:px-6"
            >
              <div
                onClick={() => handleOpenRecording(recording._id)}
                className="flex min-w-0 items-center gap-3.5 cursor-pointer"
              >
                <button
                  aria-label={`Play ${recording.title}`}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600 transition-all group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-md dark:bg-indigo-950/40 dark:text-indigo-400 dark:group-hover:bg-indigo-600"
                >
                  <Play size={13} fill="currentColor" />
                </button>

                <div className="min-w-0">
                  {editingId === recording._id ? (
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        autoFocus
                        className="w-full rounded-lg border flex-1 border-slate-300 bg-transparent px-3 py-1 text-sm outline-none focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-800"
                      />
                    </div>
                  ) : (
                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                      {recording.title}
                    </p>
                  )}

                  <p className="mt-0.5 text-[11px] text-slate-400 dark:text-slate-500 sm:hidden">
                    {new Date(recording.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <span className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
                {new Date(recording.createdAt).toLocaleDateString()}
              </span>

              {!readOnly && (
                <div className="ml-auto flex items-center gap-2">
                  {editingId === recording._id ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleUpdatedTitle(recording._id)}
                      >
                        Save
                      </Button>

                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setEditingId(null);
                          setEditedTitle("");
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(recording._id);
                          setEditedTitle(recording.title);
                        }}
                        className="rounded-md px-3 py-1 text-sm font-medium text-indigo-400 hover:bg-indigo-500/10 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setRecordingToDelete(recording._id);
                          setShowDeleteModal(true);
                        }}
                        className="rounded-md px-3 py-1 text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default RecentRecordings;
