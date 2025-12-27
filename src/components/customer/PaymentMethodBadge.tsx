export default function PaymentMethodBadge({ method }: { method: "gcash" | "cash" }) {
  const label = method === "gcash" ? "GCash" : "Cash";
  const cls = method === "gcash" ? "bg-indigo-100 text-indigo-700" : "bg-amber-100 text-amber-700";
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${cls}`}>{label}</span>;
}
