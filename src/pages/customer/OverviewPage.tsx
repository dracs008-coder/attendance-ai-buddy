import { Link } from "react-router-dom";
import { useCustomer } from "../../contexts/CustomerContext";
import { ClipboardList, CreditCard, PlusSquare } from "lucide-react";

function StatCard({ title, value, icon: Icon, to }: { title: string; value: string; icon: any; to?: string }) {
  const content = (
    <div className="flex items-center gap-4 rounded-lg border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
      <div className="grid place-content-center h-12 w-12 rounded-full bg-indigo-50 text-indigo-600"><Icon className="h-5 w-5"/></div>
      <div className="space-y-0.5">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
  return to ? <Link to={to}>{content}</Link> : content;
}

export default function OverviewPage() {
  const { requests, payments } = useCustomer();
  const active = requests.filter(r => r.status === "in-progress" || r.status === "accepted").length;
  const pending = requests.filter(r => r.status === "pending").length;
  const outstanding = payments.filter(p => p.status !== "paid").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Overview</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Active Requests" value={String(active)} icon={ClipboardList} to="/dashboard/customer/requests" />
        <StatCard title="Pending Requests" value={String(pending)} icon={PlusSquare} to="/dashboard/customer/requests" />
        <StatCard title="Outstanding Balance" value={`₱${outstanding.toFixed(2)}`} icon={CreditCard} to="/dashboard/customer/payments" />
      </div>
    </div>
  );
}
