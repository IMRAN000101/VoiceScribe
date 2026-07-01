// import { getProfile } from "../api/userApi";
import {
  // Clock3,
  Languages,
  Sparkles,
  ListChecks,
  Menu as ListIcon,
  // MoreHorizontal,
  Check,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Button } from "../components/ui";
import { useState, useRef, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import {
  getRecordings,
  saveRecording,
  getRecording,
  deleteRecording,
  updateRecording,
} from "../api/recordingApi";
import TranscriptCard from "../components/dashboard/TranscriptCard";
import AIActions from "../components/dashboard/AIActions";
import RecentRecordings from "../components/dashboard/RecentRecordings";
import RecordingCard from "../components/dashboard/RecordingCard";
import DeleteModal from "../components/dashboard/DeleteModal";
import ResultCard from "../components/dashboard/ResultCard";


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
  const [recordings, setRecordings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recordingToDelete, setRecordingToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingActions, setLoadingActions] = useState({
    summary: false,
    keypoints: false,
    actionitems: false,
    translate: false,
  });

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // const { user } = useAuth();
  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  useEffect(() => {
    loadRecordings();
  }, []);

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
      setLoadingActions((prev) => ({
        ...prev,
        summary: true,
      }));
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
      setLoadingActions((prev) => ({
        ...prev,
        translate: false,
      }));
    }
  }

  async function handleSaveRecording() {
    try {
      const recordingData = {
        title: `Meeting ${new Date().toLocaleString()}`,
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
        audioUrl: audioURL,
      };
      const { data } = await saveRecording(recordingData);
      console.log(data);
      toast.success("Recording Saved");
      await loadRecordings();
    } catch (error) {
      console.error(error);
      toast.error("Failed to Save Recording");
    }
  }

  async function loadRecordings() {
    try {
      const { data } = await getRecordings();
      setRecordings(data.recordings);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleOpenRecording(id) {
    try {
      const { data } = await getRecording(id);
      const recording = data.recording;
      setTranscript(recording.transcript);
      setSummary(recording.summary || "");
      setKeyPoints((recording.keyPoints || []).join("*"));
      setActionItems((recording.actionItems || []).join("*"));
      setTranslatedText(recording.translatedText || "");
      // setAudioURL(recording.audioUrl || null);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteRecording(id) {
    try {
      await deleteRecording(id);
      await loadRecordings();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdatedTitle(id) {
    try {
      await updateRecording(id, {
        title: editedTitle,
      });
      setEditingId(null);
      setEditedTitle("");
      await loadRecordings();
    } catch (error) {
      console.error(error);
    }
  }

  async function confirmDelete() {
    try {
      await handleDeleteRecording(recordingToDelete);

      setShowDeleteModal(false);
      setRecordingToDelete(null);
    } catch (error) {
      console.error(error);
    }
  }

  function copyToClipboard(text, label) {
    if (!text.trim()) {
      toast.error(`No ${label} to copy`);
      return;
    }
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  }

  const filteredAndSortedRecordings = [...recordings]
    .filter(
      (recording) =>
        recording.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recording.transcript.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "newest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  return (
    <DashboardLayout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
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
          />

          <div className="space-y-6">
            <TranscriptCard
              transcript={transcript}
              copyToClipboard={copyToClipboard}
            />

            <AIActions
              language={language}
              setLanguage={setLanguage}
              loadingActions={loadingActions}
              generateSummary={generateSummary}
              generateKeyPoints={generateKeyPoints}
              generateActionItems={generateActionItems}
              translateTranscript={translateTranscript}
            />
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-4">
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
        </section>

        <div className="flex justify-end">
          <Button onClick={handleSaveRecording}>Save Recording</Button>
        </div>

        <RecentRecordings
          recordings={recordings}
          filteredAndSortedRecordings={filteredAndSortedRecordings}
          editingId={editingId}
          editedTitle={editedTitle}
          setEditingId={setEditingId}
          setEditedTitle={setEditedTitle}
          handleUpdatedTitle={handleUpdatedTitle}
          handleOpenRecording={handleOpenRecording}
          setRecordingToDelete={setRecordingToDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      </div>
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        setRecordingToDelete={setRecordingToDelete}
        confirmDelete={confirmDelete}
      />
    </DashboardLayout>
  );
}
