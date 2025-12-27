// Centralized transaction data types and mock data for UI simulation

export type TransactionStatus = 
  | "draft" 
  | "submitted" 
  | "awaiting_technician" 
  | "assigned" 
  | "on_the_way" 
  | "in_progress" 
  | "completed" 
  | "paid" 
  | "cancelled";

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  technicianId?: string;
  technicianName?: string;
  technicianPhone?: string;
  technicianAvatar?: string;
  serviceCategory: "smartphone" | "computer" | "website" | "bundle";
  serviceTitle: string;
  serviceDescription: string;
  scheduledDate: string;
  scheduledTime: string;
  estimatedPrice: number;
  finalPrice?: number;
  status: TransactionStatus;
  notes?: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  status: TransactionStatus;
  timestamp: string;
  description: string;
  actor: "customer" | "technician" | "admin" | "system";
}

export interface ServiceOption {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: "smartphone" | "computer" | "website" | "bundle";
  popular?: boolean;
}

export const serviceOptions: ServiceOption[] = [
  // Smartphone & Computer Services
  { id: "s1", title: "Screen Replacement", description: "Replace cracked or damaged screen", price: 2500, duration: "1-2 hours", category: "smartphone", popular: true },
  { id: "s2", title: "Battery Replacement", description: "Replace worn out battery", price: 1200, duration: "30 mins", category: "smartphone" },
  { id: "s3", title: "Data Recovery", description: "Recover lost or deleted data", price: 3000, duration: "2-4 hours", category: "computer" },
  { id: "s4", title: "Virus Removal", description: "Remove malware and viruses", price: 1500, duration: "1-2 hours", category: "computer", popular: true },
  { id: "s5", title: "OS Installation", description: "Fresh operating system install", price: 2000, duration: "2-3 hours", category: "computer" },
  { id: "s6", title: "Hardware Upgrade", description: "RAM, SSD, or GPU upgrade", price: 1800, duration: "1-2 hours", category: "computer" },
  
  // Website Development
  { id: "w1", title: "Landing Page", description: "Single page website design", price: 15000, duration: "3-5 days", category: "website", popular: true },
  { id: "w2", title: "E-commerce Site", description: "Full online store setup", price: 45000, duration: "2-3 weeks", category: "website" },
  { id: "w3", title: "WordPress Setup", description: "WordPress installation & theme", price: 8000, duration: "2-3 days", category: "website" },
  { id: "w4", title: "SEO Optimization", description: "Search engine optimization", price: 12000, duration: "1 week", category: "website" },
  
  // Bundles
  { id: "b1", title: "Complete PC Tune-up", description: "Virus removal + cleanup + optimization", price: 3500, duration: "3-4 hours", category: "bundle", popular: true },
  { id: "b2", title: "Phone Care Package", description: "Screen protector + case + cleaning", price: 800, duration: "30 mins", category: "bundle" },
];

export const mockTransactions: Transaction[] = [
  {
    id: "txn-001",
    customerId: "cust-1",
    customerName: "Maria Santos",
    customerEmail: "maria@example.com",
    customerPhone: "+63 912 345 6789",
    technicianId: "tech-1",
    technicianName: "Juan Dela Cruz",
    technicianPhone: "+63 917 123 4567",
    technicianAvatar: "/Technician.png",
    serviceCategory: "smartphone",
    serviceTitle: "Screen Replacement",
    serviceDescription: "iPhone 14 Pro Max screen replacement due to crack",
    scheduledDate: "2025-12-28",
    scheduledTime: "10:00",
    estimatedPrice: 2500,
    finalPrice: 2500,
    status: "in_progress",
    notes: "Customer requested morning appointment",
    createdAt: "2025-12-27T08:00:00Z",
    updatedAt: "2025-12-27T10:30:00Z",
    timeline: [
      { id: "t1", status: "submitted", timestamp: "2025-12-27T08:00:00Z", description: "Request submitted", actor: "customer" },
      { id: "t2", status: "assigned", timestamp: "2025-12-27T08:30:00Z", description: "Assigned to Juan Dela Cruz", actor: "admin" },
      { id: "t3", status: "on_the_way", timestamp: "2025-12-27T09:30:00Z", description: "Technician on the way", actor: "technician" },
      { id: "t4", status: "in_progress", timestamp: "2025-12-27T10:00:00Z", description: "Work started", actor: "technician" },
    ]
  },
  {
    id: "txn-002",
    customerId: "cust-2",
    customerName: "Pedro Garcia",
    customerEmail: "pedro@example.com",
    customerPhone: "+63 918 765 4321",
    serviceCategory: "computer",
    serviceTitle: "Virus Removal",
    serviceDescription: "Laptop has been running slow, suspected malware",
    scheduledDate: "2025-12-28",
    scheduledTime: "14:00",
    estimatedPrice: 1500,
    status: "awaiting_technician",
    createdAt: "2025-12-27T09:00:00Z",
    updatedAt: "2025-12-27T09:00:00Z",
    timeline: [
      { id: "t1", status: "submitted", timestamp: "2025-12-27T09:00:00Z", description: "Request submitted", actor: "customer" },
    ]
  },
  {
    id: "txn-003",
    customerId: "cust-3",
    customerName: "Ana Reyes",
    customerEmail: "ana@example.com",
    customerPhone: "+63 919 876 5432",
    technicianId: "tech-2",
    technicianName: "Carlos Mendoza",
    technicianPhone: "+63 916 234 5678",
    serviceCategory: "website",
    serviceTitle: "Landing Page",
    serviceDescription: "Business landing page for bakery shop",
    scheduledDate: "2025-12-30",
    scheduledTime: "09:00",
    estimatedPrice: 15000,
    finalPrice: 15000,
    status: "completed",
    createdAt: "2025-12-20T08:00:00Z",
    updatedAt: "2025-12-26T16:00:00Z",
    timeline: [
      { id: "t1", status: "submitted", timestamp: "2025-12-20T08:00:00Z", description: "Request submitted", actor: "customer" },
      { id: "t2", status: "assigned", timestamp: "2025-12-20T09:00:00Z", description: "Assigned to Carlos Mendoza", actor: "admin" },
      { id: "t3", status: "in_progress", timestamp: "2025-12-21T09:00:00Z", description: "Development started", actor: "technician" },
      { id: "t4", status: "completed", timestamp: "2025-12-26T16:00:00Z", description: "Project completed", actor: "technician" },
    ]
  },
];

export const statusLabels: Record<TransactionStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  awaiting_technician: "Awaiting Technician",
  assigned: "Assigned",
  on_the_way: "On the Way",
  in_progress: "In Progress",
  completed: "Completed",
  paid: "Paid",
  cancelled: "Cancelled",
};

export const statusColors: Record<TransactionStatus, { bg: string; text: string; border: string }> = {
  draft: { bg: "bg-muted", text: "text-muted-foreground", border: "border-muted" },
  submitted: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  awaiting_technician: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  assigned: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  on_the_way: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  in_progress: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
  completed: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  paid: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  cancelled: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
};
