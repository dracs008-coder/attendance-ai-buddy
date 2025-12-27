import { Switch } from "@headlessui/react";
import { useState } from "react";
import { useSettings } from "../../contexts/SettingsContext";

export default function SettingsPage() {
  const { settings, setSetting } = useSettings();
  // local states for notification toggles (not yet persisted)
  const [emailNotif, setEmailNotif] = useState<boolean>(true);
  const [smsNotif, setSmsNotif] = useState<boolean>(false);

  const { maxServices, maxBundles, maxPosts } = settings;

  return (
    <div className="space-y-10 max-w-3xl">
      <h2 className="text-2xl font-bold">Settings</h2>

      {/* General */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">General</h3>
        <div className="rounded-lg border bg-white dark:bg-gray-900 p-6 space-y-4 dark:border-gray-800">
          <div className="grid gap-2">
            <label htmlFor="company" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Company name
            </label>
            <input
              id="company"
              type="text"
              defaultValue="GigaEase"
              className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Maintenance mode</span>
            <Switch
              checked={settings.maintenance}
              onChange={(v:boolean)=>setSetting("maintenance",v)}
              className={`${settings.maintenance ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-700"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${settings.maintenance ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>
      </section>

      {/* Homepage */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Homepage</h3>
        <div className="rounded-lg border bg-white dark:bg-gray-900 p-6 space-y-6 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Show footer</span>
            <Switch
              checked={settings.showFooter}
              onChange={(v:boolean)=>setSetting("showFooter",v)}
              className={`${settings.showFooter ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-700"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${settings.showFooter ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Hero sections</p>
            {[
              ["Robot intro", settings.heroRobot, (v:boolean)=>setSetting("heroRobot",v)],
              ["Value proposition", settings.heroValueProp, (v:boolean)=>setSetting("heroValueProp",v)],
              ["Testimonials", settings.heroTestimonials, (v:boolean)=>setSetting("heroTestimonials",v)],
              ["News", settings.heroNews, (v:boolean)=>setSetting("heroNews",v)],
            ].map(([label, state, setter]) => (
              <div key={label as string} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">{label as string}</span>
                <Switch
                  checked={state as boolean}
                  onChange={setter as (v: boolean) => void}
                  className={`${(state as boolean) ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-700"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                >
                  <span
                    className={`${(state as boolean) ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max services</label>
              <input
                type="number"
                value={maxServices}
                onChange={(e) => setSetting("maxServices", Number(e.target.value))}
                min={1}
                max={10}
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max bundles</label>
              <input
                type="number"
                value={maxBundles}
                onChange={(e) => setSetting("maxBundles", Number(e.target.value))}
                min={1}
                max={10}
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max posts</label>
              <input
                type="number"
                value={maxPosts}
                onChange={(e) => setSetting("maxPosts", Number(e.target.value))}
                min={1}
                max={10}
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Payments */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Payments</h3>
        <div className="rounded-lg border bg-white dark:bg-gray-900 p-6 space-y-4 dark:border-gray-800">
          <div className="grid gap-2 max-w-xs">
            <label htmlFor="currency" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Default currency
            </label>
            <select
              id="currency"
              defaultValue="USD"
              className="rounded-md border border-gray-300 bg-white py-2 px-2 text-sm focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="USD">USD</option>
              <option value="PHP">PHP</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div className="grid gap-2 max-w-xs">
            <label htmlFor="tax" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tax rate (%)
            </label>
            <input
              id="tax"
              type="number"
              defaultValue={12}
              className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <div className="rounded-lg border bg-white dark:bg-gray-900 p-6 space-y-4 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Email alerts</span>
            <Switch
              checked={settings.heroNews /* placeholder use notifications? keep True*/}
              onChange={()=>{}}
              className={`${emailNotif ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-700"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${emailNotif ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">SMS alerts</span>
            <Switch
              checked={settings.heroRobot /*placeholder*/}
              onChange={()=>{}}
              className={`${smsNotif ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-700"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${smsNotif ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>
      </section>
    </div>
  );
}
