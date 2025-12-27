import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import RequestFilterBar from '../../components/customer/RequestFilterBar';
import RequestCard from '../../components/customer/RequestCard';
import RequestTableRow from '../../components/customer/RequestTableRow';
import { useCustomer } from '../../contexts/CustomerContext';

export default function MyRequestsPage() {
  const { requests } = useCustomer();
  const [status, setStatus] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const filtered = useMemo(() => {
    return requests.filter(r => {
      const matchesStatus = status ? r.status === status : true;
      const q = search.toLowerCase();
      const matchesSearch = q ? r.title.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) : true;
      return matchesStatus && matchesSearch;
    });
  }, [requests, status, search]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4 sticky top-0 bg-background z-10 pb-2">
        <h2 className="text-2xl font-semibold">Requests</h2>
        <Link
          to="/dashboard/customer/new-request"
          className="rounded-lg bg-primary-600 px-4 py-2 text-white text-sm font-medium hover:bg-primary-700"
        >
          New Request
        </Link>
      </div>

      {/* Filters */}
      <RequestFilterBar status={status} setStatus={setStatus} search={search} setSearch={setSearch} />

      {/* List */}
      {filtered.length === 0 && (
        <div className="mt-10 text-center text-gray-500">
          <p>No requests found.</p>
        </div>
      )}

      {/* Card list (mobile) */}
      <div className="lg:hidden space-y-3">
        {filtered.map(req => (
          <RequestCard key={req.id} req={req} />
        ))}
      </div>

      {/* Table list (desktop) */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white rounded-xl shadow-sm">
            <thead className="bg-gray-50 text-left text-sm font-medium text-gray-700">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {filtered.map(req => (
                <RequestTableRow key={req.id} req={req} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
          </div>
  );
}
