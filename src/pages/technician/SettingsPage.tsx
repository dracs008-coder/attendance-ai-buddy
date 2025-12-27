import { Switch } from "@headlessui/react";
import { useState } from "react";

export default function TechnicianSettingsPage() {
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (
    <div className="space-y-6 max-w-lg">
      <h2 className="text-2xl font-bold">Settings</h2>

      <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <ToggleRow label="Auto-dispatch new jobs" state={autoDispatch} setState={setAutoDispatch} />
        <ToggleRow label="SMS alerts" state={smsAlerts} setState={setSmsAlerts} />
        <button className="mt-2 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">Save</button>
      </div>
    </div>
  );
}

function ToggleRow({ label, state, setState }: { label: string; state: boolean; setState(v: boolean): void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      <Switch
        checked={state}
        onChange={setState}
        className={`${state ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-700"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
      >
        <span className={`${state ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
      </Switch>
    </div>
  );
}
