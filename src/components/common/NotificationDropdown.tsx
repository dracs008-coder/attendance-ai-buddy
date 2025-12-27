import { Bell, AlertTriangle, ClipboardList, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useNotifications, Notification } from "../../contexts/NotificationContext";
import { useState, useRef, useEffect } from "react";

function iconFor(n: Notification) {
  switch (n.type) {
    case "payment":
      return <DollarSign className="h-4 w-4 text-emerald-500" />;
    case "request":
      return <ClipboardList className="h-4 w-4 text-indigo-500" />;
    default:
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
  }
}

export default function NotificationDropdown() {
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(p => !p)}
        className="relative p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />}
      </button>

      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-80 max-h-[60vh] overflow-y-auto scrollbar-hide rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Notifications</span>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                Mark all as read
              </button>
            )}
          </div>

          {notifications.length === 0 && (
            <div className="p-6 text-center text-sm text-gray-500">You7re all caught up.</div>
          )}

          {notifications.map(n => (
            <Link
              key={n.id}
              to={n.link}
              onClick={() => {
                markRead(n.id);
                setOpen(false);
              }}
              className={`flex items-start gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                !n.read ? "bg-gray-50 dark:bg-gray-700/40" : ""
              }`}
            >
              <div className="pt-1">{iconFor(n)}</div>
              <div className="flex-1">
                <p className="text-gray-700 dark:text-gray-200">{n.message}</p>
                <span className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</span>
              </div>
            </Link>
          ))}

          {notifications.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 text-center">
              <Link
                to="/dashboard/admin/notifications"
                className="block px-4 py-2 text-sm text-primary hover:underline"
                onClick={() => setOpen(false)}
              >
                View all
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
