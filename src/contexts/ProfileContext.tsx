import React, { createContext, useContext } from "react";

export interface UserProfile {
  id: string;
  name: string;
  role: "customer" | "technician" | "admin";
  avatarUrl?: string;
}

interface ProfileContextValue {
  currentUser: UserProfile;
  getUser: (id: string) => UserProfile | undefined;
}

const mockProfiles: Record<string, UserProfile> = {
  "cust-1": { id: "cust-1", name: "Jane Smith", role: "customer", avatarUrl: "/Default Image.jpg" },
  "tech-1": { id: "tech-1", name: "Mark Tech", role: "technician", avatarUrl: "/Default Image.jpg" },
  "admin-1": { id: "admin-1", name: "Admin One", role: "admin", avatarUrl: "/Default Image.jpg" }
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children, userId = "cust-1" }: { children: React.ReactNode; userId?: string }) {
  const currentUser = mockProfiles[userId];
  const getUser = (id: string) => mockProfiles[id];
  return <ProfileContext.Provider value={{ currentUser, getUser }}>{children}</ProfileContext.Provider>;
}

export function useProfiles() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfiles must be used within ProfileProvider");
  return ctx;
}
