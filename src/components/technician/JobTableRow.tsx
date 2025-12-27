import { Job } from "../../contexts/TechnicianContext";
import { Link } from "react-router-dom";

export default function JobTableRow({ job }: { job: Job }) {
  const badge = (status: Job["status"]) => {
    const map: Record<string, string> = {
      active: "bg-indigo-100 text-indigo-700",
      scheduled: "bg-amber-100 text-amber-700",
      completed: "bg-emerald-100 text-emerald-700"
    };
    return <span className={`px-2 py-0.5 rounded text-xs font-medium ${map[status]}`}>{status}</span>;
  };

  return (
    <tr className="divide-x divide-gray-200 dark:divide-gray-800">
      <td className="px-4 py-2 whitespace-nowrap">
        <Link to={`/dashboard/technician/my-jobs/${job.id}`} className="text-indigo-600 hover:underline">
          {job.title}
        </Link>
        <div className="text-xs text-gray-500">{job.customer}</div>
      </td>
      <td className="px-4 py-2 whitespace-nowrap">₱{job.payout.toFixed(2)}</td>
      <td className="px-4 py-2 whitespace-nowrap">{job.scheduledFor ? new Date(job.scheduledFor).toLocaleDateString() : "-"}</td>
      <td className="px-4 py-2 whitespace-nowrap">{badge(job.status)}</td>
    </tr>
  );
}
