import { useTechnician } from "../../contexts/TechnicianContext";
import JobTableRow from "../../components/technician/JobTableRow";

export default function EarningsPage() {
  const { earnings, jobs } = useTechnician();
  const completed = jobs.filter(j => j.status === "completed");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Earnings</h2>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat value={earnings.week} label="This Week" />
        <Stat value={earnings.month} label="This Month" />
        <Stat value={earnings.year} label="Year to Date" />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
        <h3 className="text-lg font-semibold mb-2">Completed Jobs</h3>
        {completed.length === 0 ? (
          <p className="text-gray-500 text-sm">No completed jobs yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr className="divide-x divide-gray-200 dark:divide-gray-800">
                  <th className="px-4 py-2 text-left font-semibold">Job</th>
                  <th className="px-4 py-2 text-left font-semibold">Payout</th>
                  <th className="px-4 py-2 text-left font-semibold">Completed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {completed.map(job => (
                  <tr key={job.id} className="divide-x divide-gray-200 dark:divide-gray-800">
                    <td className="px-4 py-2 whitespace-nowrap">{job.title}</td>
                    <td className="px-4 py-2 whitespace-nowrap">₱{job.payout.toFixed(2)}</td>
                    <td className="px-4 py-2 whitespace-nowrap">--</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm">
      <p className="text-xl font-bold">₱{value.toFixed(2)}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
