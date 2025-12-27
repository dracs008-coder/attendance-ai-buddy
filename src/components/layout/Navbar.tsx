import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX, FiGrid, FiLayers, FiShoppingBag } from "react-icons/fi";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navPillClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-primary-50 text-primary-700"
        : "text-gray-700 hover:text-primary-700 hover:bg-gray-50"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100/80 md:bg-transparent md:border-none lg:bg-white/90 lg:backdrop-blur-md lg:border-b lg:border-gray-100/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:mt-2 md:mb-2 md:-mx-2 md:rounded-2xl md:border md:border-gray-100/80 md:bg-white/90 md:backdrop-blur-md lg:mx-0 lg:rounded-none lg:border-none lg:bg-transparent lg:backdrop-blur-none">
          <div className="flex justify-between items-center h-18">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src="/gigaease-logo.png"
                  alt="Attendance AI Buddy logo"
                  className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300"
                  loading="eager"
                />
              </div>
              <span className="inline-block font-display text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                GigaEase
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <NavLink to="/services" className={navPillClass}>
                <FiGrid className="w-4 h-4" />
                <span>Services</span>
              </NavLink>
              <NavLink to="/bundles" className={navPillClass}>
                <FiLayers className="w-4 h-4" />
                <span>Bundles</span>
              </NavLink>
              <NavLink to="/products" className={navPillClass}>
                <FiShoppingBag className="w-4 h-4" />
                <span>Store</span>
              </NavLink>
              <div className="flex items-center space-x-3">
                <Link
                  to="/auth/sign-in"
                  className="bg-blue-900 hover:bg-blue-950 text-white px-5 py-2 rounded-full font-semibold text-sm transition-colors shadow-sm"
                >
                  Log in
                </Link>
              </div>
            </div>

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 text-gray-700 hover:text-primary-700 transition-colors duration-200 focus:outline-none"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full mt-2 px-4 pb-4 z-40 flex justify-end">
          <div className="w-1/2 max-w-xs rounded-2xl border border-gray-200 bg-white/95 shadow-xl backdrop-blur-md py-4 px-4 space-y-4">
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-3 py-2 text-gray-800 bg-gray-50 hover:bg-primary-50 hover:text-primary-700 transition-colors ${
                  isActive ? "ring-1 ring-primary-500" : ""
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center space-x-2">
                <FiGrid className="w-4 h-4" />
                <span>Services</span>
              </span>
            </NavLink>
            <NavLink
              to="/bundles"
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-3 py-2 text-gray-800 bg-gray-50 hover:bg-primary-50 hover:text-primary-700 transition-colors ${
                  isActive ? "ring-1 ring-primary-500" : ""
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center space-x-2">
                <FiLayers className="w-4 h-4" />
                <span>Bundles</span>
              </span>
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-3 py-2 text-gray-800 bg-gray-50 hover:bg-primary-50 hover:text-primary-700 transition-colors ${
                  isActive ? "ring-1 ring-primary-500" : ""
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center space-x-2">
                <FiShoppingBag className="w-4 h-4" />
                <span>Store</span>
              </span>
            </NavLink>
            <div className="pt-2 space-y-2">
              <Link
                to="/auth/sign-in"
                className="block bg-blue-900 hover:bg-blue-950 text-white px-6 py-2 rounded-full font-semibold text-center transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
