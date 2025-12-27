import { Search, Filter, Plus, MoreHorizontal, Eye, Clock, CheckCircle } from "lucide-react";

const posts = [
  {
    id: "POST-01",
    title: "Holiday Promo: 20% off Repairs",
    date: "2025-12-20",
    status: "Published",
    views: 532,
    image: "/sample-post-1.jpg",
  },
  {
    id: "POST-02",
    title: "New Website Development Packages",
    date: "2025-12-18",
    status: "Draft",
    views: 0,
    image: undefined,
  },
  {
    id: "POST-03",
    title: "Service Downtime Notice (Dec 30)",
    date: "2025-12-15",
    status: "Scheduled",
    views: 214,
    image: "/sample-post-3.jpg",
  },
];

function StatusBadge({ status }: { status: string }) {
  const map = {
    "Draft": { color: "bg-gray-100 text-gray-600", icon: Clock },
    "Scheduled": { color: "bg-yellow-100 text-yellow-700", icon: Clock },
    "Published": { color: "bg-green-100 text-green-700", icon: CheckCircle },
  } as const;
  const cfg = map[status as keyof typeof map];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium ${cfg.color}`}> <Icon className="h-3 w-3" /> {status}</span>
  );
}

export default function PostsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-xl font-semibold">Posts / Announcements</h2>
        <div className="flex flex-wrap gap-2">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts…"
              className="w-56 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </label>
          <button className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
            <Filter className="h-4 w-4" /> Filters
          </button>
          <button className="flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-primary-700">
            <Plus className="h-4 w-4" /> New Post
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border dark:border-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">ID</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Media</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Title</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Date</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="px-4 py-2 text-center font-medium text-gray-500 dark:text-gray-400">Views</th>
              <th className="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-2 whitespace-nowrap text-primary-600 dark:text-primary-400 font-medium">{p.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {p.image ? (
                    <img src={p.image} alt="" className="h-10 w-10 rounded object-cover" />
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap max-w-md truncate" title={p.title}>{p.title}</td>
                <td className="px-4 py-2 whitespace-nowrap">{p.date}</td>
                <td className="px-4 py-2 whitespace-nowrap"><StatusBadge status={p.status} /></td>
                <td className="px-4 py-2 whitespace-nowrap text-center"><Eye className="mr-1 inline h-4 w-4" /> {p.views}</td>
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
    </div>
  );
}
