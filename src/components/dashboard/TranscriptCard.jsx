import { Copy, Radio } from "lucide-react";
import { Card } from "../ui";

const TranscriptCard = ({ transcript, copyToClipboard }) => {
  return (
    <Card className="animate-rise animation-delay-100 overflow-hidden border-white/80 shadow-premium dark:border-slate-700">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-700 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400">
            <Radio size={16} />
          </span>
          <div>
            <h2 className="text-sm font-bold dark:text-white">
              Live transcript
            </h2>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              English (United States)
            </p>
          </div>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400">
          <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />{" "}
          Live
        </span>
      </div>
      <div className="relative min-h-[175px] px-5 py-5 dark:text-slate-300 sm:px-6">
        <div className="max-h-36 overflow-y-auto pr-3 text-[14px] leading-7 text-slate-700 selection:bg-indigo-100 dark:text-slate-300 dark:selection:bg-indigo-900">
          <div>
            {transcript.trim() ? (
              transcript
            ) : (
              <p className="text-sm leading-6 text-slate-400 dark:text-slate-500">
                Start recording to begin live transcription. Your transcript
                will appear here.
              </p>
            )}
          </div>
        </div>
        <div className="absolute bottom-4 right-5 flex gap-2">
          <button
            aria-label="Copy transcript"
            className="icon-button"
            onClick={() => copyToClipboard(transcript, "Transcript")}
          >
            <Copy size={15} />
          </button>
          {/* <button
                    aria-label="Download transcript"
                    className="icon-button"
                  >
                    <Download size={15} />
                  </button> */}
        </div>
      </div>
    </Card>
  );
};

export default TranscriptCard;
