import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import NotificationDropdown from "../components/common/NotificationDropdown";
import {
  BarChart2,
  PlusSquare,
  CreditCard,
  MessageCircle,
  User,
  Cog,
  ClipboardList,
  ChevronDown,
  ChevronsRight,
  Bell,
  Star
} from "lucide-react";

const links = [
  { name: "Overview", icon: BarChart2, to: "/dashboard/customer" },
  { name: "My Requests", icon: ClipboardList, to: "/dashboard/customer/requests" },
  { name: "New Request", icon: PlusSquare, to: "/dashboard/customer/new-request" },
  { name: "Payments", icon: CreditCard, to: "/dashboard/customer/payments" },
  { name: "Messages", icon: MessageCircle, to: "/dashboard/customer/messages" },
  { name: "Testimonials", icon: Star, to: "/dashboard/customer/testimonials" },
  { name: "Profile", icon: User, to: "/dashboard/customer/profile" },
] as const;

type LinkItem = (typeof links)[number];

export default function CustomerDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-auto bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
interface SidebarProps { open: boolean; setOpen(v:boolean):void }
function Sidebar({ open, setOpen }: SidebarProps) {
  const { pathname } = useLocation();
  return (
    <nav className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ${open ? "w-64" : "w-16"} border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-sm`}>
      <TitleSection open={open} />
      <div className="space-y-1 flex-1 overflow-y-auto scrollbar-hide">
        {links.map(item => (
          <SidebarLink key={item.to} item={item} selected={pathname.startsWith(item.to)} open={open} />
        ))}
      </div>
      <ToggleClose open={open} setOpen={setOpen} />
    </nav>
  );
}

interface SidebarLinkProps { item: LinkItem; selected: boolean; open: boolean }
function SidebarLink({ item, selected, open }: SidebarLinkProps) {
  const Icon = item.icon;
  return (
    <NavLink to={item.to} end={item.to === "/dashboard/customer"}
      className={({ isActive }) => [
        "relative flex h-11 w-full items-center rounded-md transition-all duration-200",
        isActive || selected ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm border-l-2 border-blue-500" :"text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
      ].join(" ")}
    >
      <div className="grid h-full w-12 place-content-center"><Icon className="h-4 w-4"/></div>
      {open && <span className="text-sm font-medium">{item.name}</span>}
    </NavLink>
  );
}

function TitleSection({ open }:{open:boolean}) {
  return (
    <div className="mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
      <div className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
        <div className="flex items-center gap-3">
          <img src="/gigaease-logo.png" alt="GigaEase Logo" className="h-10 w-10 object-contain" />
          {open && (
            <div className="transition-opacity duration-200">
              <span className="block text-sm font-semibold">GigaEase</span>
              <span className="block text-xs text-gray-500">Customer</span>
            </div>
          )}
        </div>
        {open && <ChevronDown className="h-4 w-4 text-gray-400"/>}
      </div>
    </div>
  );
}

function ToggleClose({ open, setOpen }:{open:boolean; setOpen(v:boolean):void}) {
  return (
    <button onClick={()=>setOpen(!open)} className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
      <div className="flex items-center p-3">
        <div className="grid size-10 place-content-center">
          <ChevronsRight className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
        {open && <span className="text-sm font-medium text-gray-600">Hide</span>}
      </div>
    </button>
  );
}

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  React.useEffect(() => {
    function handle(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenu(false);
    }
    if (openMenu) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [openMenu]);
  React.useEffect(() => setOpenMenu(false), [pathname]);
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-4 relative" ref={menuRef}>
        <NotificationDropdown />
        <button onClick={()=>setOpenMenu(!openMenu)} className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"><User className="h-5 w-5"/></button>
        {openMenu && (
          <div className="absolute right-0 top-full mt-2 w-44 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
            <NavLink to="/dashboard/customer/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={()=>setOpenMenu(false)}>Settings</NavLink>
          </div>
        )}
      </div>
    </header>
  );
}
