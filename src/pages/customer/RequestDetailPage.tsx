import { useParams, useNavigate } from "react-router-dom";
import { useCustomer } from "../../contexts/CustomerContext";

export default function RequestDetailPage() {
  const { requestId } = useParams();
  const { requests, cancelRequest } = useCustomer();
  const nav = useNavigate();
  const req = requests.find(r => r.id === requestId);

  if (!req) return <p className="p-6 text-gray-500">Request not found.</p>;

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold">{req.title}</h2>
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">Request ID: {req.id}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">Status: {req.status}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">Total: ₱{req.total.toFixed(2)}</p>

        {req.status === "pending" && (
          <button
            onClick={() => {
              cancelRequest(req.id);
              nav("/dashboard/customer/requests");
            }}
            className="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700"
          >
            Cancel Request
          </button>
        )}
      </div>
    </div>
  );
}
