// UI-only mock data helpers for the homepage.
// These intentionally do NOT call any backend APIs.

export type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  category?: { name: string };
  icon?: string;
};

export type Bundle = {
  id: string;
  title: string;
  description: string;
  price: number;
  level: "Basic" | "Standard" | "Advanced" | "Premium";
  includedServices?: string[];
  category?: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  stock?: number;
  featured?: boolean;
  category?: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  technician?: { name: string };
};

const SERVICES: Service[] = [
  {
    id: "svc-1",
    title: "Laptop diagnostics & tune-up",
    description: "Full health check, cleanup, and performance optimization.",
    price: 2490,
    category: { name: "Repairs" },
    icon: "💻",
  },
  {
    id: "svc-2",
    title: "Smartphone screen repair",
    description: "Cracked or unresponsive screens replaced with quality parts.",
    price: 3490,
    category: { name: "Repairs" },
    icon: "📱",
  },
  {
    id: "svc-3",
    title: "Home Wi‑Fi optimization",
    description: "Stronger coverage, faster speeds, and fewer dropouts.",
    price: 1990,
    category: { name: "Networking" },
    icon: "📶",
  },
  {
    id: "svc-4",
    title: "Business IT support retainer",
    description: "Proactive monitoring and on-call tech support for teams.",
    price: 7990,
    category: { name: "Business" },
    icon: "🏢",
  },
  {
    id: "svc-5",
    title: "Website landing page design",
    description: "Eye-catching single-page site built for conversions.",
    price: 4990,
    category: { name: "Website" },
    icon: "🌐",
  },
  {
    id: "svc-6",
    title: "Full-stack web app development",
    description: "From UI to backend, scalable web solution tailored to your needs.",
    price: 15990,
    category: { name: "Website" },
    icon: "🕸️",
  }
];

const BUNDLES: Bundle[] = [
  {
    id: "bundle-1",
    title: "Home Essentials Bundle",
    description: "Tune-up + Wi‑Fi optimization + basic backup setup.",
    price: 4990,
    level: "Standard",
    includedServices: [
      "Laptop diagnostics & tune-up",
      "Home Wi‑Fi optimization",
      "Backup configuration",
    ],
    category: "Home",
  },
  {
    id: "bundle-2",
    title: "Startup Launch Bundle",
    description: "Device setup, basic website, and launch-day support.",
    price: 12990,
    level: "Premium",
    includedServices: [
      "Device provisioning",
      "Landing page build",
      "On-call launch support",
    ],
    category: "Business",
  },
];

const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "USB‑C Hub (7‑in‑1)",
    description: "Expand your laptop with HDMI, USB‑A, SD, and more.",
    price: 2490,
    image_url: "/Technician.png",
    stock: 8,
    featured: true,
    category: "Accessories",
  },
  {
    id: "prod-2",
    name: "Mesh Wi‑Fi router",
    description: "Strong, reliable whole‑home coverage.",
    price: 5990,
    image_url: "/Tower.png",
    stock: 3,
    featured: true,
    category: "Networking",
  },
];

const POSTS: Post[] = [
  {
    id: "post-1",
    title: "How to prepare your laptop before a repair",
    content:
      "Simple steps to back up data and avoid surprises on repair day.",
    technician: { name: "Alex (GigaEase Technician)" },
  },
  {
    id: "post-2",
    title: "3 signs your Wi‑Fi needs an upgrade",
    content:
      "Intermittent drops, dead spots, and slow video calls are key signals.",
    technician: { name: "Mina (Network Specialist)" },
  },
];

export async function getServicesServer(): Promise<Service[]> {
  return SERVICES;
}

export async function getBundlesServer(): Promise<Bundle[]> {
  return BUNDLES;
}

export async function getProductsServer(): Promise<Product[]> {
  return PRODUCTS.filter(p => p.featured);
}

export async function getPostsServer(): Promise<Post[]> {
  return POSTS;
}
