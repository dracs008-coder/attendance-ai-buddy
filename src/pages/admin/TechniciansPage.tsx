import { Search, Filter, Plus, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import TechnicianApplicationsTab from "./TechnicianApplicationsTab";
import { useState } from "react";

const technicians = [
  {
    id: "T-001",
    name: "Jane Doe",
    email: "jane@gigaease.com",
    skills: ["Screen Repair", "Battery"],
    status: "Active",
  },
  {
    id: "T-002",
    name: "John Smith",
    email: "john@gigaease.com",
    skills: ["Laptop Cleanup", "SSD Upgrade"],
    status: "Inactive",
  },
  {
    id: "T-003",
    name: "Emily Rogers",
    email: "emily@gigaease.com",
    skills: ["Wi-Fi", "Networking"],
    status: "Active",
  },
];

function StatusBadge({ s }: { s: string }) {
  const active = s === "Active";
  return active ? (
    <span className="inline-flex items-center gap-1 rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
      <CheckCircle className="h-3 w-3" /> Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
      <XCircle className="h-3 w-3" /> Inactive
    </span>
  );
}

export default function TechniciansPage() {
  const [tab, setTab] = useState<'pending'|'active'>('pending');
  return (
    <div className="space-y-8">
      <div className="flex gap-4 border-b pb-2">
        <button onClick={()=>setTab('pending')} className={`pb-1 ${tab==='pending'?'border-b-2 border-primary-600 font-medium':''}`}>Pending Applications</button>
        <button onClick={()=>setTab('active')} className={`pb-1 ${tab==='active'?'border-b-2 border-primary-600 font-medium':''}`}>Active Technicians</button>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-xl font-semibold">Technicians</h2>
        <div className="flex flex-wrap gap-2">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search technicians…"
              className="w-56 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </label>
          <button className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
            <Filter className="h-4 w-4" /> Filters
          </button>
          <button className="flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-primary-700">
            <Plus className="h-4 w-4" /> New Technician
          </button>
        </div>
      </div>

      {tab==='pending' ? (
        <TechnicianApplicationsTab />
      ) : (
        <div className="overflow-x-auto rounded-lg border dark:border-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">ID</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Name</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Email</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Skills</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
            {technicians.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-2 whitespace-nowrap text-primary-600 dark:text-primary-400 font-medium">{t.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{t.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{t.email}</td>
                <td className="px-4 py-2 whitespace-nowrap max-w-xs truncate" title={t.skills.join(", ")}>{t.skills.join(", ")}</td>
                <td className="px-4 py-2 whitespace-nowrap"><StatusBadge s={t.status} /></td>
                <td className="px-4 py-2 whitespace-nowrap text-right">
                  <button className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}
