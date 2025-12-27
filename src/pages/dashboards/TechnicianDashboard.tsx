import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  FiClock,
  FiCheckCircle,
  FiMessageSquare,
  FiTrendingUp,
} from 'react-icons/fi'
import RequestStatusBadge from '../../features/requests/components/RequestStatusBadge'
import PaymentStatusBadge from '../../features/payments/components/PaymentStatusBadge'
import { useRequireAuth } from '../../lib/auth'
import { getRequests, getPaymentsForRequest } from '../../lib/queries'

export default function TechnicianDashboardPage() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useRequireAuth()
  const [requests, setRequests] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [requestFilter, setRequestFilter] = useState<
    'date' | 'time' | 'relevant' | 'urgent' | 'not_urgent'
  >('date')

  useEffect(() => {
    // If authenticated customer somehow hits this page, send them to customer dashboard
    if (!authLoading && user && user.role === 'customer') {
      navigate('/dashboard/customer', { replace: true })
    }
  }, [user, authLoading, navigate])

  useEffect(() => {
    async function loadData() {
      try {
        if (!user || user.role !== 'technician') {
          if (!authLoading) setLoading(false)
          return
        }

        const reqs = await getRequests(user.id, 'technician')
        const myRequests = (reqs || []).filter(
          (r: any) => !r.technician_id || r.technician_id === user.id,
        )
        setRequests(myRequests)

        try {
          const paymentLists = await Promise.all(
            myRequests.map((r: any) => getPaymentsForRequest(r.id)),
          )
          const allPayments = paymentLists.flat()
          setPayments(allPayments)
        } catch (e) {
          console.warn('Could not load payments for technician earnings:', e)
          setPayments([])
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error)
        toast.error('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    void loadData()
  }, [user, authLoading])

  const stats = useMemo(() => {
    const byStatus: Record<
      'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' | 'rejected',
      number
    > = {
      pending: 0,
      accepted: 0,
      in_progress: 0,
      completed: 0,
      cancelled: 0,
      rejected: 0,
    }
    requests.forEach(r => {
      const key = r.status as keyof typeof byStatus
      if (byStatus[key] !== undefined) byStatus[key] += 1
    })
    const totalRequests = requests.length
    const pendingRequests = byStatus.pending
    const inProgressRequests = byStatus.accepted + byStatus.in_progress
    const completedRequests = byStatus.completed
    const activeRequests = pendingRequests + inProgressRequests
    const completionRate =
      totalRequests > 0
        ? Math.round(
            (completedRequests /
              (totalRequests - byStatus.cancelled - byStatus.rejected || 1)) *
              100,
          )
        : 0

    // Earnings from payments linked to completed requests
    const completedRequestIds = new Set(
      requests
        .filter(r => r.status === 'completed' && r.technician_id)
        .map(r => r.id),
    )
    const paymentsByStatus: Record<'verified' | 'pending' | 'disputed' | 'failed', number> = {
      verified: 0,
      pending: 0,
      disputed: 0,
      failed: 0,
    }
    payments
      .filter((p: any) => completedRequestIds.has(p.request_id))
      .forEach((p: any) => {
        const amount = Number(p.amount ?? 0)
        if (p.status === 'verified') paymentsByStatus.verified += amount
        else if (p.status === 'pending') paymentsByStatus.pending += amount
        else if (p.status === 'disputed') paymentsByStatus.disputed += amount
        else if (p.status === 'failed') paymentsByStatus.failed += amount
      })

    const totalEarnings =
      paymentsByStatus.verified +
      paymentsByStatus.pending +
      paymentsByStatus.disputed +
      paymentsByStatus.failed

    return {
      byStatus,
      totalRequests,
      pendingRequests,
      inProgressRequests,
      completedRequests,
      activeRequests,
      completionRate,
      paymentsByStatus,
      totalEarnings,
    }
  }, [requests, payments])

  const filteredPendingRequests = useMemo(() => {
    const pending = requests.filter((r: any) => r.status === 'pending')
    const sorted = [...pending]

    if (requestFilter === 'date') {
      sorted.sort((a: any, b: any) => {
        const getDateValue = (r: any) => {
          const preferred = r.preferred_date
            ? new Date(r.preferred_date).getTime()
            : null
          const created = r.created_at ? new Date(r.created_at).getTime() : 0
          return preferred ?? created
        }
        return getDateValue(a) - getDateValue(b)
      })
    } else if (requestFilter === 'time') {
      sorted.sort((a: any, b: any) => {
        const aTime = a.created_at ? new Date(a.created_at).getTime() : 0
        const bTime = b.created_at ? new Date(b.created_at).getTime() : 0
        return bTime - aTime
      })
    } else if (requestFilter === 'relevant') {
      const priorityOrder: Record<string, number> = {
        urgent: 1,
        high: 2,
        medium: 3,
        low: 4,
      }
      sorted.sort((a: any, b: any) => {
        const aPriority = (a.priority || 'medium') as string
        const bPriority = (b.priority || 'medium') as string
        const aScore = priorityOrder[aPriority] ?? priorityOrder.medium
        const bScore = priorityOrder[bPriority] ?? priorityOrder.medium
        if (aScore !== bScore) return aScore - bScore
        const aTime = a.created_at ? new Date(a.created_at).getTime() : 0
        const bTime = b.created_at ? new Date(b.created_at).getTime() : 0
        return bTime - aTime
      })
    } else if (requestFilter === 'urgent') {
      return sorted
        .filter((r: any) => {
          const priority = (r.priority || 'medium') as string
          return priority === 'urgent' || priority === 'high'
        })
        .sort((a: any, b: any) => {
          const aTime = a.created_at ? new Date(a.created_at).getTime() : 0
          const bTime = b.created_at ? new Date(b.created_at).getTime() : 0
          return bTime - aTime
        })
    } else if (requestFilter === 'not_urgent') {
      return sorted
        .filter((r: any) => {
          const priority = (r.priority || 'medium') as string
          return priority === 'low' || priority === 'medium'
        })
        .sort((a: any, b: any) => {
          const aTime = a.created_at ? new Date(a.created_at).getTime() : 0
          const bTime = b.created_at ? new Date(b.created_at).getTime() : 0
          return bTime - aTime
        })
    }

    return sorted
  }, [requests, requestFilter])

  const getStatusBadge = (status: string) => {
    return <RequestStatusBadge status={status} />
  }

  const getRequestPaymentStatusBadge = (status: string) => {
    return <PaymentStatusBadge status={status} />
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      </div>
    )
  }

  if (!user || user.role !== 'technician') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">You must be a technician to view this dashboard.</p>
      </div>
    )
  }

  const {
    totalRequests,
    pendingRequests,
    inProgressRequests,
    completedRequests,
    activeRequests,
    completionRate,
    totalEarnings,
    paymentsByStatus,
  } = stats

  const upcoming = requests
    .filter(
      (r: any) =>
        r.status === 'pending' || r.status === 'accepted' || r.status === 'in_progress',
    )
    .slice(0, 5)

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Technician Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">
            Overview of your requests, earnings, and activity.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Link
              to="/dashboard/technician/products"
              className="inline-flex items-center rounded-full border border-gray-300 px-3 py-1 font-medium text-gray-700 hover:bg-gray-50"
            >
              Manage products
            </Link>
            <Link
              to="/dashboard/technician/posts"
              className="inline-flex items-center rounded-full border border-gray-300 px-3 py-1 font-medium text-gray-700 hover:bg-gray-50"
            >
              Manage posts
            </Link>
            <Link
              to="/dashboard/technician/settings"
              className="inline-flex items-center rounded-full border border-gray-300 px-3 py-1 font-medium text-gray-700 hover:bg-gray-50"
            >
              App footer settings
            </Link>
          </div>
        </div>

        {/* Overview stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Active Requests
            </p>
            <p className="mt-2 text-2xl font-semibold text-blue-700">{activeRequests}</p>
            <div className="mt-2 space-y-1 text-[11px] text-gray-500">
              <p>
                <span className="font-medium">{pendingRequests}</span> pending 
                
                <span className="font-medium"> {inProgressRequests}</span> in progress
              </p>
              <p className="mt-1">
                Completion rate:{' '}
                <span className="font-semibold">{completionRate}%</span>
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Pending
            </p>
            <p className="mt-2 text-2xl font-semibold text-amber-700">
              {pendingRequests}
            </p>
            <p className="mt-1 text-xs text-gray-500">Waiting for your response.</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Active jobs
            </p>
            <p className="mt-2 text-2xl font-semibold text-blue-700">
              {inProgressRequests}
            </p>
            <p className="mt-1 text-xs text-gray-500">Accepted or in progress.</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Total Earnings
            </p>
            <p className="mt-2 text-2xl font-semibold text-emerald-700">
              ₱{totalEarnings.toFixed(2)}
            </p>
            <div className="mt-2 text-[11px] space-y-1 text-gray-500">
              <p>
                Verified:{' '}
                <span className="text-emerald-700 font-medium">
                  ₱{paymentsByStatus.verified.toFixed(2)}
                </span>
              </p>
              {paymentsByStatus.pending > 0 && (
                <p>
                  Pending:{' '}
                  <span className="text-amber-600 font-medium">
                    ₱{paymentsByStatus.pending.toFixed(2)}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming & pending work + quick snapshot */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <FiClock className="h-4 w-4 text-blue-600" />
                Upcoming & pending work
              </h2>
              <span className="text-xs text-gray-500">{upcoming.length} requests</span>
            </div>
            {upcoming.length === 0 ? (
              <p className="py-6 text-sm text-gray-500 text-center">
                No upcoming work yet. New customer requests will appear here.
              </p>
            ) : (
              <ul className="divide-y divide-gray-100 text-sm">
                {upcoming.map((r: any) => (
                  <li
                    key={r.id}
                    className="flex flex-col gap-1 py-3 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-900 line-clamp-1">
                        {r.title || r.issue_title || 'Customer request'}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {r.description || r.issue_description || 'No description provided.'}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-1 md:items-end">
                      <div>{getStatusBadge(r.status)}</div>
                      <p className="text-[11px] text-gray-500">
                        {r.preferred_date
                          ? `Preferred: ${new Date(
                              r.preferred_date,
                            ).toLocaleDateString()}`
                          : r.created_at
                          ? `Created: ${new Date(
                              r.created_at,
                            ).toLocaleDateString()}`
                          : 'No date yet'}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <FiTrendingUp className="h-4 w-4 text-emerald-600" />
                Requests snapshot
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-gray-50 px-3 py-3">
                <p className="text-xs text-gray-500">Total requests</p>
                <p className="text-lg font-semibold text-gray-900">{totalRequests}</p>
              </div>
              <div className="rounded-xl bg-gray-50 px-3 py-3">
                <p className="text-xs text-gray-500">Completed</p>
                <p className="text-lg font-semibold text-green-700">
                  {completedRequests}
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 px-3 py-3">
                <p className="text-xs text-gray-500">Pending</p>
                <p className="text-lg font-semibold text-amber-700">
                  {pendingRequests}
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 px-3 py-3">
                <p className="text-xs text-gray-500">Active jobs</p>
                <p className="text-lg font-semibold text-blue-700">
                  {inProgressRequests}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending requests list with sort */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <FiMessageSquare className="h-4 w-4 text-blue-600" />
                New customer requests
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Review and accept new work from customers.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Sort by</span>
              <select
                className="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white"
                value={requestFilter}
                onChange={e => setRequestFilter(e.target.value as any)}
              >
                <option value="date">Preferred date</option>
                <option value="time">Newest first</option>
                <option value="relevant">Priority &amp; time</option>
                <option value="urgent">Urgent only</option>
                <option value="not_urgent">Not urgent</option>
              </select>
            </div>
          </div>

          {filteredPendingRequests.length === 0 ? (
            <p className="py-6 text-sm text-gray-500 text-center">
              No pending requests. New customer requests will appear here.
            </p>
          ) : (
            <div className="space-y-3">
              {filteredPendingRequests.map((r: any) => (
                <div
                  key={r.id}
                  className="border rounded-xl px-4 py-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between bg-gray-50"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                      {r.title || r.issue_title || 'Customer request'}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {r.description || r.issue_description || 'No description provided.'}
                    </p>
                  </div>
                  <div className="flex flex-col md:items-end gap-2 mt-2 md:mt-0">
                    <div className="flex flex-wrap gap-2">
                      {getStatusBadge(r.status)}
                      {getRequestPaymentStatusBadge(r.payment_status)}
                    </div>
                    <div className="flex gap-2 text-xs text-gray-500">
                      <button
                        type="button"
                        onClick={() => navigate(`/dashboard/customer/requests/${r.id}`)}
                        className="underline"
                      >
                        View as customer
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate(`/dashboard/customer/messages?request=${r.id}`)}
                        className="underline"
                      >
                        Open chat
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


