import { Search, Filter, MoreHorizontal } from "lucide-react";

const customers = [
  { id: "C-1001", name: "Alice Lopez", email: "alice@example.com", requests: 3, orders: 2, joined: "2025-10-12" },
  { id: "C-1002", name: "Bob Dylan", email: "bob@example.com", requests: 1, orders: 0, joined: "2025-11-05" },
  { id: "C-1003", name: "Charlie Stone", email: "charlie@example.com", requests: 5, orders: 4, joined: "2025-09-28" },
];

export default function CustomersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-xl font-semibold">Customers</h2>
        <div className="flex flex-wrap gap-2">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers…"
              className="w-56 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </label>
          <button className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border dark:border-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">ID</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Name</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Email</th>
              <th className="px-4 py-2 text-center font-medium text-gray-500 dark:text-gray-400">Requests</th>
              <th className="px-4 py-2 text-center font-medium text-gray-500 dark:text-gray-400">Orders</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Joined</th>
              <th className="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-2 whitespace-nowrap text-primary-600 dark:text-primary-400 font-medium">{c.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{c.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{c.email}</td>
                <td className="px-4 py-2 whitespace-nowrap text-center">{c.requests}</td>
                <td className="px-4 py-2 whitespace-nowrap text-center">{c.orders}</td>
                <td className="px-4 py-2 whitespace-nowrap">{c.joined}</td>
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
