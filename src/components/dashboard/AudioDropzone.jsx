import { useState, useRef } from "react";
import { UploadCloud, FileAudio } from "lucide-react";
import toast from "react-hot-toast";
const MAX_SIZE = 25 * 1024 * 1024;

export default function AudioDropzone({ onFileSelect, loading = false }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");

  function validateFile(file) {
    if (!file) return false;
    const allowed = [
      "audio/mpeg",
      "audio/mp3",
      "audio/wav",
      "audio/x-wav",
      "audio/webm",
      "audio/mp4",
      "audio/mp4a",
      "audio/x-mp4a",
    ];
    if (!allowed.includes(file.type)) {
      toast.error("Please upload a valid audio file.");
      return false;
    }
    if (file.size > MAX_SIZE) {
      toast.error("Audio must be smaller than 25MB");
      return false;
    }
    return true;
  }
  function handleFile(file) {
    if (!validateFile(file)) return;

    setFileName(file.name);
    onFileSelect(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  }
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept=".mp3,.wav,.m4a,.webm,audio/*"
        onChange={(e) => handleFile(e.target.files[0])}
      />
      <button
        type="button"
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`
          mt-5
          w-full
          rounded-2xl
          border-2
          border-dashed
          p-5
          transition-all
          duration-300
          text-center

          ${
            dragActive
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 scale-[1.02]"
              : "border-slate-300 dark:border-slate-700 hover:border-indigo-400"
          }
        `}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full bg-indigo-100 p-3 dark:bg-indigo-950/40">
            <UploadCloud
              className="text-indigo-600 dark:text-indigo-400"
              size={24}
            />
          </div>

          <div>
            <p className="font-semibold dark:text-white">
              Drag & Drop audio here
            </p>

            <p className="mt-1 text-sm text-slate-500">or click to upload</p>

            <p className="mt-1 text-xs text-slate-400">
              MP3 • WAV • M4A • WEBM
            </p>
          </div>

          {fileName && (
            <div className="mt-2 flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-800">
              <FileAudio size={16} className="text-indigo-500" />

              <span className="text-sm truncate max-w-[220px]">{fileName}</span>
            </div>
          )}

          {loading && (
            <p className="text-sm text-indigo-500 font-medium">
              Transcribing...
            </p>
          )}
        </div>
      </button>
    </>
  );
}
