import { Search, Filter, Plus, Star, MoreHorizontal } from "lucide-react";

const products = [
  {
    id: "P-3001",
    name: "iPhone Screen Replacement Kit",
    category: "Spare Parts",
    price: 89.99,
    stock: 24,
    featured: true,
  },
  {
    id: "P-3002",
    name: "Windows 11 Pro License (Digital)",
    category: "Software",
    price: 129.0,
    stock: 999,
    featured: false,
  },
  {
    id: "P-3003",
    name: "USB-C Hub 7-in-1",
    category: "Accessories",
    price: 39.5,
    stock: 12,
    featured: true,
  },
];

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-xl font-semibold">Products</h2>
        <div className="flex flex-wrap gap-2">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products…"
              className="w-56 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </label>
          <button className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
            <Filter className="h-4 w-4" /> Filters
          </button>
          <button className="flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-primary-700">
            <Plus className="h-4 w-4" /> New Product
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
              <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Stock</th>
              <th className="px-4 py-2 text-center font-medium text-gray-500 dark:text-gray-400">Featured</th>
              <th className="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-2 whitespace-nowrap text-primary-600 dark:text-primary-400 font-medium">{p.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{p.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{p.category}</td>
                <td className="px-4 py-2 whitespace-nowrap">${p.price.toFixed(2)}</td>
                <td className="px-4 py-2 whitespace-nowrap">{p.stock}</td>
                <td className="px-4 py-2 whitespace-nowrap text-center">
                  {p.featured && <Star className="mx-auto h-4 w-4 fill-yellow-400 text-yellow-600" />}
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
