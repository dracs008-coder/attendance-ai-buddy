import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuth = pathname.startsWith("/auth");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!isDashboard && !isAuth && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isDashboard && !isAuth && <Footer />}
    </div>
  );
};

export default MainLayout;
