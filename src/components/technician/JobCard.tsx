import { Briefcase, MapPin } from "lucide-react";
import { Job } from "../../contexts/TechnicianContext";

interface Props {
  job: Job;
  onAccept(): void;
}

export default function JobCard({ job, onAccept }: Props) {
  return (
    <div className="flex flex-col justify-between rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="grid size-10 place-content-center rounded-md bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300">
          <Briefcase className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-1">
          <h4 className="font-semibold text-gray-800 dark:text-gray-100 leading-snug">{job.title}</h4>
          <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.customer}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">₱{job.payout.toFixed(2)}</span>
        <button
          onClick={onAccept}
          className="px-3 py-1.5 text-xs font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
