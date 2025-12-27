import { ServiceRequest } from '../../contexts/CustomerContext';
import RequestStatusBadge from '../../features/requests/components/RequestStatusBadge';
import { Link } from 'react-router-dom';

export default function RequestCard({ req }: { req: ServiceRequest }) {
  return (
    <Link
      to={req.id}
      className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        {/* status color strip */}
        <span
          className={`w-1 rounded-full ${
            {
              pending: 'bg-yellow-400',
              accepted: 'bg-blue-500',
              'in-progress': 'bg-indigo-500',
              completed: 'bg-green-500',
              cancelled: 'bg-red-500',
            }[req.status] || 'bg-gray-300'
          }`}
        />

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{req.title}</h3>
            <RequestStatusBadge status={req.status} className="text-xs" />
          </div>
          <p className="text-xs text-gray-500">{new Date(req.createdAt).toLocaleDateString()}</p>
          <p className="text-sm font-semibold text-gray-800">₱{req.total.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
