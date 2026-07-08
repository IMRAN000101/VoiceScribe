import {
  Sparkles,
  FileText,
  ListChecks,
  Languages,
  WandSparkles,
  ArrowUpRight,
  Brain,
  Smile,
} from "lucide-react";

import { Card } from "../ui";

const AIActions = ({
  transcript,
  setTranscript,
  language,
  setLanguage,
  loadingActions,
  generateSummary,
  generateKeyPoints,
  generateActionItems,
  translateTranscript,
  generateEmotionAnalysis,
  generateSentimentAnalysis,
}) => {
  const actions = [
    {
      icon: Sparkles,
      title: "Generate Summary",
      text: "Get a concise overview",
      tone: "indigo",
    },
    {
      icon: FileText,
      title: "Extract Key Points",
      text: "Find important insights",
      tone: "blue",
    },
    {
      icon: ListChecks,
      title: "Extract Tasks",
      text: "Identify action items",
      tone: "emerald",
    },
    {
      icon: Languages,
      title: "Translate",
      text: "Translate into 30+ languages",
      tone: "amber",
    },
    {
      icon: Brain,
      title: "Emotion Analysis",
      text: "Detect meeting emotions",
      tone: "rose",
    },
    {
      icon: Smile,
      title: "Sentiment Analysis",
      text: "Understand conversation tone",
      tone: "violet",
    },
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
    rose: {
      tile: "from-rose-50 to-pink-50/60 border-rose-100/80 dark:from-rose-950/40 dark:to-pink-950/40 dark:border-rose-900/60",
      icon: "bg-rose-500 text-white shadow-rose-200 dark:shadow-rose-900/50",
      button:
        "text-rose-600 group-hover:bg-rose-500 dark:text-rose-400 dark:group-hover:bg-rose-500",
    },
    violet: {
      tile: "from-violet-50 to-purple-50/60 border-violet-100/80 dark:from-violet-950/40 dark:to-purple-950/40 dark:border-violet-900/60",
      icon: "bg-violet-600 text-white shadow-violet-200 dark:shadow-violet-900/50",
      button:
        "text-violet-600 group-hover:bg-violet-600 dark:text-violet-400 dark:group-hover:bg-violet-600",
    },
  };

  return (
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
          <option value="American English">American English</option>
        </select>
      </div>
      <div
        className="mt-4 grid gap-3 sm:grid-cols-2 
        grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
      >
        {actions.map(({ icon: Icon, title, text, tone }) => {
          const t = tones[tone];
          return (
            <button
              key={title}
              disabled={
                !transcript.trim() ||
                (title === "Translate" && !language) ||
                (title === "Generate Summary" && loadingActions.summary) ||
                (title === "Extract Key Points" && loadingActions.keypoints) ||
                (title === "Extract Tasks" && loadingActions.actionitems) ||
                (title === "Translate" && loadingActions.translate) ||
                (title === "Emotion Analysis" &&
                  loadingActions.emotionanalysis) ||
                (title === "Sentiment Analysis" && loadingActions.sentiment)
              }
              onClick={() => {
                if (title === "Generate Summary") generateSummary();
                if (title === "Extract Key Points") generateKeyPoints();
                if (title === "Extract Tasks") generateActionItems();
                if (title === "Translate") translateTranscript();
                if (title === "Emotion Analysis") generateEmotionAnalysis();
                if (title === "Sentiment Analysis") generateSentimentAnalysis();
              }}
              className={`group min-h-40 rounded-2xl border bg-gradient-to-br p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:text-white disabled:opacity-60 disabled:cursor-not-allowed ${t.tile}`}
            >
              <span
                className={`grid h-9 w-9 place-items-center rounded-xl shadow-lg ${t.icon}`}
              >
                <Icon size={17} />
              </span>
              <h3 className="mt-4 text-[13px] font-bold text-slate-900 dark:text-white">
                {loadingActions.summary && title === "Generate Summary"
                  ? "Generating..."
                  : loadingActions.keypoints && title === "Extract Key Points"
                    ? "Generating..."
                    : loadingActions.actionitems && title === "Extract Tasks"
                      ? "Generating..."
                      : loadingActions.translate && title === "Translate"
                        ? "Translating..."
                        : loadingActions.emotionanalysis &&
                            title === "Emotion Analysis"
                          ? "Analyzing..."
                          : loadingActions.sentiment &&
                              title === "Sentiment Analysis"
                            ? "Analyzing..."
                            : title}
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
  );
};

export default AIActions;
