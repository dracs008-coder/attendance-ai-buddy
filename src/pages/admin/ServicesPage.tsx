import { useState } from "react";
import { Search, Filter, Plus, Star, MoreHorizontal, CheckCircle } from "lucide-react";

const services = [
  {
    id: "S-2001",
    name: "Phone Screen Repair",
    category: "Repair",
    price: 59.99,
    duration: "1h",
    featured: true,
    active: true,
  },
  {
    id: "S-2002",
    name: "Laptop Cleanup & Thermal Paste",
    category: "Maintenance",
    price: 49.0,
    duration: "1.5h",
    featured: false,
    active: true,
  },
  {
    id: "S-2003",
    name: "Data Recovery (Basic)",
    category: "Data",
    price: 99.0,
    duration: "2h",
    featured: false,
    active: false,
  },
];

export default function ServicesPage() {
  const [sectionFilter, setSectionFilter] = useState<"all" | "device" | "web">("all");

  const filtered = services.filter((s) => {
    const section = s.category.toLowerCase().includes("web") ? "web" : "device";
    return sectionFilter === "all" || section === sectionFilter;
  });
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-xl font-semibold">Services</h2>
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "device", "web"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setSectionFilter(key)}
              className={`rounded-full px-3 py-1 text-xs capitalize transition focus:outline-none ${sectionFilter === key ? "bg-primary-600 text-white" : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"}`}
            >
              {key === "all" ? "All" : key === "device" ? "Device" : "Web Dev"}
            </button>
          ))}
          <label className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search services…"
              className="w-56 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </label>
          <button className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
            <Filter className="h-4 w-4" /> Filters
          </button>
          <button className="flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-primary-700">
            <Plus className="h-4 w-4" /> New Service
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border dark:border-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">ID</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Name</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Category</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Price</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Duration</th>
              <th className="px-4 py-2 text-center font-medium text-gray-500 dark:text-gray-400">Featured</th>
              <th className="px-4 py-2 text-center font-medium text-gray-500 dark:text-gray-400">Active</th>
              <th className="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-2 whitespace-nowrap text-primary-600 dark:text-primary-400 font-medium">{s.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{s.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{s.category}</td>
                <td className="px-4 py-2 whitespace-nowrap">${s.price.toFixed(2)}</td>
                <td className="px-4 py-2 whitespace-nowrap">{s.duration}</td>
                <td className="px-4 py-2 whitespace-nowrap text-center">
                  {s.featured && <Star className="mx-auto h-4 w-4 fill-yellow-400 text-yellow-600" />}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-center">
                  {s.active && <CheckCircle className="mx-auto h-4 w-4 text-green-600" />}
                </td>
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
