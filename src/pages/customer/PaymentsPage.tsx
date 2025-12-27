import { useState } from "react";
import { useCustomer } from "../../contexts/CustomerContext";
import PaymentMethodBadge from "../../components/customer/PaymentMethodBadge";
import { Dialog } from "@headlessui/react";

export default function PaymentsPage() {
  const { payments, payInvoice } = useCustomer();
  const [tab, setTab] = useState<"unpaid" | "paid">("unpaid");
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const unpaid = payments.filter(p => p.status !== "paid");
  const paid = payments.filter(p => p.status === "paid");
  const selected = payments.find(p => p.id === selectedId);
  const [method, setMethod] = useState<"gcash" | "cash">("gcash");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payments</h2>

      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800">
        {(["unpaid", "paid"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 text-sm font-medium border-b-2 transition-colors ${
              tab === t ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500"
            }`}
          >
            {t === "unpaid" ? "Unpaid" : "Paid"}
          </button>
        ))}
      </div>

      {(tab === "unpaid" ? unpaid : paid).length === 0 ? (
        <p className="text-gray-500 text-sm">No {tab} invoices.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr className="divide-x divide-gray-200 dark:divide-gray-800">
                <th className="px-4 py-2 text-left font-semibold">Invoice</th>
                <th className="px-4 py-2 text-left font-semibold">Amount</th>
                <th className="px-4 py-2 text-left font-semibold">Method</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {(tab === "unpaid" ? unpaid : paid).map(p => (
                <tr key={p.id} className="divide-x divide-gray-200 dark:divide-gray-800">
                  <td className="px-4 py-2 whitespace-nowrap">{p.id}</td>
                  <td className="px-4 py-2 whitespace-nowrap">₱{p.amount.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap"><PaymentMethodBadge method={p.method as any} /></td>
                  <td className="px-4 py-2 whitespace-nowrap text-right">
                    {p.status !== "paid" && (
                      <button
                        onClick={() => {
                          setSelectedId(p.id);
                          setOpen(true);
                          setMethod("gcash");
                        }}
                        className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700"
                      >
                        Pay Now
                      </button>
                    )}
                    {p.status === "paid" && <span className="text-emerald-600 font-medium text-xs">Paid</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pay Drawer */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white dark:bg-gray-900 p-6 space-y-4">
            <Dialog.Title className="text-lg font-semibold">Settle Payment</Dialog.Title>
            {selected && (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-300">Invoice: {selected.id}</p>
                <p className="text-sm font-medium">Amount: ₱{selected.amount.toFixed(2)}</p>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Method</label>
                  <div className="flex gap-3">
                    {(["gcash", "cash"] as const).map(m => (
                      <button
                        key={m}
                        onClick={() => setMethod(m)}
                        className={`flex-1 px-3 py-1.5 rounded-md border text-sm ${
                          method === m ? "border-indigo-600 bg-indigo-50" : "border-gray-300"
                        }`}
                      >
                        {m === "gcash" ? "GCash" : "Cash"}
                      </button>
                    ))}
                  </div>
                </div>

                {method === "gcash" && (
                  <div className="space-y-1 text-center">
                    <img src="/gcash-qr-placeholder.png" alt="GCash QR" className="mx-auto h-40 w-40 object-contain" />
                    <p className="text-xs text-gray-500">Scan QR with GCash to pay.</p>
                  </div>
                )}
                {method === "cash" && (
                  <p className="text-xs text-gray-500">Please hand the exact amount to the technician after service completion.</p>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={() => setOpen(false)} className="text-sm px-3 py-1.5 rounded-md border">Cancel</button>
                  <button
                    onClick={() => {
                      if (selected) {
                        payInvoice(selected.id);
                        setOpen(false);
                      }
                    }}
                    className="px-4 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium"
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
