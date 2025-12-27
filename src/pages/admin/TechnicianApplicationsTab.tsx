import { Check, Trash2 } from 'lucide-react';
import { useTechniciansDirectory } from '../../contexts/TechniciansDirectoryContext';
import toast from 'react-hot-toast';

export default function TechnicianApplicationsTab() {
  const { applications, accept, remove } = useTechniciansDirectory();
  const pending = applications.filter(a => a.status === 'pending');

  if (!pending.length) {
    return <p className="text-sm text-gray-500">No pending applications.</p>;
  }

  const onAccept = (id: string) => {
    accept(id);
    toast.success('Application approved');
  };
  const onDelete = (id: string) => {
    remove(id);
    toast.success('Application deleted');
  };

  return (
    <div className="overflow-x-auto rounded-lg border dark:border-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Name</th>
            <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Email</th>
            <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Skill</th>
            <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Submitted</th>
            <th className="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
          {pending.map(app => (
            <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <td className="px-4 py-2 whitespace-nowrap font-medium text-primary-600 dark:text-primary-400">{app.name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{app.email}</td>
              <td className="px-4 py-2 whitespace-nowrap">{app.skill}</td>
              <td className="px-4 py-2 whitespace-nowrap">{app.submittedAt}</td>
              <td className="px-4 py-2 whitespace-nowrap text-right space-x-2">
                <button
                  onClick={() => onAccept(app.id)}
                  className="inline-flex items-center rounded-full bg-green-100 p-2 text-green-700 hover:bg-green-200"
                  aria-label="Accept"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(app.id)}
                  className="inline-flex items-center rounded-full bg-red-100 p-2 text-red-700 hover:bg-red-200"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
