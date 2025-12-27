import { useState } from 'react';
import { useTechniciansDirectory } from '../../contexts/TechniciansDirectoryContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCustomer } from '../../contexts/CustomerContext';

export default function NewRequestPage() {
  const { newRequest } = useCustomer();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [schedule, setSchedule] = useState('');
  const [technicianId, setTechnicianId] = useState('');

  const { technicians } = useTechniciansDirectory();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const removeImage = (idx: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== idx));
    setImageFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    setImageFiles(prev => [...prev, ...arr]);
    Promise.all(
      arr.map(
        f =>
          new Promise<string>(res => {
            const reader = new FileReader();
            reader.onload = e => res(e.target?.result as string);
            reader.readAsDataURL(f);
          })
      )
    ).then(urls => setPreviews(prev => [...prev, ...urls]));
  };
  const [submitting, setSubmitting] = useState(false);

  const valid = title.trim().length >= 5 && description.trim().length >= 20 && category && technicianId;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);
    newRequest({ title, total: 0, assignedTechnicianId: technicianId, images: previews }); // total will be estimated later
    toast.success('Request sent – awaiting review');
    navigate('/dashboard/customer');
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/customer" className="text-sm text-gray-500 hover:underline">← Back</Link>
        <h2 className="text-2xl font-semibold">New Request</h2>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="cleaning">Cleaning</option>
              <option value="repair">Repair</option>
              <option value="inspection">Inspection</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              minLength={5}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
              placeholder="Brief job title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              minLength={20}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
              rows={4}
              placeholder="Describe the service needed in detail"
            />
          </div>

          {/* Technician */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Technician</label>
            <select
              value={technicianId}
              onChange={e => setTechnicianId(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
            >
              <option value="" disabled>
                Choose technician
              </option>
              {technicians.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} {t.role === 'admin_technician' ? '(Admin Technician)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images (optional)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={e => handleFiles(e.target.files)}
              className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:px-3 file:py-1 file:text-sm file:font-medium file:hover:bg-gray-100"
            />
            {previews.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {previews.map((src, idx) => (
                  <div key={src} className="relative group">
                  <img src={src} alt="preview" className="h-24 w-full object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 hidden group-hover:block rounded-full bg-white/80 px-1 text-xs font-bold text-gray-700"
                    aria-label="Remove image"
                  >×</button>
                </div>
                ))}
              </div>
            )}
          </div>

          {/* Preferred schedule */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Schedule (optional)</label>
            <input
              type="datetime-local"
              value={schedule}
              onChange={e => setSchedule(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!valid || submitting}
            className="w-full rounded-lg bg-primary-600 py-2 text-white font-medium disabled:opacity-50"
          >
            {submitting ? 'Submitting…' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
