import React, { createContext, useContext, useEffect, useState } from "react";

export type NotificationType = "request" | "payment" | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  link: string;
  createdAt: string;
  read: boolean;
}

interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  addNotification: (n: Notification) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

const MOCK_NOTIFS: Notification[] = [
  {
    id: "1",
    type: "request",
    message: "New service request #REQ-1042 submitted.",
    link: "/dashboard/admin/requests",
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    read: false
  },
  {
    id: "2",
    type: "payment",
    message: "Invoice INV-874 paid successfully.",
    link: "/dashboard/admin/payments",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: false
  }
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFS);

  // Demo: every 30s push a mock system notification
  useEffect(() => {
    const id = setInterval(() => {
      const ts = Date.now();
      addNotification({
        id: String(ts),
        type: "system",
        message: "System maintenance scheduled at 2 AM.",
        link: "/dashboard/admin",
        createdAt: new Date(ts).toISOString(),
        read: false
      });
    }, 1000 * 60 * 5); // every 5 minutes
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markRead = (id: string) => setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const addNotification = (n: Notification) => setNotifications(prev => [n, ...prev]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markRead, markAllRead, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}
