import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardStats from "../components/dashboard/DashboardStats";
import QuickActions from "../components/dashboard/QuickActions";
import RecentRecordings from "../components/dashboard/RecentRecordings";
import { getRecordings } from "../api/recordingApi";

export default function DashboardOverviewPage() {
  const [recordings, setRecordings] = useState([]);
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
  const statsData = {
    recordings: recordings.length,
    summaries: recordings.filter((r) => r.summary?.trim()).length,
    actions: recordings.reduce(
      (total, recording) => total + (recording.actionItems?.length || 0),
      0,
    ),
  };
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1480px] space-y-7 p-4 pb-10 sm:p-6 xl:p-8">
        <DashboardStats statsData={statsData} />

        <QuickActions />

        <RecentRecordings
          recordings={recordings}
          filteredAndSortedRecordings={recordings.slice(0, 3)}
          editingId={null}
          editedTitle=""
          setEditingId={() => {}}
          setEditedTitle={() => {}}
          handleUpdatedTitle={() => {}}
          handleOpenRecording={() => {}}
          setRecordingToDelete={() => {}}
          setShowDeleteModal={() => {}}
          showViewAll
          readOnly
        />
      </div>
    </DashboardLayout>
  );
}
