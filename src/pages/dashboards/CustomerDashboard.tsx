import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  FiClock,
  FiCheckCircle,
  FiArrowRight,
  FiDollarSign,
  FiMessageSquare,
  FiGrid,
  FiLayers,
  FiShoppingBag,
  FiPlusCircle,
} from 'react-icons/fi'
import ServiceCard from '../../components/cards/ServiceCard'
import FeedPostCard from '../../components/cards/FeedPostCard'
import RequestStatusBadge from '../../features/requests/components/RequestStatusBadge'
import PaymentStatusBadge from '../../features/payments/components/PaymentStatusBadge'
import { useRequireAuth } from '../../lib/auth'
import {
  getRequests,
  getCategories,
  getServices,
  getPaymentsForRequest,
  updateRequestStatus,
  createInquiryRequest,
  getHomeCarouselSlides,
  type HomeCarouselSlide,
  getPosts,
} from '../../lib/queries'

// Static customer feedback for credibility
const FEEDBACKS: { quote: string; name: string; role: string }[] = [
  {
    quote:
      'GigaEase fixed my laptop in no time and saved my business presentation! Highly recommended.',
    name: 'Sarah L.',
    role: 'Startup Founder',
  },
  {
    quote:
      'Their bundle packages are a great value. I got my phone screen and battery replaced for less.',
    name: 'Mark D.',
    role: 'Remote Worker',
  },
  {
    quote:
      'Fast, reliable, and friendly service. The 3D robot intro blew me away!',
    name: 'Aisha K.',
    role: 'Homeowner',
  },
]

const HERO_CARDS = [
  {
    title: 'Welcome to your GigaEase dashboard',
    description: 'Track repairs, payments, and technician updates in one place.',
  },
  {
    title: 'Stay on top of your requests',
    description: 'See what is in progress, what is completed, and what needs attention.',
  },
  {
    title: 'Keep your devices in great shape',
    description: 'Explore services and bundles tailored for your home and work devices.',
  },
  {
    title: 'Secure and transparent',
    description: 'All your service history and payments are organized and easy to review.',
  },
]

export default function CustomerDashboardPage() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useRequireAuth()
  const [requests, setRequests] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [servicesPreview, setServicesPreview] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<any[]>([])
  const [savedOnly, setSavedOnly] = useState(false)
  const [postQuery, setPostQuery] = useState('')
  const [requestFilter, setRequestFilter] = useState<
    'all' | 'active' | 'completed' | 'unpaid' | 'paid'
  >('all')
  const [paymentFilter, setPaymentFilter] = useState<
    'all' | 'pending' | 'verified' | 'rejected'
  >('all')
  const [activeHeroCard, setActiveHeroCard] = useState(0)
  const [startingChat, setStartingChat] = useState(false)
  const [heroSlides, setHeroSlides] = useState<HomeCarouselSlide[]>([])

  useEffect(() => {
    if (!heroSlides.length) return
    const timer = setInterval(() => {
      setActiveHeroCard(prev => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  useEffect(() => {
    async function loadHeroSlides() {
      try {
        const slides = await getHomeCarouselSlides()
        setHeroSlides(slides)
      } catch (e) {
        console.error('Failed to load home carousel slides', e)
        setHeroSlides([])
      }
    }

    loadHeroSlides()
  }, [])

  useEffect(() => {
    async function loadPosts() {
      if (!user) return
      const data = await getPosts(savedOnly)
      setPosts(data)
    }

    loadPosts()
  }, [user, savedOnly])

  const handleStartInquiryChat = async () => {
    if (!user) {
      navigate('/account/login')
      return
    }
    if (startingChat) return
    setStartingChat(true)
    try {
      const inquiry = await createInquiryRequest({ topic: 'General question', description: '' })
      if (!inquiry || !inquiry.id) {
        toast.error('Could not start chat. Please try again.')
        return
      }
      navigate(`/dashboard/customer/requests/${inquiry.id}?tab=messages`)
    } catch (e) {
      console.error('Failed to start inquiry chat', e)
      toast.error('Could not start chat. Please try again.')
    } finally {
      setStartingChat(false)
    }
  }

  const handleToggleSave = (id: string) => {
    setPosts(prev => prev.map(p => (p.id === id ? { ...p, liked: !p.liked } : p)))
  }

  useEffect(() => {
    async function loadData() {
      try {
        if (!user) {
          if (!authLoading) setLoading(false)
          return
        }

        const [reqs, cats, servs] = await Promise.all([
          getRequests(user.id, 'customer'),
          getCategories(),
          getServices(),
        ])

        const myRequests = (reqs || []).filter((r: any) => !r.user_id || r.user_id === user.id)
        setRequests(myRequests)
        setCategories(cats || [])
        setServicesPreview((servs || []).slice(0, 6))
        const paymentLists = await Promise.all(
          myRequests.map((r: any) => getPaymentsForRequest(r.id)),
        )
        const allPayments = paymentLists.flat()
        setPayments(allPayments)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
        toast.error('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [user, authLoading])

  const getStatusBadge = (status: string) => {
    return <RequestStatusBadge status={status} />
  }

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      verified: { bg: 'bg-green-100', text: 'text-green-800', label: 'Verified' },
      completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
      failed: { bg: 'bg-red-100', text: 'text-red-800', label: 'Failed' },
      refunded: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Refunded' },
    } as const

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending

    return (
      <span className={`status-badge ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  const getRequestPaymentStatusBadge = (status: string) => {
    return <PaymentStatusBadge status={status} />
  }

  const filteredRequests = requests.filter((r: any) => {
    if (requestFilter === 'all') return true
    if (requestFilter === 'active') {
      return (
        r.status === 'pending' ||
        r.status === 'accepted' ||
        r.status === 'in_progress'
      )
    }
    if (requestFilter === 'completed') {
      return r.status === 'completed'
    }
    if (requestFilter === 'unpaid') {
      return r.status === 'completed' && r.payment_status === 'unpaid'
    }
    if (requestFilter === 'paid') {
      return r.payment_status === 'paid'
    }
    return true
  })

  const handleCancelRequest = async (requestId: string) => {
    if (!requestId) return
    try {
      await updateRequestStatus(requestId, 'cancelled')
      toast.success('Request cancelled')
      setRequests(prev =>
        prev.map(r => (r.id === requestId ? { ...r, status: 'cancelled' } : r)),
      )
    } catch (error) {
      console.error('Failed to cancel request', error)
      toast.error('Failed to cancel request')
    }
  }

  const filteredPayments = payments.filter((p: any) => {
    if (paymentFilter === 'all') return true
    if (paymentFilter === 'pending') {
      return p.status === 'pending'
    }
    if (paymentFilter === 'verified') {
      return p.status === 'verified'
    }
    if (paymentFilter === 'rejected') {
      return p.status === 'rejected'
    }
    return true
  })

  const activeRequestsCount = requests.filter(
    (r: any) =>
      r.status === 'pending' ||
      r.status === 'accepted' ||
      r.status === 'in_progress',
  ).length

  const completedRequestsCount = requests.filter(
    (r: any) => r.status === 'completed',
  ).length

  const pendingPaymentsCount = payments.filter((p: any) => p.status === 'pending')
    .length

  const messageableRequestsCount = requests.filter((r: any) => !!r.technician).length

  const normalizedPostQuery = postQuery.trim().toLowerCase()
  const filteredPostsForView = posts.filter((post: any) => {
    if (!normalizedPostQuery) return true
    const title = (post.title || '').toLowerCase()
    const content = (post.content || '').toLowerCase()
    const techName = (post.technician?.name || '').toLowerCase()
    return (
      title.includes(normalizedPostQuery) ||
      content.includes(normalizedPostQuery) ||
      techName.includes(normalizedPostQuery)
    )
  })

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {heroSlides.length > 0 && (
          <div className="mb-8">
            <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-primary-blue to-purple-600 text-white shadow-soft h-32 sm:h-40 md:h-44">
              <div
                className="absolute inset-0 flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeHeroCard * 100}%)` }}
              >
                {heroSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className="w-full flex-shrink-0 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between gap-4"
                  >
                    <div className="max-w-md">
                      <p className="text-xs sm:text-sm uppercase tracking-wide text-white/80 mb-1">
                        Customer Dashboard
                      </p>
                      <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold sm:font-bold leading-snug">
                        {slide.title}
                      </h1>
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-white/80">
                        {index === 0
                          ? `Hello, ${user?.name || user?.email || 'Guest'}. `
                          : ''}
                        {slide.description}
                      </p>
                    </div>
                    <div className="hidden sm:flex flex-1 h-full items-center justify-end">
                      <div
                        className="h-20 sm:h-24 md:h-28 w-32 sm:w-40 md:w-48 rounded-xl border border-white/20 bg-white/10 bg-cover bg-center"
                        style={{ backgroundImage: `url('${slide.imageUrl}')` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveHeroCard(index)}
                    className={`h-1.5 w-6 rounded-full transition-colors ${
                      activeHeroCard === index
                        ? 'bg-white'
                        : 'bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mb-8">
          {/* Mobile: 2 cards visible per row, horizontal slide */}
          <div className="flex gap-3 overflow-x-auto pb-1 sm:hidden">
            <div className="card flex-[0_0_50%] min-w-0 px-3 py-3">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-600 mb-0.5 truncate">Total Requests</p>
                  <p className="text-lg font-bold text-gray-900 truncate">
                    {requests.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="card flex-[0_0_50%] min-w-0 px-3 py-3">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-600 mb-0.5 truncate">
                    In Progress
                  </p>
                  <p className="text-lg font-bold text-blue-600 truncate">
                    {
                      requests.filter(
                        r =>
                          r.status === 'in_progress' || r.status === 'accepted',
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="card flex-[0_0_50%] min-w-0 px-3 py-3">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-600 mb-0.5 truncate">Completed</p>
                  <p className="text-lg font-bold text-green-600 truncate">
                    {requests.filter(r => r.status === 'completed').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="card flex-[0_0_50%] min-w-0 px-3 py-3">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-600 mb-0.5 truncate">
                    Total Payments
                  </p>
                  <p className="text-lg font-bold text-primary-blue truncate">
                    ₱
                    {payments
                      .reduce(
                        (sum, p) => sum + Number(p.amount ?? 0),
                        0,
                      )
                      .toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tablet / Desktop: standard 4-card layout */}
          <div className="hidden sm:grid sm:grid-cols-4 sm:gap-4">
            <div className="card px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
                </div>
                <FiClock className="w-8 h-8 text-primary-blue opacity-20" />
              </div>
            </div>
            <div className="card px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {
                      requests.filter(
                        r =>
                          r.status === 'in_progress' || r.status === 'accepted',
                      ).length
                    }
                  </p>
                </div>
                <FiClock className="w-8 h-8 text-blue-600 opacity-20" />
              </div>
            </div>
            <div className="card px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {requests.filter(r => r.status === 'completed').length}
                  </p>
                </div>
                <FiCheckCircle className="w-8 h-8 text-green-600 opacity-20" />
              </div>
            </div>
            <div className="card px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Payments</p>
                  <p className="text-2xl font-bold text-primary-blue">
                    ₱
                    {payments
                      .reduce(
                        (sum, p) => sum + Number(p.amount ?? 0),
                        0,
                      )
                      .toFixed(2)}
                  </p>
                </div>
                <FiDollarSign className="w-8 h-8 text-primary-blue opacity-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-8 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="rounded-t-2xl sm:rounded-t-3xl bg-blue-900 px-4 py-4 sm:px-6 sm:py-5 overflow-hidden">
            <div
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
              aria-label="Quick links to services"
            >
              <Link
                to="/services"
                className="card group focus:outline-none focus:ring-2 focus:ring-primary-blue"
                aria-label="Browse Services"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-0.5">Explore</p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900">
                      Services
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 rounded-full bg-blue-50 text-blue-600">
                    <FiGrid className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
              </Link>
              <Link
                to="/bundles"
                className="card group focus:outline-none focus:ring-2 focus:ring-primary-blue"
                aria-label="View Bundles"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-0.5">Save with</p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900">
                      Bundles
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 rounded-full bg-purple-50 text-purple-600">
                    <FiLayers className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
              </Link>
              <Link
                to="/products"
                className="card group focus:outline-none focus:ring-2 focus:ring-primary-blue"
                aria-label="Visit Store"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-0.5">Shop</p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900">
                      Store
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 rounded-full bg-green-50 text-green-600">
                    <FiShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
              </Link>
              <Link
                to="/request"
                className="card group focus:outline-none focus:ring-2 focus:ring-primary-blue"
                aria-label="Create Request"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-0.5">Start</p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900">
                      New Request
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 rounded-full bg-amber-50 text-amber-600">
                    <FiPlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Explore Services (Preview) */}
        {servicesPreview.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Explore Services</h2>
              <Link
                to="/services"
                className="text-primary-blue hover:text-blue-700 inline-flex items-center"
              >
                View all
                <FiArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicesPreview.map((service: any) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  title={service.title}
                  description={service.description || ''}
                  purpose={service.purpose || ''}
                  price={service.price || 0}
                  icon={service.icon || '🔧'}
                  unavailable={
                    service.title === 'Battery Health Check' &&
                    service.purpose === 'Battery health check'
                  }
                  onAddToRequest={(id: string) => {
                    navigate(`/request?service=${id}`)
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Technician News Feed */}
        {posts.length > 0 && (
          <div className="mt-16">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Technician Posts</h2>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 text-sm">
                <input
                  type="text"
                  value={postQuery}
                  onChange={e => setPostQuery(e.target.value)}
                  placeholder="Filter by technician or topic"
                  className="h-8 w-full rounded-full border border-gray-200 bg-white px-3 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent sm:w-56"
                />
                <div className="flex items-center gap-2">
                  <button
                    className={`btn-outline px-4 py-1 rounded-full ${
                      !savedOnly ? 'bg-black hover:bg-gray-900 text-white' : ''
                    }`}
                    onClick={() => setSavedOnly(false)}
                  >
                    All
                  </button>
                  <button
                    className={`btn-outline px-4 py-1 rounded-full ${
                      savedOnly ? 'bg-primary-blue text-white' : ''
                    }`}
                    onClick={() => setSavedOnly(true)}
                  >
                    Saved
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-t-2xl p-6 bg-white shadow-soft">
              {filteredPostsForView.map((post: any) => (
                <FeedPostCard key={post.id} post={post} onToggle={handleToggleSave} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


