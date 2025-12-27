import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiBarChart2, FiClock, FiShoppingBag, FiUsers } from 'react-icons/fi'
import AdminDashboardTabs from '../../components/AdminDashboardTabs'
import { useAuth, getDashboardPathForUser } from '../../lib/auth'

const ADMIN_EMAIL = 'techfix.astral@gmail.com'

export default function AdminDashboardPage() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (loading) return

    // Not logged in: send to login
    if (!user) {
      navigate('/account/login', { replace: true })
      return
    }

    const email = typeof user.email === 'string' ? user.email.toLowerCase() : ''
    const isAdmin = user.role === 'technician' && email === ADMIN_EMAIL.toLowerCase()

    // Logged-in non-admins should be redirected to their own dashboard
    if (!isAdmin) {
      const path = getDashboardPathForUser(user)
      navigate(path, { replace: true })
    }
  }, [user, loading, navigate])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      </div>
    )
  }

  const displayName = user?.name || 'Admin'

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 py-6 sm:py-8">
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <header className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Welcome back,{" "}
              <span className="font-semibold text-primary-blue">
                {displayName}
              </span>
              . Heres an overview of your platform activity.
            </p>
          </header>

          <section
            aria-label="Admin navigation"
            className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm px-3 sm:px-4 py-3 sm:py-4"
          >
            <AdminDashboardTabs />
          </section>

          <section aria-label="Key metrics" className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
                Overview
              </h2>
              <span className="text-xs text-gray-500 sm:text-sm">
                High-level stats to monitor your platform health
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 px-4 py-4 sm:py-5 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Service Requests
                  </p>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <FiClock className="h-4 w-4" />
                  </span>
                </div>
                <p className="text-2xl font-semibold text-gray-900"></p>
                <p className="mt-1 text-xs text-gray-500">Total requests across the platform</p>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 px-4 py-4 sm:py-5 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Products
                  </p>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <FiShoppingBag className="h-4 w-4" />
                  </span>
                </div>
                <p className="text-2xl font-semibold text-gray-900"></p>
                <p className="mt-1 text-xs text-gray-500">Active products currently listed</p>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 px-4 py-4 sm:py-5 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Technicians
                  </p>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    <FiUsers className="h-4 w-4" />
                  </span>
                </div>
                <p className="text-2xl font-semibold text-gray-900"></p>
                <p className="mt-1 text-xs text-gray-500">Approved technicians on the platform</p>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 px-4 py-4 sm:py-5 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Activity
                  </p>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                    <FiBarChart2 className="h-4 w-4" />
                  </span>
                </div>
                <p className="text-2xl font-semibold text-gray-900"></p>
                <p className="mt-1 text-xs text-gray-500">Recent activity across admin sections</p>
              </div>
            </div>
          </section>

          <section
            aria-label="Admin tips"
            className="rounded-2xl border border-dashed border-gray-200 bg-white/60 px-4 py-4 sm:px-5 sm:py-5 text-sm text-gray-600"
          >
            <p className="mb-1 font-medium text-gray-800">Next steps</p>
            <p className="text-xs sm:text-sm">
              Use the tabs above to manage service requests, products, services, website packages, bundles, posts,
              and technicians. This overview will evolve as more platform-wide metrics become available.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}


