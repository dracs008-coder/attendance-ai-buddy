import React, { createContext, useContext, useState } from "react";

export type RequestStatus = "pending" | "accepted" | "in-progress" | "completed" | "cancelled";

export interface ServiceRequest {
  assignedTechnicianId?: string;
  id: string;
  title: string;
  total: number;
  status: RequestStatus;
  createdAt: string;
  images?: string[];
}

export interface Payment {
  id: string;
  amount: number;
  status: "paid" | "unpaid";
  createdAt: string;
}

interface CustomerContextValue {
  requests: ServiceRequest[];
  payments: Payment[];
  newRequest: (r: Omit<ServiceRequest, "id" | "createdAt" | "status">) => void;
  cancelRequest: (id: string) => void;
  payInvoice: (paymentId: string) => void;
}

const CustomerContext = createContext<CustomerContextValue | null>(null);

const mockRequests: ServiceRequest[] = [
  { id: "req-1", title: "Aircon cleaning", total: 1500, status: "pending", createdAt: new Date().toISOString(), assignedTechnicianId: "tech-1" },
  { id: "req-2", title: "Wiring inspection", total: 2500, status: "completed", createdAt: new Date().toISOString(), assignedTechnicianId: "tech-2" }
];

const mockPayments: Payment[] = [
  { id: "pay-1", amount: 2500, status: "paid", createdAt: new Date().toISOString() }
];

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [requests, setRequests] = useState<ServiceRequest[]>(mockRequests);
  const [payments, setPayments] = useState<Payment[]>(mockPayments);

  const newRequest = (r: Omit<ServiceRequest, "id" | "createdAt" | "status">) => {
    setRequests(prev => [
      { id: `req-${Date.now()}`, createdAt: new Date().toISOString(), status: "pending", ...r },
      ...prev
    ]);
  };

  const cancelRequest = (id: string) => setRequests(prev => prev.map(req => (req.id === id ? { ...req, status: "cancelled" } : req)));

  const payInvoice = (id: string) => setPayments(prev => prev.map(p => (p.id === id ? { ...p, status: "paid" } : p)));

  return (
    <CustomerContext.Provider value={{ requests, payments, newRequest, cancelRequest, payInvoice }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error("useCustomer must be inside CustomerProvider");
  return ctx;
}
