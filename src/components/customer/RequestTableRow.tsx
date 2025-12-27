import { ServiceRequest } from "../../contexts/CustomerContext";
import RequestStatusBadge from "../../features/requests/components/RequestStatusBadge";
import { Link } from "react-router-dom";

export default function RequestTableRow({ req }: { req: ServiceRequest }) {
  return (
    <tr className="divide-x divide-gray-200 dark:divide-gray-800">
      <td className="px-4 py-2 whitespace-nowrap">
        <Link to={req.id} className="text-indigo-600 hover:underline">
          {req.title}
        </Link>
      </td>
      <td className="px-4 py-2 whitespace-nowrap">{new Date(req.createdAt).toLocaleDateString()}</td>
      <td className="px-4 py-2 whitespace-nowrap">₱{req.total.toFixed(2)}</td>
      <td className="px-4 py-2 whitespace-nowrap">
        <RequestStatusBadge status={req.status} className="text-xs" />
      </td>
    </tr>
  );
}
