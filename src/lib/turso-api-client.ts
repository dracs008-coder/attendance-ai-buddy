export interface MockAuthUser {
  id: string;
  name: string;
  email: string;
  role: "customer" | "technician" | "admin";
}

export interface MockAuthResponse {
  user?: MockAuthUser;
  error?: string | null;
}

const MOCK_USER: MockAuthUser = {
  id: "mock-user-id",
  name: "Demo User",
  email: "demo@example.com",
  role: "customer",
};

export const tursoApiClient = {
  async login(email: string, _password: string): Promise<MockAuthResponse> {
    // UI-only: simulate a successful login without real backend calls.
    return {
      user: { ...MOCK_USER, email },
      error: null,
    };
  },
  async register(email: string, _password: string, name: string): Promise<MockAuthResponse> {
    return {
      user: {
        ...MOCK_USER,
        email,
        name: name || MOCK_USER.name,
      },
      error: null,
    };
  },
};
