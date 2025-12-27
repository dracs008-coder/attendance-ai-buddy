import React, { createContext, useContext, useEffect, useState } from "react";

export type JobStatus = "open" | "active" | "scheduled" | "completed";

export interface Job {
  id: string;
  title: string;
  customer: string;
  payout: number;
  scheduledFor?: string; // ISO date
  status: JobStatus;
}

interface Earnings {
  week: number;
  month: number;
  year: number;
}

interface TechnicianContextValue {
  jobs: Job[];
  earnings: Earnings;
  acceptJob: (id: string) => void;
  completeJob: (id: string) => void;
}

const TechnicianContext = createContext<TechnicianContextValue | null>(null);

const mockJobs: Job[] = [
  {
    id: "job-1",
    title: "Install CCTV cameras",
    customer: "Acme Corp",
    payout: 120,
    status: "open"
  },
  {
    id: "job-2",
    title: "Repair Wi-Fi access point",
    customer: "John Smith",
    payout: 80,
    status: "active"
  },
  {
    id: "job-3",
    title: "Network audit",
    customer: "XYZ LLC",
    payout: 300,
    status: "scheduled",
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()
  }
];

export function TechnicianProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);

  const [earnings, setEarnings] = useState<Earnings>({ week: 240, month: 920, year: 12400 });

  const acceptJob = (id: string) =>
    setJobs(prev => prev.map(j => (j.id === id ? { ...j, status: "active" } : j)));

  const completeJob = (id: string) => {
    setJobs(prev => prev.map(j => (j.id === id ? { ...j, status: "completed" } : j)));
    const job = jobs.find(j => j.id === id);
    if (job) {
      setEarnings(prev => ({ ...prev, week: prev.week + job.payout, month: prev.month + job.payout, year: prev.year + job.payout }));
    }
  };

  // placeholder sync
  useEffect(() => {
    const id = setInterval(() => {
      // simulate new open job arrival
      const ts = Date.now();
      setJobs(prev => [
        {
          id: `job-${ts}`,
          title: "Replace router firmware",
          customer: "QuickMart",
          payout: 95,
          status: "open"
        },
        ...prev
      ]);
    }, 1000 * 60 * 10);
    return () => clearInterval(id);
  }, []);

  return (
    <TechnicianContext.Provider value={{ jobs, earnings, acceptJob, completeJob }}>
      {children}
    </TechnicianContext.Provider>
  );
}

export function useTechnician() {
  const ctx = useContext(TechnicianContext);
  if (!ctx) throw new Error("useTechnician must be used inside TechnicianProvider");
  return ctx;
}
