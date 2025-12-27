# UI/UX Design Analysis Template

This document serves as a **working template** for systematically analysing every public-facing page in the application.  Replace the bracketed guidance with concrete observations as you review each screen.

---

## 0. Global Heuristics Checklist
- **Consistency** – [Are colours, typography, spacing, and component behaviour consistent across pages?]
- **Feedback & Visibility of System Status** – [Does the UI promptly inform users about ongoing processes?]
- **Error Prevention & Recovery** – [How are errors surfaced, and can users easily recover?]
- **Accessibility** – [Colour-contrast ratios, keyboard navigation, ARIA labels, focus outlines, motion reduction, etc.]
- **Performance** – [Initial load time, perceived latency, asset sizes, lazy loading.]
- **Mobile-first Responsiveness** – [Breakpoint behaviour, touch targets, scrolling, viewport meta correct?]
- **Codebase Mapping** – [Route definitions, component file paths, state management containers.]
- **Design Debt** – [Areas where current implementation deviates from design system or best practices.]

---

## 1. Homepage (`/`)

### 1.1 Purpose
[High-level goal of the page; first-time visitor impression.]

### 1.2 Target Users
[Primary personas or roles.]

### 1.3 Key Actions / Calls-to-Action
[List primary & secondary CTAs with their hierarchy.]

### 1.4 Layout & Content Structure
- Hero section
- Feature highlights
- Social proof / testimonials
- Footer

### 1.5 UI Components
[List components (e.g. Navbar, HeroBanner, FeatureCard…) and their props/state.]

### 1.6 UX Flow
[Typical user journey starting from landing to next meaningful step.]

### 1.7 Accessibility Review
[Heading order, alt text, aria-labels, colour contrast.]

### 1.8 Visual Style & Branding
[Use of brand colours, imagery, iconography, typography scale.]

### 1.9 Interaction & Motion
[Hover states, scroll animations, transitions.]

### 1.10 Pain Points & Suggestions
[Concrete issues + actionable improvements.]

### 1.11 Code Implementation Details
- **Route Path**: `/`
- **Primary Component Files**: `src/...`
- **State / Context Providers**: [...]
- **API Dependencies**: [...]
- **Used Hooks / Libraries**: [...]
- **Current Status**: [Not started | In progress | Complete]
- **Tech Debt / TODOs**: [...]

### 1.12 Analytics & Metrics
[Relevant KPIs and how they are captured (e.g. GA events).]

### 1.13 QA Checklist
[Test cases, edge cases, browser/device coverage.]

### 1.14 Open Questions
[Outstanding decisions, required assets, blocked items.]

### 1.15 Data Model & API Contracts
- **Primary DTO / Interface**: [`Request`, `UserProfile`, …]
- **API Endpoints**: `GET /api/...`, `POST /api/...`
- **GraphQL Query** (if applicable): `getHomepageStats`.

### 1.16 UI States
- **Loading**: Skeleton components? Spinners? ARIA `aria-busy`?  
- **Empty**: Illustrations + guidance?  
- **Error**: Alert banners, retry button, logging.

### 1.17 Responsive Behaviour
| Breakpoint | Differences |
|------------|------------|
| `sm` | Navbar collapses into hamburger |
| `md` | Two-column layout switches to single |
| … | … |

### 1.18 Performance Benchmarks
| Metric | Target | Actual |
|--------|--------|--------|
| First Contentful Paint | <2.0s | — |
| Largest Contentful Paint | <2.5s | — |
| JS Bundle | <150kB | — |

### 1.19 Accessibility Conformance (WCAG 2.2)
- Colour contrast ratio ≥ 4.5:1  
- Focus ring visible for keyboard nav  
- Page landmarks tagged  
- Live regions for dynamic updates  

### 1.20 Test Scenarios
- **Unit**: component renders correct title.  
- **Integration**: clicking CTA navigates to `/auth/...`.  
- **E2E (Cypress/Playwright)**: full happy path checkout.

---

## 2. Authentication Pages (Multi-Role)

### 2.1 Customer Sign-In (`/auth/customer/sign-in`)
[Follow sub-sections 2.1.1 – 2.1.20 identical to Homepage template.]

### 2.2 Customer Sign-Up (`/auth/customer/sign-up`)

### 2.3 Technician Sign-In (`/auth/technician/sign-in`)

### 2.4 Technician Sign-Up (`/auth/technician/sign-up`)

### 2.5 Admin Sign-In (`/auth/admin/sign-in`)

### 2.6 Reset Password (`/auth/reset-password`)

> **Temporary Dev Note:** As per project rules, auth pages currently do **not** gate any route or auto-redirect after auth. Confirm UI reflects this. Each role-specific auth screen should clearly communicate the role context to avoid confusion.

---

## 3. Dashboards

### 3.1 Admin Dashboard (`/dashboard/admin`)
- **Overview** `/dashboard/admin` – High-level KPIs, quick actions.
- **Attendance** `/dashboard/admin/attendance`
- **Requests** `/dashboard/admin/requests`
- **Products** `/dashboard/admin/products`
- **Services** `/dashboard/admin/services`
- **Bundles** `/dashboard/admin/bundles`
- **Posts** `/dashboard/admin/posts`
- **Technicians** `/dashboard/admin/technicians`
- **Customers** `/dashboard/admin/customers`
- **Payments** `/dashboard/admin/payments`
- **Settings** `/dashboard/admin/settings`

### 3.2 Customer Dashboard (`/dashboard/customer`)
- **Overview** `/dashboard/customer` – Upcoming service schedule, request stats.
- **My Requests** `/dashboard/customer/requests`
  - **Detail** `/dashboard/customer/requests/:requestId`
- **New Request** `/dashboard/customer/new-request`
- **Payments** `/dashboard/customer/payments`
- **Testimonials** `/dashboard/customer/testimonials`
- **Messages** `/dashboard/customer/messages`
- **Profile** `/dashboard/customer/profile`
- **Settings** `/dashboard/customer/settings`

### 3.3 Technician Dashboard (`/dashboard/technician`)
- **Overview** `/dashboard/technician`
- **Job Board** `/dashboard/technician/job-board`
- **My Jobs** `/dashboard/technician/my-jobs`
  - **Detail** `/dashboard/technician/my-jobs/:jobId`
- **Earnings** `/dashboard/technician/earnings`
- **Messages** `/dashboard/technician/messages`
- **Profile** `/dashboard/technician/profile`
- **Settings** `/dashboard/technician/settings`

### 3.4 Experimental / Demo
- **Shadcn Example** `/dashboard/shadcn`

---

## 4. Additional Pages (Add rows as needed)
- Services (`/services`)
- Products (`/products`)
- Requests Flow (`/request/*`)

---

## 5. Page Inventory Snapshot (Winter 2025)

| # | Route Path | Component (src/…) | Audience | Status | Notes |
|---|-----------|--------------------|----------|--------|-------|
| 1 | `/` | `pages/Home.tsx` | Public | In progress | Hero & footer need mobile optimisation |
| 2 | `/auth/customer/sign-in` | `pages/auth/customer/SignIn.tsx` | Customer | Scaffolded | Awaiting form validation hooks |
| 3 | `/auth/customer/sign-up` | `pages/auth/customer/SignUp.tsx` | Customer | Scaffolded | Google OAuth pending |
| 4 | `/auth/technician/sign-in` | `pages/auth/technician/SignIn.tsx` | Technician | Not started | — |
| 5 | `/auth/technician/sign-up` | `pages/auth/technician/SignUp.tsx` | Technician | Not started | — |
| 6 | `/auth/admin/sign-in` | `pages/auth/admin/SignIn.tsx` | Admin | In progress | Needs role-based messaging |
| 7 | `/auth/reset-password` | `pages/auth/ResetPassword.tsx` | All | Not started | Flow TBD |
| 8 | `/dashboard/customer` | `layouts/CustomerDashboardLayout.tsx` | Customer | In progress | Sidebar collapsible bug |
| 9 | `/dashboard/customer/requests` | `pages/customer/MyRequestsPage.tsx` | Customer | Complete | Pagination OK |
| 10 | `/dashboard/technician` | `layouts/TechnicianDashboardLayout.tsx` | Technician | In progress | Earnings chart missing |
| 11 | `/dashboard/admin` | `layouts/AdminTechnicianLayout.tsx` | Admin | In progress | Attendance table needs filters |
| 12 | `/dashboard/shadcn` | `components/dashboard-with-collapsible-sidebar.tsx` | Dev Demo | Prototype | Evaluate for adoption |

> **Status Legend** – *Not started*, *Scaffolded* (UI skeleton only), *In progress*, *Complete*.

## 6. Cross-Page Findings & Recommendations
- **Design System Gaps** – [Missing components, inconsistent variants.]
- **Information Architecture** – [Navigation depth, grouping, nomenclature.]
- **Future Enhancements** – [Progressive disclosure, micro-interactions, personalisation.]

---

## 7. Design Tokens & Style Guide

### 7.1 Colour Palette (Tailwind + CSS Vars)
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary-500` | `#1D4ED8` | Buttons, links |
| `--color-primary-600` | `#1E40AF` | Hover/active |
| `--color-success-500` | `#16A34A` | Positive alerts |
| `--color-danger-500` | `#DC2626` | Error states |
| `--color-gray-50` | `#F9FAFB` | Background |
| … | … | … |

### 7.2 Typographic Scale
| Step | Variable | rem |
|------|----------|-----|
| Body | `--font-body` | 1rem |
| H1 | `--font-h1` | 2.25rem |
| H2 | `--font-h2` | 1.875rem |
| H3 | `--font-h3` | 1.5rem |

### 7.3 Spacing System
```
$spacing: 0.25rem, 0.5rem, 1rem, 1.5rem, 2rem, 3rem;
```

### 7.4 Breakpoints
| Key | px | Notes |
|-----|----|-------|
| `sm` | 640 | Mobile |
| `md` | 768 | Tablet portrait |
| `lg` | 1024 | Tablet landscape |
| `xl` | 1280 | Desktop |

---

## 8. Component Library Status

| Component | File Path | Props Summary | Status | Pages Used |
|-----------|-----------|---------------|--------|-----------|
| `Navbar` | `components/navigation/Navbar.tsx` | `links`, `userRole` | Complete | All |
| `Sidebar` | `components/navigation/Sidebar.tsx` | `links`, `collapsed` | In progress | Dashboards |
| `RequestCard` | `components/cards/RequestCard.tsx` | `request`, `onClick` | Complete | Customer Requests |
| `JobCard` | `components/cards/JobCard.tsx` | `job`, `onClick` | Scaffolded | Technician Job Board |
| `DataTable` | `components/ui/DataTable.tsx` | `columns`, `rows` | Prototype | Admin tables |

---

## 9. Routing Map (v1)
```
/
└─ auth/
   ├─ customer/
   │  ├─ sign-in
   │  └─ sign-up
   ├─ technician/
   │  ├─ sign-in
   │  └─ sign-up
   ├─ admin/sign-in
   └─ reset-password
└─ dashboard/
   ├─ customer/
   │  ├─ requests/:requestId?
   │  └─ …
   ├─ technician/
   │  ├─ my-jobs/:jobId?
   │  └─ …
   ├─ admin/
   │  ├─ attendance
   │  └─ …
   └─ shadcn
```

---

## 10. Core User Flows

### 10.1 Customer – New Service Request
1. `Home ➜ /dashboard/customer/new-request`  
2. Fills service form (steps wizard)  
3. Confirms summary ➜ **POST** `/api/requests`  
4. Success ➜ Redirect to `/dashboard/customer/requests/:requestId`

### 10.2 Technician – Accept Job
1. `/dashboard/technician/job-board` list fetched via **GET** `/api/jobs?status=open`.  
2. Click **Accept** ➜ **PATCH** `/api/jobs/:jobId/accept`  
3. Optimistic UI updates job card  
4. Snackbar notification on success.

### 10.3 Admin – Process Payment
1. `/dashboard/admin/payments` fetches pending rows.  
2. Click **Set Paid** ➜ **POST** `/api/payments/:id/confirm`.  
3. Table row moves to completed; toast success.

---

## 11. State Management & Context Map

| Context Provider | File | Scope | Key State/Reducers | Consumers |
|------------------|------|-------|--------------------|-----------|
| `NotificationContext` | `contexts/NotificationContext.tsx` | App-wide | queue, enqueue, dequeue | All pages |
| `ChatContext` | `contexts/ChatContext.tsx` | Dashboards | channels, messages | Customer/Technician dashboards |
| `CustomerContext` | `contexts/CustomerContext.tsx` | Customer routes | customerProfile, refresh | Customer dashboard |
| `TechnicianContext` | `contexts/TechnicianContext.tsx` | Technician routes | technicianProfile, jobs | Technician dashboard |
| `SettingsContext` | `contexts/SettingsContext.tsx` | App-wide | theme, language | All |

---

## 12. API Integration Summary (REST)

| Endpoint | Method | Auth? | Purpose | Pages |
|----------|--------|-------|---------|-------|
| `/api/auth/login` | POST | No | Sign-in | All auth pages |
| `/api/requests` | GET | JWT | Fetch customer requests | Customer dashboard |
| `/api/jobs` | GET | JWT | Technician job board | Technician dashboard |
| `/api/payments` | GET | JWT | Admin payments | Admin dashboard |
| `/api/users/profile` | GET/PUT | JWT | Profile read & update | All dashboards |

---

## 13. Error & Notification Patterns
- Centralised error boundary component wraps `Routes` to capture runtime errors.
- All fetch hooks return `{ data, error, isLoading }`.
- `NotificationContext` shows Toasts for success/error; errors logged to Sentry (toggle in `.env`).
- 404 routes handled by wildcard `*` ➜ `Navigate` to home.

---

## 14. Testing & Coverage Overview

| Layer | Tool | Scope | Coverage Target |
|-------|------|-------|-----------------|
| Unit | Vitest | Utility functions, hooks, components | ≥ 80% |
| Integration | React Testing Library | Forms, context interactions | Critical flows |
| E2E | Playwright | Auth, dashboards, new request flow | Smoke paths |
| Accessibility | @axe-core/react | Main pages | 0 critical issues |

---

_Revision history:_
- **v1.3** – Added user flows, state map, API summary, error patterns, testing overview (2025-12-27)
- **v1.2** – Added deeper page template subsections (2025-12-27)
- **v1.1** – Added page inventory, dashboards, tokens, component status (2025-12-27)
- **v1.0** – Template generated 2025-12-27.
