import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
// import SignIn from "./pages/auth/SignIn"; // deprecated
// import SignUp from "./pages/auth/SignUp"; // deprecated
import ResetPassword from "./pages/auth/ResetPassword";
import CustomerSignUp from "./pages/auth/customer/SignUp";
import CustomerSignIn from "./pages/auth/customer/SignIn";
import TechnicianSignUp from "./pages/auth/technician/SignUp";
import TechnicianSignIn from "./pages/auth/technician/SignIn";
import AdminSignIn from "./pages/auth/admin/SignIn";
import CustomerDashboardLayout from "./layouts/CustomerDashboardLayout";

import CustomerOverviewPage from "./pages/customer/OverviewPage";
import MyRequestsPage from "./pages/customer/MyRequestsPage";
import NewRequestPage from "./pages/customer/NewRequestPage";
import CustomerPaymentsPage from "./pages/customer/PaymentsPage";
import MessagesPage from "./pages/customer/MessagesPage";
import CustomerProfilePage from "./pages/customer/ProfilePage";
import TestimonialsPage from "./pages/customer/TestimonialsPage";
import RequestDetailPage from "./pages/customer/RequestDetailPage";
import CustomerSettingsPage from "./pages/customer/SettingsPage";
import TechnicianDashboardLayout from "./layouts/TechnicianDashboardLayout";

import TechnicianOverviewPage from "./pages/technician/OverviewPage";
import JobBoardPage from "./pages/technician/JobBoardPage";
import MyJobsPage from "./pages/technician/MyJobsPage";
import JobDetailPage from "./pages/technician/JobDetailPage";
import EarningsPage from "./pages/technician/EarningsPage";
import TechnicianMessagesPage from "./pages/technician/MessagesPage";
import TechnicianProfilePage from "./pages/technician/ProfilePage";
import TechnicianSettingsPage from "./pages/technician/SettingsPage";
import MainLayout from "./components/layout/MainLayout";
import { PostsProvider } from "./contexts/PostsContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ChatProvider } from "./contexts/ChatContext";
import { TechnicianProvider } from "./contexts/TechnicianContext";
import { TechniciansDirectoryProvider } from "./contexts/TechniciansDirectoryContext";
import { CustomerProvider } from "./contexts/CustomerContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import AdminTechnicianLayout from "./layouts/AdminTechnicianLayout";

import OverviewPage from "./pages/admin/OverviewPage";
import AttendancePage from "./pages/admin/AttendancePage";
import RequestsPage from "./pages/admin/RequestsPage";
import ProductsPage from "./pages/admin/ProductsPage";
import ServicesPage from "./pages/admin/ServicesPage";
import BundlesPage from "./pages/admin/BundlesPage";
import PostsPage from "./pages/admin/PostsPage";
import TechniciansPage from "./pages/admin/TechniciansPage";
import CustomersPage from "./pages/admin/CustomersPage";
import AdminPaymentsPage from "./pages/admin/PaymentsPage";
import SettingsPage from "./pages/admin/SettingsPage";

import Example from "./components/dashboard-with-collapsible-sidebar";

function App() {
  return (
    <TechniciansDirectoryProvider>
    <NotificationProvider>
    <ChatProvider>
        <ProfileProvider>
      <CustomerProvider>
    <TechnicianProvider>
    <SettingsProvider>
      <PostsProvider>
      <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth (multi-role) */}
        <Route path="/auth/customer/sign-in" element={<CustomerSignIn />} />
        <Route path="/auth/customer/sign-up" element={<CustomerSignUp />} />
        <Route path="/auth/technician/sign-in" element={<TechnicianSignIn />} />
        <Route path="/auth/technician/sign-up" element={<TechnicianSignUp />} />
        <Route path="/auth/admin/sign-in" element={<AdminSignIn />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />

        {/* Dashboards */}
        <Route path="/dashboard/customer" element={<CustomerDashboardLayout />}>
          <Route index element={<CustomerOverviewPage />} />
          <Route path="requests">
            <Route index element={<MyRequestsPage />} />
            <Route path=":requestId" element={<RequestDetailPage />} />
          </Route>
          <Route path="new-request" element={<NewRequestPage />} />
          <Route path="payments" element={<CustomerPaymentsPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="profile" element={<CustomerProfilePage />} />
          <Route path="settings" element={<CustomerSettingsPage />} />
        </Route>
        <Route path="/dashboard/technician" element={<TechnicianDashboardLayout />}>
          <Route index element={<TechnicianOverviewPage />} />
          <Route path="job-board" element={<JobBoardPage />} />
          <Route path="my-jobs">
            <Route index element={<MyJobsPage />} />
            <Route path=":jobId" element={<JobDetailPage />} />
          </Route>
          <Route path="earnings" element={<EarningsPage />} />
          <Route path="messages" element={<TechnicianMessagesPage />} />
          <Route path="profile" element={<TechnicianProfilePage />} />
          <Route path="settings" element={<TechnicianSettingsPage />} />
        </Route>

        <Route path="/dashboard/admin" element={<AdminTechnicianLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="requests" element={<RequestsPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="bundles" element={<BundlesPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="technicians" element={<TechniciansPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="/dashboard/shadcn" element={<Example />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
    </PostsProvider>
    </SettingsProvider>
    </TechnicianProvider>
    </CustomerProvider>
    </ProfileProvider>
        </ChatProvider>
    </NotificationProvider>
    </TechniciansDirectoryProvider>
  );
}

export default App;
