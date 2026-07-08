import { Mic2, Square } from "lucide-react";
import { Card } from "../ui";
import AudioDropzone from "./AudioDropzone";

const RecordingCard = ({
  isRecording,
  stopRecording,
  startRecording,
  audioURL,
  recordingTime,
  uploadLoading,
  onFileSelect,
}) => {
  const waveHeights = [
    10, 18, 31, 21, 42, 28, 16, 35, 46, 25, 16, 39, 30, 14, 24, 38, 19, 29, 12,
    24, 37, 19, 32, 15, 25,
  ];
  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  };

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
          {isRecording ? "Recording..." : "Ready"}
        </span>
      </div>
      <div className="relative mx-auto mt-7 grid h-28 w-28 place-items-center rounded-full bg-indigo-100/70 ring-8 ring-indigo-50 dark:bg-indigo-950/40 dark:ring-indigo-900/30">
        {isRecording && (
          <span className="absolute inset-0 animate-pulse-soft rounded-full border border-indigo-300/50 dark:border-indigo-600/40" />
        )}
        <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 text-white shadow-[0_18px_35px_rgba(79,70,229,.32)] dark:shadow-[0_18px_35px_rgba(79,70,229,.15)]">
          <Mic2 size={34} strokeWidth={1.8} />
        </div>
      </div>
      <p className="mt-6 text-[13px] font-medium text-slate-500 dark:text-slate-400">
        {isRecording
          ? "Recording in progress..."
          : "Press start when you are ready"}
      </p>
      <p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
        {formatTime(recordingTime)}
      </p>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          aria-label={isRecording ? "Stop recording" : "Start recording"}
          aria-pressed={isRecording}
          onClick={isRecording ? stopRecording : startRecording}
          className={`
      group
      inline-flex
      h-12
      min-w-[210px]
      items-center
      justify-center
      gap-3
      rounded-2xl
      px-6
      text-sm
      font-semibold
      transition-all
      duration-300
      focus-visible:outline-none
      ${
        isRecording
          ? "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/30"
          : "border border-slate-200 bg-white text-slate-900 shadow-md hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:border-indigo-500"
      }
    `}
        >
          {isRecording ? (
            <>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                <Square size={11} fill="currentColor" />
              </span>

              <span>Stop Recording</span>
            </>
          ) : (
            <>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300">
                <Mic2 size={15} />
              </span>

              <span>Start Recording</span>
            </>
          )}
        </button>
      </div>
      {
        /* isRecording && */
        <div className="mt-5 flex h-14 items-center justify-center gap-[3px] overflow-hidden rounded-xl border border-indigo-100/60 bg-white/70 px-3 dark:border-indigo-900/40 dark:bg-slate-800/50 mb-9">
          {waveHeights.map((h, i) => (
            <span
              key={i}
              className="wave-bar 
              w-[3px] shrink-0 rounded-full 
              bg-gradient-to-t from-indigo-600 to-violet-400"
              style={{ height: h, animationDelay: `${i * 45}ms ` }}
            />
          ))}
        </div>
      }
      <AudioDropzone onFileSelect={onFileSelect} loading={uploadLoading} />
      {audioURL && <audio controls src={audioURL} className="mt-4 w-full" />}
    </Card>
  );
};

export default RecordingCard;
