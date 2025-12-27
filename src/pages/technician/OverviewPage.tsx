import { useTechnician } from "../../contexts/TechnicianContext";
import { ClipboardList, Calendar, DollarSign } from "lucide-react";

export default function TechnicianOverviewPage() {
  const { jobs, earnings } = useTechnician();
  const active = jobs.filter(j => j.status === "active").length;
  const scheduled = jobs.filter(j => j.status === "scheduled").length;
  const upcoming = jobs.filter(j => j.status === "scheduled").slice(0, 3);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Overview</h2>

      {/* stats cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Active Jobs" value={active} Icon={ClipboardList} color="indigo" />
        <StatCard label="Scheduled" value={scheduled} Icon={Calendar} color="amber" />
        <StatCard label="Weekly Earnings" value={new Intl.NumberFormat('en-PH',{style:'currency',currency:'PHP'}).format(earnings.week)} Icon={DollarSign} color="emerald" />
      </div>

      {/* upcoming schedule */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Upcoming Scheduled Jobs</h3>
        {upcoming.length === 0 ? (
          <p className="text-gray-500 text-sm">No jobs scheduled.</p>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            {upcoming.map(j => (
              <li key={j.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-100">{j.title}</p>
                  <p className="text-xs text-gray-500">{j.customer}</p>
                </div>
                <span className="text-sm text-gray-400">{j.scheduledFor ? new Date(j.scheduledFor).toLocaleString() : "TBD"}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, Icon, color }: { label: string; value: number | string; Icon: any; color: string }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm">
      <div
        className={`grid size-12 place-content-center rounded-full bg-${color}-100 text-${color}-600 dark:bg-${color}-900/40 dark:text-${color}-300`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-bold leading-tight">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}
