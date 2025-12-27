// UI-only mock query helpers for dashboards.
// These functions intentionally operate on in-memory demo data only.

export type HomeCarouselSlide = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

const HERO_SLIDES: HomeCarouselSlide[] = [
  {
    id: "hero-1",
    title: "Track every request in one place",
    description: "See what is pending, in progress, and completed at a glance.",
    imageUrl: "/dev.png",
  },
  {
    id: "hero-2",
    title: "Stay on top of technician visits",
    description: "Upcoming visits, notes, and follow-ups are always visible.",
    imageUrl: "/Tower.png",
  },
];

const REQUESTS = [
  {
    id: "req-1",
    title: "Laptop running slow",
    description: "Device overheating and apps freezing.",
    status: "in_progress",
    payment_status: "pending",
    preferred_date: new Date().toISOString(),
  },
  {
    id: "req-2",
    title: "Wi‑Fi dead spots at home",
    description: "Upstairs bedrooms lose signal every night.",
    status: "completed",
    payment_status: "paid",
    preferred_date: new Date().toISOString(),
  },
];

const PAYMENTS = [
  {
    id: "pay-1",
    request_id: "req-2",
    amount: 3490,
    status: "verified",
  },
];

const CATEGORIES = [
  { id: "cat-1", name: "Repairs" },
  { id: "cat-2", name: "Networking" },
];

const SERVICES = [
  {
    id: "svc-1",
    title: "Laptop diagnostics & tune-up",
    description: "Full health check, cleanup, and performance optimization.",
    purpose: "Performance & reliability",
    price: 2490,
    icon: "💻",
  },
  {
    id: "svc-2",
    title: "Home Wi‑Fi optimization",
    description: "Stronger coverage, faster speeds, and fewer dropouts.",
    purpose: "Networking",
    price: 1990,
    icon: "📶",
  },
];

const POSTS = [
  {
    id: "post-1",
    title: "How technicians triage urgent requests",
    content: "A behind-the-scenes look at how we prioritize your issues.",
    technician: { name: "Alex" },
    liked: false,
  },
  {
    id: "post-2",
    title: "Keeping your devices healthy between visits",
    content: "Simple weekly habits that prevent future problems.",
    technician: { name: "Mina" },
    liked: true,
  },
];

export async function getHomeCarouselSlides(): Promise<HomeCarouselSlide[]> {
  return HERO_SLIDES;
}

export async function getPosts(savedOnly?: boolean): Promise<any[]> {
  if (savedOnly) {
    return POSTS.filter(p => p.liked);
  }
  return POSTS;
}

export async function getRequests(_userId: string, _role: string): Promise<any[]> {
  return REQUESTS;
}

export async function getCategories(): Promise<any[]> {
  return CATEGORIES;
}

export async function getServices(): Promise<any[]> {
  return SERVICES;
}

export async function getPaymentsForRequest(requestId: string): Promise<any[]> {
  return PAYMENTS.filter(p => p.request_id === requestId);
}

export async function updateRequestStatus(_requestId: string, _status: string): Promise<void> {
  // UI-only: no-op. In a real app this would call the backend.
}

export async function createInquiryRequest(_payload: {
  topic: string;
  description: string;
}): Promise<{ id: string }> {
  // UI-only: return a fake request id for navigation.
  return { id: "inquiry-mock-id" };
}
