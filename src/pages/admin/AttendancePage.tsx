import { CalendarDays, Search, Filter } from "lucide-react";

const logs = [
  {
    id: 1,
    tech: "Jane Doe",
    date: "2025-12-26",
    in: "08:10",
    out: "17:05",
    hours: "8.9",
    status: "On-time",
  },
  {
    id: 2,
    tech: "John Smith",
    date: "2025-12-26",
    in: "09:02",
    out: "18:00",
    hours: "8.0",
    status: "Late",
  },
  {
    id: 3,
    tech: "Emily R.",
    date: "2025-12-26",
    in: "--",
    out: "--",
    hours: "0",
    status: "Absent",
  },
];

export default function AttendancePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-xl font-semibold">Attendance</h2>
        <div className="flex flex-wrap gap-2">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search technician…"
              className="w-48 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </label>
          <button className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
            <CalendarDays className="h-4 w-4" /> Date range
          </button>
          <button className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border dark:border-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Technician</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Date</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Check-in</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Check-out</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Hours</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
            {logs.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-2 whitespace-nowrap text-gray-900 dark:text-gray-100">{row.tech}</td>
                <td className="px-4 py-2 whitespace-nowrap">{row.date}</td>
                <td className="px-4 py-2 whitespace-nowrap">{row.in}</td>
                <td className="px-4 py-2 whitespace-nowrap">{row.out}</td>
                <td className="px-4 py-2 whitespace-nowrap">{row.hours}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className={`rounded px-2 py-0.5 text-xs font-medium ${row.status === "On-time" ? "bg-green-100 text-green-700" : row.status === "Late" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
