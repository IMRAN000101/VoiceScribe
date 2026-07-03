import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getRecordings,
  saveRecording,
  getRecording,
  deleteRecording,
  updateRecording,
} from "../api/recordingApi";
import RecentRecordings from "../components/dashboard/RecentRecordings";
import DeleteModal from "../components/dashboard/DeleteModal";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function HistoryPage() {
  const [recordings, setRecordings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recordingToDelete, setRecordingToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadRecordings();
  }, []);

  async function loadRecordings() {
    try {
      const { data } = await getRecordings();
      setRecordings(data.recordings);
    } catch (error) {
      console.error(error);
    }
  }
  async function handleOpenRecording(id) {
    navigate(`/record/${id}`);
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
  const filteredAndSortedRecordings = recordings.filter(
    (recording) =>
      recording.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recording.transcript.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout 
    searchTerm={searchTerm} 
    setSearchTerm={setSearchTerm}
    >
      <div className="mx-auto max-w-[1480px] space-y-7 p-4 pb-10 sm:p-6 xl:p-8">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">History</h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Browse, search and manage your recordings.
          </p>
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

        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          setRecordingToDelete={setRecordingToDelete}
          confirmDelete={confirmDelete}
        />
      </div>
    </DashboardLayout>
  );
}
