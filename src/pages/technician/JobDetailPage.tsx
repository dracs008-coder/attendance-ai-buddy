import { useParams, useNavigate } from "react-router-dom";
import { useTechnician } from "../../contexts/TechnicianContext";
import { useState } from "react";

export default function JobDetailPage() {
  const { jobId } = useParams();
  const navi = useNavigate();
  const { jobs, completeJob } = useTechnician();
  const job = jobs.find(j => j.id === jobId);
  const [partsChecked, setPartsChecked] = useState(false);

  if (!job) return <p className="p-6 text-gray-500">Job not found.</p>;

  const finish = () => {
    completeJob(job.id);
    navi("/dashboard/technician/my-jobs");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold">{job.title}</h2>
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">Customer: {job.customer}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Payout: ₱{job.payout.toFixed(2)}</p>

        <div className="flex items-center gap-2">
          <input type="checkbox" checked={partsChecked} onChange={e=>setPartsChecked(e.target.checked)} />
          <span className="text-sm">All required parts loaded</span>
        </div>

        <button
          disabled={!partsChecked}
          onClick={finish}
          className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium disabled:opacity-50"
        >
          Mark Complete
        </button>
      </div>
    </div>
  );
}
