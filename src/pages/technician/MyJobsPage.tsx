import { useState } from "react";
import { useTechnician } from "../../contexts/TechnicianContext";
import JobTableRow from "../../components/technician/JobTableRow";

const tabs = ["Active", "Scheduled", "Completed"] as const;

type Tab = (typeof tabs)[number];

export default function MyJobsPage() {
  const { jobs } = useTechnician();
  const [tab, setTab] = useState<Tab>("Active");

  const filtered = jobs.filter(j => {
    if (tab === "Active") return j.status === "active";
    if (tab === "Scheduled") return j.status === "scheduled";
    return j.status === "completed";
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Jobs</h2>

      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-sm font-medium border-b-2 transition-colors ${
              tab === t
                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">No jobs in this category.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr className="divide-x divide-gray-200 dark:divide-gray-800">
                <th className="px-4 py-2 text-left font-semibold">Job</th>
                <th className="px-4 py-2 text-left font-semibold">Payout</th>
                <th className="px-4 py-2 text-left font-semibold">Schedule</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filtered.map(job => (
                <JobTableRow key={job.id} job={job} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
