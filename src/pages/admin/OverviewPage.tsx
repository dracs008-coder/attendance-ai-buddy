import { Activity, Box, DollarSign, Users } from "lucide-react";

import { Search } from "lucide-react";

const metrics = [
  { title: "Active Requests", value: 12, icon: Activity },
  { title: "Completed Today", value: 34, icon: Box },
  { title: "Revenue Today", value: "$1,240", icon: DollarSign },
  { title: "Techs Online", value: 5, icon: Users },
];

const recent = [
  { id: 1, text: "Request #1024 marked Completed", time: "2m ago" },
  { id: 2, text: "New technician Jane D. onboarded", time: "20m ago" },
  { id: 3, text: "Invoice #501 verified", time: "1h ago" },
  { id: 4, text: "Bundle 'Phone Care' updated", time: "3h ago" },
  { id: 5, text: "Post 'Holiday Promo' published", time: "Yesterday" },
];

const quickActions = [
  { label: "New Product", className: "bg-primary-600 hover:bg-primary-700" },
  { label: "Add Technician", className: "bg-emerald-600 hover:bg-emerald-700" },
  { label: "Publish Post", className: "bg-indigo-600 hover:bg-indigo-700" },
];

const breakdown = [
  { status: "Pending", value: 14, color: "yellow-500" },
  { status: "In-Progress", value: 8, color: "blue-500" },
  { status: "Completed", value: 34, color: "green-600" },
  { status: "Cancelled", value: 3, color: "red-500" },
];

const alerts = [
  { id: 1, text: "3 requests overdue", severity: "warning" },
  { id: 2, text: "Low inventory: iPhone screen replacement kit", severity: "info" },
];

const pendingApprovals = [
  { id: "P-501", text: "Payment verification", age: "5m" },
  { id: "T-204", text: "Technician application", age: "1h" },
];

export default function OverviewPage() {
  return (
    <div className="space-y-10">
      {/* Search + Quick actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search ID, customer, technician…"
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {quickActions.map((qa) => (
            <button
              key={qa.label}
              className={`rounded-lg px-3 py-2 text-xs font-medium text-white transition ${qa.className}` }
            >
              {qa.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
            >
              <span>{a.text}</span>
              <button className="text-xs underline">View</button>
            </div>
          ))}
        </div>
      )}

      {/* Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(({ title, value, icon: Icon }) => (
          <div key={title} className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center gap-4">
              <div className="grid size-10 place-content-center rounded-md bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-4 text-lg font-medium">Recent activity</h3>
        <ul className="space-y-3">
          {recent.map((item) => (
            <li key={item.id} className="flex items-center justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-200">{item.text}</span>
              <span className="text-gray-400">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Status breakdown & Technician availability */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Breakdown */}
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-4 text-lg font-medium">Request status</h3>
          <div className="space-y-3">
            {breakdown.map((b) => (
              <div key={b.status} className="flex items-center gap-3 text-sm">
                <span className={`inline-block size-3 rounded-full bg-${b.color}`}></span>
                <span className="flex-1 text-gray-700 dark:text-gray-200">{b.status}</span>
                <span className="text-gray-500 dark:text-gray-400">{b.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technician availability */}
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-4 text-lg font-medium">Technician availability</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">5 online • 12 offline • 3 on leave</p>
        </div>
      </div>

      {/* Revenue / Request trend chart placeholder */}
      <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-4 text-lg font-medium">Last 7 days revenue</h3>
        <div className="h-56 w-full rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
          <span>Chart placeholder</span>
        </div>
      </div>

      {/* Pending approvals */}
      <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-4 text-lg font-medium">Pending approvals</h3>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          {pendingApprovals.map((p) => (
            <li key={p.id} className="flex items-center justify-between py-2">
              <span>{p.text}</span>
              <span className="text-gray-400">{p.age}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
