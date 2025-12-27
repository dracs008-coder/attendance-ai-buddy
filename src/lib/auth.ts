import { useMemo } from "react";

export type UserRole = "customer" | "technician" | "admin";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

const MOCK_CUSTOMER: MockUser = {
  id: "mock-customer-id",
  name: "Jane Customer",
  email: "customer@example.com",
  role: "customer",
};

const MOCK_TECHNICIAN: MockUser = {
  id: "mock-technician-id",
  name: "Tom Technician",
  email: "technician@example.com",
  role: "technician",
};

const MOCK_ADMIN: MockUser = {
  id: "mock-admin-id",
  name: "Admin Technician",
  email: "admin@example.com",
  role: "admin",
};

function getMockUserForLocation(): MockUser {
  if (typeof window === "undefined") {
    return MOCK_CUSTOMER;
  }
  const pathname = window.location.pathname;
  if (pathname.includes("/dashboard/technician")) return MOCK_TECHNICIAN;
  if (pathname.includes("/dashboard/admin")) return MOCK_ADMIN;
  return MOCK_CUSTOMER;
}

export function useRequireAuth() {
  const user = useMemo<MockUser>(() => getMockUserForLocation(), []);
  return { user, loading: false };
}

export function useAuth() {
  const user = useMemo<MockUser>(() => getMockUserForLocation(), []);
  return { user, loading: false };
}

export function useRedirectIfAuthenticated() {
  // UI-only: no automatic redirects based on real auth state.
  return { loading: false };
}

export function getDashboardPathForUser(user: { role?: string } | null | undefined): string {
  if (!user?.role) return "/dashboard/customer";
  return getDashboardPath(String(user.role));
}

export function getDashboardPath(role: string): string {
  switch (role) {
    case "technician":
      return "/dashboard/technician";
    case "admin":
    case "admin-technician":
      return "/dashboard/admin";
    case "customer":
    default:
      return "/dashboard/customer";
  }
}
