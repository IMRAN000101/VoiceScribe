import {
  Languages,
  Sparkles,
  ListChecks,
  Menu as ListIcon,
  Check,
  Brain,
  Smile,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Button } from "../components/ui";
import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { saveRecording, getRecording } from "../api/recordingApi";
import { useAuth } from "../context/AuthContext";
import RecordingCard from "../components/dashboard/RecordingCard";
import ResultCard from "../components/dashboard/ResultCard";
import TranscriptCard from "../components/dashboard/TranscriptCard";
import AIActions from "../components/dashboard/AIActions";
import AudioDropzone from "../components/dashboard/AudioDropzone";

import {
  generateSummary as generateSummaryApi,
  generateKeyPoints as generateKeyPointsApi,
  generateActionItems as generateActionItemsApi,
  translateTranscript as translateTranscriptApi,
  generateEmotionAnalysis as generateEmotionAnalysisApi,
  generateMeetingTitle as generateMeetingTitleApi,
  generateSentimentAnalysis as generateSentimentAnalysisApi,
} from "../api/aiApi";

import { useParams } from "react-router-dom";

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

export default function NewRecordingPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [actionItems, setActionItems] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [language, setLanguage] = useState("");
  const [emotionAnalysis, setEmotionAnalysis] = useState(null);
  const [sentimentAnalysis, setSentimentAnalysis] = useState(null);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [loadingActions, setLoadingActions] = useState({
    summary: false,
    keypoints: false,
    actionitems: false,
    translate: false,
    emotionanalysis: false,
    title: false,
    sentiment: false,
  });

  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const { user } = useAuth();
  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      handleOpenRecording(id);
    }
  }, [id]);

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
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.log("Microphone access denied:", error);
    }
  }
  async function stopRecording() {
    const mediaRecorder = mediaRecorderRef.current;
    if (!mediaRecorder) return;
    mediaRecorder.stop();
    clearInterval(timerRef.current);
    timerRef.current = null;
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
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/transcribe`,
          {
            method: "POST",
            body: formData,
          },
        );
        const data = await response.json();
        const transcript = data.transcript?.trim() || "";
        if (!transcript) {
          toast.error("No speech detected. Please try recording again.");
          setTranscript("");
          return;
        }
        console.log("Backend Response:", data);
        setTranscript(data.transcript);
      } catch (error) {
        console.log("Update failed", error);
      }
    };
    setIsRecording(false);
  }
  async function handleAudioUpload(file) {
    try {
      setUploadLoading(true);

      const formData = new FormData();
      formData.append("audio", file);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/transcribe`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();
      console.log(data);
      console.log(data.transcript);
      console.log(data.transcript?.length);
      const transcript = data.transcript?.trim() || "";
      console.log("Final transcript:", transcript);
      if (!transcript) {
        toast.error("No speech detected");
        return;
      }
      setTranscript(transcript);
      toast.success("Transcript generated");
    } catch (error) {
      console.error(error);
      toast.error("Transcription failed");
    } finally {
      setUploadLoading(false);
    }
  }

  async function generateSummary() {
    try {
      setLoadingActions((prev) => ({
        ...prev,
        summary: true,
      }));
      const { data } = await generateSummaryApi(transcript);
      setSummary(data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingActions((prev) => ({
        ...prev,
        summary: false,
      }));
    }
  }
  async function generateKeyPoints() {
    try {
      setLoadingActions((prev) => ({
        ...prev,
        keypoints: true,
      }));
      const { data } = await generateKeyPointsApi(transcript);
      setKeyPoints(data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingActions((prev) => ({
        ...prev,
        keypoints: false,
      }));
    }
  }
  async function generateActionItems() {
    try {
      setLoadingActions((prev) => ({
        ...prev,
        actionitems: true,
      }));
      const { data } = await generateActionItemsApi(transcript);
      setActionItems(data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingActions((prev) => ({
        ...prev,
        actionitems: false,
      }));
    }
  }
  async function translateTranscript() {
    try {
      setLoadingActions((prev) => ({
        ...prev,
        translate: true,
      }));
      const { data } = await translateTranscriptApi(transcript, language);
      setTranslatedText(data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingActions((prev) => ({
        ...prev,
        translate: false,
      }));
    }
  }
  async function generateEmotionAnalysis() {
    try {
      setLoadingActions((prev) => ({
        ...prev,
        emotionanalysis: true,
      }));
      const { data } = await generateEmotionAnalysisApi(transcript);
      setEmotionAnalysis(data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingActions((prev) => ({
        ...prev,
        emotionanalysis: false,
      }));
    }
  }
  async function generateMeetingTitle() {
    try {
      setLoadingActions((prev) => ({
        ...prev,
        title: true,
      }));
      const { data } = await generateMeetingTitleApi(transcript);
      setMeetingTitle(data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingActions((prev) => ({
        ...prev,
        title: false,
      }));
    }
  }
  async function generateSentimentAnalysis() {
    try {
      setLoadingActions((prev) => ({
        ...prev,
        sentiment: true,
      }));
      const { data } = await generateSentimentAnalysisApi(transcript);
      setSentimentAnalysis(data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingActions((prev) => ({
        ...prev,
        sentiment: false,
      }));
    }
  }

  async function handleSaveRecording() {
    try {
      let finalTitle = meetingTitle;
      if (!finalTitle) {
        const { data } = await generateMeetingTitleApi(transcript);
        finalTitle = data.result;
        setMeetingTitle(finalTitle);
      }
      const recordingData = {
        title: finalTitle || `Meeting ${new Date().toLocaleString()}`,
        transcript,
        summary,
        keyPoints: keyPoints
          .split("*")
          .filter((item) => item.trim())
          .map((item) => item.replace("[ ]", "").trim()),
        actionItems: actionItems
          .split("*")
          .filter((item) => item.trim())
          .map((item) => item.replace("[ ]", "").trim()),
        translatedText,
        emotionAnalysis,
        sentimentAnalysis,
      };
      if (!transcript.trim()) return toast.error("Nothing to save");
      const { data } = await saveRecording(recordingData);
      console.log(data);
      toast.success("Recording Saved");
      setTranscript("");
      setSummary("");
      setKeyPoints("");
      setActionItems("");
      setTranslatedText("");
      setEmotionAnalysis(null);
      setMeetingTitle("");
      setAudioURL(null);
      setSentimentAnalysis(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to Save Recording");
    }
  }

  async function handleOpenRecording(id) {
    try {
      const { data } = await getRecording(id);
      const recording = data.recording;
      console.log(recording);
      setTranscript(recording.transcript);
      setSummary(recording.summary || "");
      setKeyPoints((recording.keyPoints || []).join("*"));
      setActionItems((recording.actionItems || []).join("*"));
      setTranslatedText(recording.translatedText || "");
      setEmotionAnalysis(recording.emotionAnalysis || null);
      setMeetingTitle(recording.title);
      setSentimentAnalysis(recording.sentimentAnalysis || null);
    } catch (error) {
      console.log(error);
    }
  }

  function copyToClipboard(text, label) {
    if (!text || !text.trim()) {
      toast.error(`No ${label} to copy`);
      return;
    }
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  }
  function formatEmotionAnalysis(emotion) {
    if (!emotion) return "";

    return `
Dominant Emotion: ${emotion.dominantEmotion}

Confidence: ${emotion.confidence}%

Reason:
${emotion.reason}

Emotion Breakdown:
${emotion.emotions.map((e) => `${e.name}: ${e.percentage}%`).join("\n")}
`.trim();
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
          <RecordingCard
            isRecording={isRecording}
            startRecording={startRecording}
            stopRecording={stopRecording}
            audioURL={audioURL}
            recordingTime={recordingTime}
            uploadLoading={uploadLoading}
            onFileSelect={handleAudioUpload}
          />

          <div className="space-y-6">
            <TranscriptCard
              transcript={transcript}
              copyToClipboard={copyToClipboard}
            />

            <AIActions
              transcript={transcript}
              setTranscript={setTranscript}
              language={language}
              setLanguage={setLanguage}
              loadingActions={loadingActions}
              generateSummary={generateSummary}
              generateKeyPoints={generateKeyPoints}
              generateActionItems={generateActionItems}
              translateTranscript={translateTranscript}
              generateEmotionAnalysis={generateEmotionAnalysis}
              generateSentimentAnalysis={generateSentimentAnalysis}
            />
          </div>
        </section>

        <section className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <ResultCard
            icon={Sparkles}
            title="AI Summary"
            label="Generated By AI"
            color="indigo"
            isEmpty={!summary.trim()}
            emptyMessage="Generate a summary to see a concise overview of your conversation."
            copyText={summary}
            onCopy={copyToClipboard}
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
          </ResultCard>
          <ResultCard
            icon={ListIcon}
            title="Key Points"
            label="Generated By AI"
            color="blue"
            isEmpty={!keyPoints.trim()}
            emptyMessage="Key discussion points will appear here after AI analysis."
            copyText={keyPoints}
            onCopy={copyToClipboard}
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
          </ResultCard>
          <ResultCard
            icon={ListChecks}
            title="Action Items"
            label="Generated By AI"
            color="emerald"
            isEmpty={!actionItems.trim()}
            emptyMessage="Generate action items to extract tasks and follow-ups automatically."
            copyText={actionItems}
            onCopy={copyToClipboard}
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
          </ResultCard>
          <ResultCard
            icon={Languages}
            title="Translation"
            label="Generated By AI"
            color="amber"
            isEmpty={!translatedText.trim()}
            emptyMessage="Choose a language and generate a translated version of your transcript."
            copyText={translatedText}
            onCopy={copyToClipboard}
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
          </ResultCard>
          <ResultCard
            icon={Brain}
            title="Emotion Analysis"
            label="Generated By AI"
            color="rose"
            isEmpty={!emotionAnalysis}
            emptyMessage="Analyze the transcript to detect the overall emotional tone."
            copyText={formatEmotionAnalysis(emotionAnalysis)}
            onCopy={copyToClipboard}
          >
            {emotionAnalysis && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500">Dominant Emotion</p>
                  <p className="text-lg font-semibold">
                    {emotionAnalysis.dominantEmotion}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Confidence</p>
                  <p>{emotionAnalysis.confidence}%</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Reason</p>
                  <p>{emotionAnalysis.reason}</p>
                </div>

                <div>
                  <p className="text-xs font-medium">Emotion Breakdown</p>

                  {emotionAnalysis.emotions.map((emotion) => (
                    <div
                      key={emotion.name}
                      className="flex justify-between text-sm"
                    >
                      <span>{emotion.name}</span>
                      <span>{emotion.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ResultCard>
          <ResultCard
            icon={Smile}
            title="Sentiment Analysis"
            label="Generated By AI"
            color="blue"
            isEmpty={!sentimentAnalysis}
            emptyMessage="Analyze the transcript to determine the overall sentiment."
            copyText={
              sentimentAnalysis
                ? `Sentiment: ${sentimentAnalysis.sentiment}
                  Confidence: ${sentimentAnalysis.confidence}%
                  Reason: ${sentimentAnalysis.reason}`
                : ""
            }
            onCopy={copyToClipboard}
          >
            {sentimentAnalysis && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500">Overall Sentiment</p>
                  <p className="text-lg font-semibold">
                    {sentimentAnalysis.sentiment}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Confidence</p>
                  <p>{sentimentAnalysis.confidence}%</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Reason</p>
                  <p>{sentimentAnalysis.reason}</p>
                </div>
              </div>
            )}
          </ResultCard>
        </section>

        <div className="flex justify-end">
          <Button disabled={!transcript.trim()} onClick={handleSaveRecording}>
            Save Recording
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
