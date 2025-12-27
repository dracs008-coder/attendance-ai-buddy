import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import NotificationDropdown from "../components/common/NotificationDropdown";
import {
  BarChart2,
  Calendar,
  Clock,
  ShoppingBag,
  Settings as SettingsIcon,
  Layers,
  MessageSquare,
  Users,
  Cog,
  Home,
  ChevronsRight,
  ChevronDown,
  Bell,
  User
} from "lucide-react";

/**
 * AdminTechnicianLayout replicates the visual design from the shadcn
 * "dashboard-with-collapsible-sidebar" template while exposing a `children`
 * slot (via React-Router `Outlet`) so individual dashboard pages render inside.
 */
const links = [
  { name: "Overview", icon: BarChart2, to: "/dashboard/admin" },
  { name: "Attendance", icon: Calendar, to: "/dashboard/admin/attendance" },
  { name: "Requests", icon: Clock, to: "/dashboard/admin/requests" },
  { name: "Products", icon: ShoppingBag, to: "/dashboard/admin/products" },
  { name: "Services", icon: SettingsIcon, to: "/dashboard/admin/services" },
  { name: "Bundles", icon: Layers, to: "/dashboard/admin/bundles" },
  { name: "Posts", icon: MessageSquare, to: "/dashboard/admin/posts" },
  { name: "Technicians", icon: Users, to: "/dashboard/admin/technicians" },
  { name: "Customers", icon: Users, to: "/dashboard/admin/customers" },
  { name: "Payments", icon: Clock, to: "/dashboard/admin/payments" }
] as const;

type LinkItem = (typeof links)[number];

export default function AdminTechnicianLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* Main area */}
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Top-bar */}
          <Header />

          {/* Page body */}
          <main className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-950">
            {/* React-Router children */}
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- sub-components --------------------------- */

interface SidebarProps {
  open: boolean;
  setOpen(open: boolean): void;
}

function Sidebar({ open, setOpen }: SidebarProps) {
  const { pathname } = useLocation();
  return (
    <nav
      className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out ${open ? "w-64" : "w-16"} border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-sm flex flex-col`}
    >
      <TitleSection open={open} />

      <div className="space-y-1 flex-1 overflow-y-auto scrollbar-hide">
        {links.map(link => (
          <SidebarLink
            key={link.to}
            item={link}
            selected={
              link.to === "/dashboard/admin"
                ? pathname === "/dashboard/admin"
                : pathname.startsWith(link.to)
            }
            open={open}
            onSelect={() => {
              /* nothing needed – NavLink handles nav */
            }}
          />
        ))}
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </nav>
  );
}

interface SidebarLinkProps {
  item: LinkItem;
  selected: boolean;
  open: boolean;
  onSelect(): void;
}

function SidebarLink({ item, selected, open }: SidebarLinkProps) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.to === "/dashboard/admin"}
      className={({ isActive }) =>
        [
          "relative flex h-11 w-full items-center rounded-md transition-all duration-200",
          isActive || selected
            ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm border-l-2 border-blue-500"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
        ].join(" ")
      }
    >
      <div className="grid h-full w-12 place-content-center">
        <Icon className="h-4 w-4" />
      </div>
      {open && <span className="text-sm font-medium transition-opacity">{item.name}</span>}
    </NavLink>
  );
}

function TitleSection({ open }: { open: boolean }) {
  return (
    <div className="mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
      <div className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
        <div className="flex items-center gap-3">
          <Logo />
          {open && (
            <div className="transition-opacity duration-200">
              <div className="flex items-center gap-2">
                <div>
                  <span className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Admin
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">Technician</span>
                </div>
              </div>
            </div>
          )}
        </div>
        {open && <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <img
      src="/gigaease-logo.png"
      alt="GigaEase Logo"
      className="h-10 w-10 object-contain"
    />
  );
}

function ToggleClose({ open, setOpen }: { open: boolean; setOpen(open: boolean): void }) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="border-t border-gray-200 dark:border-gray-800 w-full transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      <div className="flex items-center p-3">
        <div className="grid size-10 place-content-center">
          <ChevronsRight
            className={`h-4 w-4 transition-transform duration-300 text-gray-500 dark:text-gray-400 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
        {open && <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Hide</span>}
      </div>
    </button>
  );
}

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();

  // close on outside click or route change
  React.useEffect(() => {
    function handle(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenu(false);
    }
    if (openMenu) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [openMenu]);

  React.useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-4 relative" ref={menuRef}>
        <NotificationDropdown />
        <button onClick={() => setOpenMenu(!openMenu)} className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          <User className="h-5 w-5" />
        </button>
        {openMenu && (
          <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <Link
              to="/dashboard/admin/settings"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setOpenMenu(false)}
            >
              Settings
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
