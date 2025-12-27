import { Dispatch, SetStateAction } from 'react';

interface RequestFilterBarProps {
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export default function RequestFilterBar({ status, setStatus, search, setSearch }: RequestFilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
      >
        <option value="">All statuses</option>
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <input
        type="text"
        placeholder="Search by title or ref #"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="flex-1 min-w-[150px] rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
      />
    </div>
  );
}
