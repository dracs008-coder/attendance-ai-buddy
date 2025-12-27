import React, { createContext, useContext, useReducer } from 'react';

export interface TechnicianProfile {
  id: string;
  name: string;
  role: 'admin_technician' | 'technician';
  specialty?: string;
}

export interface TechnicianApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  skill: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'deleted';
}

interface TechniciansDirectoryValue {
  technicians: TechnicianProfile[];
  applications: TechnicianApplication[];
  accept: (id: string) => void;
  remove: (id: string) => void;
}

const TechniciansDirectoryContext = createContext<TechniciansDirectoryValue | null>(null);

const mockTechs: TechnicianProfile[] = [
  { id: 'tech-admin-1', name: 'Alex Reyes', role: 'admin_technician', specialty: 'HVAC' },
  { id: 'tech-1', name: 'Brian Cruz', role: 'technician', specialty: 'Electrical' },
  { id: 'tech-2', name: 'Carla Gomez', role: 'technician', specialty: 'Plumbing' },
];

const mockApplications: TechnicianApplication[] = [
  { id: 'app-1', name: 'Luis Perez', email: 'luis@example.com', phone: '09171234567', skill: 'HVAC', submittedAt: '2025-12-26', status: 'pending' },
  { id: 'app-2', name: 'Maria Santos', email: 'maria@example.com', phone: '09181234567', skill: 'Electrical', submittedAt: '2025-12-27', status: 'pending' },
];

type AppAction = { type: 'ACCEPT' | 'DELETE'; id: string };

const reducer: React.Reducer<TechnicianApplication[], AppAction> = (state, action) => {
  switch (action.type) {
    case 'ACCEPT':
      return state.map(a => (a.id === action.id ? { ...a, status: 'approved' } : a));
    case 'DELETE':
      return state.map(a => (a.id === action.id ? { ...a, status: 'deleted' } : a));
    default:
      return state;
  }
}

export function TechniciansDirectoryProvider({ children }: { children: React.ReactNode }) {
  const [applications, dispatch] = useReducer(reducer, mockApplications);

  const accept = (id: string) => dispatch({ type: 'ACCEPT', id });
  const remove = (id: string) => dispatch({ type: 'DELETE', id });

  return (
    <TechniciansDirectoryContext.Provider value={{ technicians: mockTechs, applications, accept, remove }}>
      {children}
    </TechniciansDirectoryContext.Provider>
  );
}

export function useTechniciansDirectory() {
  const ctx = useContext(TechniciansDirectoryContext);
  if (!ctx) throw new Error('useTechniciansDirectory must be used inside provider');
  return ctx;
}
