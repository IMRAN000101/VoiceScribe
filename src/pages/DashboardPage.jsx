import { getProfile } from "../api/userApi";
import {
  Mic2,
  Square,
  Copy,
  Download,
  ArrowUpRight,
  Play,
  Clock3,
  Languages,
  Sparkles,
  ListChecks,
  Menu as ListIcon,
  MoreHorizontal,
  ChevronRight,
  Check,
  WandSparkles,
  Radio,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Button, Card } from "../components/ui";
import { actions, recordings } from "../data/mockData";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const waveHeights = [
  10, 18, 31, 21, 42, 28, 16, 35, 46, 25, 16, 39, 30, 14, 24, 38, 19, 29, 12,
  24, 37, 19, 32, 15, 25,
];
const tones = {
  indigo: {
    tile: "from-indigo-50 to-violet-50/70 border-indigo-100/80 dark:from-indigo-950/40 dark:to-violet-950/40 dark:border-indigo-900/60",
    icon: "bg-indigo-600 text-white shadow-indigo-200 dark:shadow-indigo-900/50",
    button:
      "text-indigo-600 group-hover:bg-indigo-600 dark:text-indigo-400 dark:group-hover:bg-indigo-600",
  },
  blue: {
    tile: "from-blue-50 to-cyan-50/60 border-blue-100/80 dark:from-blue-950/40 dark:to-cyan-950/40 dark:border-blue-900/60",
    icon: "bg-blue-600 text-white shadow-blue-200 dark:shadow-blue-900/50",
    button:
      "text-blue-600 group-hover:bg-blue-600 dark:text-blue-400 dark:group-hover:bg-blue-600",
  },
  emerald: {
    tile: "from-emerald-50 to-teal-50/60 border-emerald-100/80 dark:from-emerald-950/40 dark:to-teal-950/40 dark:border-emerald-900/60",
    icon: "bg-emerald-600 text-white shadow-emerald-200 dark:shadow-emerald-900/50",
    button:
      "text-emerald-600 group-hover:bg-emerald-600 dark:text-emerald-400 dark:group-hover:bg-emerald-600",
  },
  amber: {
    tile: "from-amber-50 to-orange-50/60 border-amber-100/80 dark:from-amber-950/40 dark:to-orange-950/40 dark:border-amber-900/60",
    icon: "bg-amber-500 text-white shadow-amber-200 dark:shadow-amber-900/50",
    button:
      "text-amber-600 group-hover:bg-amber-500 dark:text-amber-400 dark:group-hover:bg-amber-500",
  },
};

const SectionTitle = ({ eyebrow, title, description }) => (
  <div>
    <p className="text-[11px] font-bold uppercase tracking-[.16em] text-indigo-500 dark:text-indigo-400">
      {eyebrow}
    </p>
    <h2 className="mt-1 text-lg font-bold tracking-[-.02em] text-slate-950 dark:text-white">
      {title}
    </h2>
    {description && (
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
    )}
  </div>
);

export default function DashboardPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [actionItems, setActionItems] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const { user } = useAuth();
  console.log(user);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => {
        console.log("Chunk Recieved");
        audioChunksRef.current.push(event.data);
      };
      mediaRecorder.start();
      console.log("🎤 Recording Started");
      setIsRecording(true);
    } catch (error) {
      console.log("Microphone access denied:", error);
    }
  }

  async function stopRecording() {
    const mediaRecorder = mediaRecorderRef.current;
    if (!mediaRecorder) return;
    mediaRecorder.stop();
    mediaRecorder.onstop = async () => {
      console.log("🛑 Recording stopped");
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
      console.log("Audio Blob:", audioBlob);

      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
      try {
        const response = await fetch("http://localhost:5000/api/transcribe", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log("Backend Response:", data);
        setTranscript(data.transcript);
      } catch (error) {
        console.log("Update failed", error);
      }
    };
    setIsRecording(false);
  }

  async function generateSummary() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });
      const data = await response.json();
      console.log(data);
      setSummary(data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  async function generateKeyPoints() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/ai/keypoints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });
      const data = await response.json();
      console.log(data);
      setKeyPoints(data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  async function generateActionItems() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/ai/actionitems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });
      const data = await response.json();
      console.log(data);
      setActionItems(data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  async function translateTranscript() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/ai/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript, targetLanguage: language }),
      });
      const data = await response.json();
      console.log(data);
      setTranslatedText(data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1480px] space-y-7 p-4 pb-10 sm:p-6 sm:pb-12 xl:p-8">
        <div className="animate-rise flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <SectionTitle
            eyebrow="Your workspace"
            title="Conversation intelligence"
            description="Capture, transcribe, and turn every conversation into momentum."
          />
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,.12)]" />
            All systems operational
          </div>
        </div>

        <section className="grid gap-6 xl:grid-cols-[.82fr_1.55fr]">
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
                className={`py-3 px-8 transition-all duration-300 font-semibold shadow-md"
                ${
                  isRecording
                    ? "border-red-400 bg-red-500 hover:bg-red-600 text-white shadow-red-200"
                    : "border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50 hover:border-indigo-400 dark:bg-slate-800 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-slate-700"
                }
    `}
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
              /*isRecording && */ <div className="mt-5 flex h-14 items-center justify-center gap-[3px] overflow-hidden rounded-xl border border-indigo-100/60 bg-white/70 px-3 dark:border-indigo-900/40 dark:bg-slate-800/50">
                {waveHeights.map((h, i) => (
                  <span
                    key={i}
                    className="wave-bar w-[3px] shrink-0 rounded-full bg-gradient-to-t from-indigo-600 to-violet-400"
                    style={{ height: h, animationDelay: `${i * 45}ms` }}
                  />
                ))}
              </div>
            }
            {audioURL && (
              <audio controls src={audioURL} className="mt-4 w-full" />
            )}
          </Card>

          <div className="space-y-6">
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
                  <div>{transcript}</div>
                </div>
                <div className="absolute bottom-4 right-5 flex gap-2">
                  <button aria-label="Copy transcript" className="icon-button">
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

            <Card className="animate-rise animation-delay-200 border-white/80 p-5 shadow-premium dark:border-slate-700 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold tracking-tight dark:text-white">
                    AI Actions
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                    Transform this transcript instantly
                  </p>
                </div>
                <WandSparkles
                  size={19}
                  className="text-indigo-500 dark:text-indigo-400"
                />
              </div>
              {/* /*Drop down to select translated language  */}
              <div className="mt-4 mb-4">
                <select
                  value={language}
                  aria-placeholder="Select Language"
                  onChange={(e) => setLanguage(e.target.value)}
                  className="rounded-lg min-w-[180px] mb-5 border px-3 py-2 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
                >
                  <option value="">Select Language</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Arabic">Arabic</option>
                </select>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {actions.map(({ icon: Icon, title, text, tone }) => {
                  const t = tones[tone];
                  return (
                    <button
                      key={title}
                      disabled={title === "Translate" && !language}
                      onClick={() => {
                        if (title === "Generate Summary") {
                          generateSummary();
                        }
                        if (title === "Extract Key Points") {
                          generateKeyPoints();
                        }
                        if (title === "Extract Tasks") {
                          generateActionItems();
                        }
                        if (title === "Translate") {
                          translateTranscript();
                        }
                      }}
                      className={`group min-h-40 rounded-2xl border bg-gradient-to-br p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:text-white ${t.tile}`}
                    >
                      <span
                        className={`grid h-9 w-9 place-items-center rounded-xl shadow-lg ${t.icon}`}
                      >
                        <Icon size={17} />
                      </span>
                      <h3 className="mt-4 text-[13px] font-bold text-slate-900 dark:text-white">
                        {title}
                      </h3>
                      <p className="mt-1 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
                        {text}
                      </p>
                      <span
                        className={`mt-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm transition-all group-hover:text-white dark:bg-slate-700 ${t.button}`}
                      >
                        <ArrowUpRight size={13} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-4">
          <Result
            icon={Sparkles}
            title="AI Summary"
            label="Generated By AI"
            color="indigo"
          >
            <ul className="space-y-3">
              {summary
                .split("*")
                .filter((item) => item.trim())
                .map((item, index) => (
                  <li key={index} className="flex gap-2 text-sm leading-7">
                    <span className="mt-2 h-2 w-2 rounded-full bg-indigo-500"></span>
                    <span>{item.trim()}</span>
                  </li>
                ))}
            </ul>
          </Result>
          <Result
            icon={ListIcon}
            title="Key Points"
            label="Generated By AI"
            color="blue"
          >
            <ul className="space-y-3">
              {keyPoints
                .split("*")
                .filter((item) => item.trim())
                .map((item, index) => (
                  <li key={index} className="flex gap-2 text-sm leading-7">
                    <Check size={15} className="mt-1 text-blue-500 shrink-0" />
                    <span>{item.trim()}</span>
                  </li>
                ))}
            </ul>
          </Result>
          <Result
            icon={ListChecks}
            title="Action Items"
            label="Generated By AI"
            color="emerald"
          >
            <ul className="space-y-3">
              {actionItems
                .split("*")
                .filter((item) => item.trim())
                .map((item, index) => (
                  <li key={index} className="flex gap-3 text-sm leading-7">
                    <input type="checkbox" className="mt-1" />
                    <span>{item.replace("[ ]", "").trim()}</span>
                  </li>
                ))}
            </ul>
          </Result>
          <Result
            icon={Languages}
            title="Translate"
            label="Generated By AI"
            color="amber"
          >
            <ul className="space-y-3">
              {translatedText
                .split("*")
                .filter((item) => item.trim())
                .map((item, index) => (
                  <li key={index} className="flex gap-3 text-sm leading-7">
                    <span>{item.replace("[ ]", "").trim()}</span>
                  </li>
                ))}
            </ul>
          </Result>
        </section>

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
            <button className="group flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              View all{" "}
              <ChevronRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {recordings.map(([title, date, duration], i) => (
              <div
                key={title}
                className="group grid items-center gap-3 px-5 py-4 transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/50 sm:grid-cols-[1.5fr_1fr_.5fr_auto] sm:px-6"
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <button
                    aria-label={`Play ${title}`}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600 transition-all group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-md dark:bg-indigo-950/40 dark:text-indigo-400 dark:group-hover:bg-indigo-600"
                  >
                    <Play size={13} fill="currentColor" />
                  </button>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                      {title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400 dark:text-slate-500 sm:hidden">
                      {date} · {duration}
                    </p>
                  </div>
                </div>
                <span className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
                  {date}
                </span>
                <span className="hidden items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 sm:flex">
                  <Clock3 size={13} />
                  {duration}
                </span>
                <button
                  aria-label={`More options for ${title}`}
                  className="icon-button ml-auto"
                >
                  <MoreHorizontal size={16} />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function Result({ icon: Icon, title, label, color, children }) {
  const variants = {
    indigo:
      "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    emerald:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
    amber:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  };
  return (
    <Card className="group animate-rise border-white/80 p-5 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-hover dark:border-slate-700 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`grid h-9 w-9 place-items-center rounded-xl ${variants[color]}`}
          >
            <Icon size={18} />
          </span>
          <div>
            <h2 className="text-sm font-bold dark:text-white">{title}</h2>
            <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
              {label}
            </p>
          </div>
        </div>
        <button className="icon-button">
          <Copy size={14} />
        </button>
      </div>
      <div className="mt-5 text-[13px] leading-6 text-slate-600 dark:text-slate-400">
        {children}
      </div>
    </Card>
  );
}
