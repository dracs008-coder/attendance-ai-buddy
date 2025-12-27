import { useState } from "react";

export default function TechnicianProfilePage() {
  const [bio, setBio] = useState<string>("Experienced field technician specialising in network setups.");
  const [radius, setRadius] = useState<number>(15);

  return (
    <div className="space-y-6 max-w-xl">
      <h2 className="text-2xl font-bold">Profile</h2>

      <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="space-y-1">
          <label className="text-sm font-medium">Bio</label>
          <textarea value={bio} onChange={e=>setBio(e.target.value)} rows={4} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"/>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Service Radius (km)</label>
          <input type="number" value={radius} onChange={e=>setRadius(Number(e.target.value))} min={1} max={100} className="w-24 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"/>
        </div>
        <button className="mt-4 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">Save</button>
      </div>
    </div>
  );
}
