import { Mic2, Square } from "lucide-react";
import { Button, Card } from "../ui";

const RecordingCard = ({
  isRecording,
  stopRecording,
  startRecording,
  audioURL,
}) => {
  const waveHeights = [
  10, 18, 31, 21, 42, 28, 16, 35, 46, 25, 16, 39, 30, 14, 24, 38, 19, 29, 12,
  24, 37, 19, 32, 15, 25,
];

  return (
    <Card
      id="record"
      className="animate-rise overflow-hidden border-white/80 bg-gradient-to-b from-white to-indigo-50/40 p-6 text-center shadow-premium dark:border-slate-700 dark:from-slate-800 dark:to-indigo-950/20 sm:p-7"
    >
      <div className="flex items-center justify-between text-left">
        <div>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
            QUICK CAPTURE
          </p>
          <h2 className="mt-1 font-bold tracking-tight dark:text-white">
            Record conversation
          </h2>
        </div>
        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-400">
          Ready
        </span>
      </div>
      <div className="relative mx-auto mt-7 grid h-28 w-28 place-items-center rounded-full bg-indigo-100/70 ring-8 ring-indigo-50 dark:bg-indigo-950/40 dark:ring-indigo-900/30">
        <span className="absolute inset-0 animate-pulse-soft rounded-full border border-indigo-300/50 dark:border-indigo-600/40" />
        <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 text-white shadow-[0_18px_35px_rgba(79,70,229,.32)] dark:shadow-[0_18px_35px_rgba(79,70,229,.15)]">
          <Mic2 size={34} strokeWidth={1.8} />
        </div>
      </div>
      <p className="mt-6 text-[13px] font-medium text-slate-500 dark:text-slate-400">
        Press start when you're ready
      </p>
      <p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
        00:00:00
      </p>
      <div className="mt-6 flex justify-center">
        <Button
          variant={isRecording ? "danger" : "default"}
          className={`py-3 px-8 font-semibold shadow-md transition-all duration-300 ${
            isRecording
              ? "border-red-400 bg-red-500 text-white shadow-red-200 hover:bg-red-600"
              : "border-indigo-200 bg-white text-indigo-700 hover:border-indigo-400 hover:bg-indigo-50 dark:border-indigo-800 dark:bg-slate-800 dark:text-indigo-400 dark:hover:bg-slate-700"
          }`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? (
            <>
              <Square size={13} fill="currentColor" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic2 size={16} />
              Start Recording
            </>
          )}
        </Button>
      </div>
      {
        /* isRecording && */ <div className="mt-5 flex h-14 items-center justify-center gap-[3px] overflow-hidden rounded-xl border border-indigo-100/60 bg-white/70 px-3 dark:border-indigo-900/40 dark:bg-slate-800/50">
          {waveHeights.map((h, i) => (
            <span
              key={i}
              className="wave-bar w-[3px] shrink-0 rounded-full bg-gradient-to-t from-indigo-600 to-violet-400"
              style={{ height: h, animationDelay: `${i * 45}ms` }}
            />
          ))}
        </div>
      }
      {audioURL && <audio controls src={audioURL} className="mt-4 w-full" />}
    </Card>
  );
};

export default RecordingCard;
