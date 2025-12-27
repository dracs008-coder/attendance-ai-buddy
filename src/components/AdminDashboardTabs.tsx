import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FiChevronDown,
  FiBarChart2,
  FiClock,
  FiShoppingBag,
  FiSettings,
  FiPackage,
  FiLayers,
  FiMessageSquare,
  FiUsers,
  FiCalendar,
} from 'react-icons/fi'

interface Tab {
  label: string
  href: string
}

interface AdminDashboardTabsProps {
  tabs?: Tab[]
}

const DEFAULT_TABS: Tab[] = [
  { label: 'Overview', href: '/dashboard/admin' },
  { label: 'Bookings', href: '/dashboard/admin/bookings' },
  { label: 'Service Requests', href: '/dashboard/admin/service-requests' },
  { label: 'Products', href: '/dashboard/admin/products' },
  { label: 'Services', href: '/dashboard/admin/services' },
  { label: 'Website Packages', href: '/dashboard/admin/website-packages' },
  { label: 'Bundles', href: '/dashboard/admin/bundles' },
  { label: 'Posts', href: '/dashboard/admin/posts' },
  { label: 'Technicians', href: '/dashboard/admin/technicians' },
]

function getTabIcon(label: string) {
  switch (label) {
    case 'Overview':
      return FiBarChart2
    case 'Bookings':
      return FiCalendar
    case 'Service Requests':
      return FiClock
    case 'Products':
      return FiShoppingBag
    case 'Services':
      return FiSettings
    case 'Website Packages':
      return FiPackage
    case 'Bundles':
      return FiLayers
    case 'Posts':
      return FiMessageSquare
    case 'Technicians':
      return FiUsers
    default:
      return null
  }
}

export default function AdminDashboardTabs({ tabs = DEFAULT_TABS }: AdminDashboardTabsProps) {
  const { pathname } = useLocation()
  const containerRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const indicatorRef = useRef<HTMLSpanElement>(null)

  const [overflowStartIndex, setOverflowStartIndex] = useState<number | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateOverflow = () => {
      const containerRect = container.getBoundingClientRect()
      let firstHidden: number | null = null

      tabRefs.current.forEach((tab, idx) => {
        if (!tab) return
        const rect = tab.getBoundingClientRect()
        const isHidden = rect.right > containerRect.right - 40
        if (isHidden && firstHidden === null) firstHidden = idx
      })

      setOverflowStartIndex(firstHidden)
    }

    updateOverflow()

    const resizeObserver = new ResizeObserver(updateOverflow)
    resizeObserver.observe(container)

    window.addEventListener('resize', updateOverflow)
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateOverflow)
    }
  }, [tabs.length])

  useEffect(() => {
    const activeIdx = tabs.findIndex(t => pathname?.startsWith(t.href))
    const activeTab = tabRefs.current[activeIdx]
    const indicator = indicatorRef.current
    if (activeTab && indicator) {
      const { offsetLeft, offsetWidth } = activeTab
      indicator.style.setProperty('--tw-indicator-x', `${offsetLeft}px`)
      indicator.style.setProperty('--tw-indicator-w', `${offsetWidth}px`)
    }
  }, [pathname, tabs])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const focusable = tabRefs.current.filter(Boolean) as HTMLAnchorElement[]
    const current = document.activeElement as HTMLAnchorElement | null
    if (!current) return
    const idx = focusable.indexOf(current)

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()
        focusable[(idx + 1) % focusable.length]?.focus()
        break
      case 'ArrowLeft':
        e.preventDefault()
        focusable[(idx - 1 + focusable.length) % focusable.length]?.focus()
        break
      case 'Home':
        e.preventDefault()
        focusable[0]?.focus()
        break
      case 'End':
        e.preventDefault()
        focusable[focusable.length - 1]?.focus()
        break
    }
  }

  const visibleTabs = overflowStartIndex === null ? tabs : tabs.slice(0, overflowStartIndex)
  const overflowTabs = overflowStartIndex === null ? [] : tabs.slice(overflowStartIndex)

  return (
    <nav className="relative w-full" aria-label="Admin dashboard tabs">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white via-white/70 to-white/0" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white via-white/70 to-white/0" />

      <div
        ref={containerRef}
        role="tablist"
        onKeyDown={handleKeyDown}
        className="flex items-center overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory no-scrollbar pl-1 pr-10 sm:pr-4 gap-0.5 sm:gap-1"
      >
        {visibleTabs.map((tab, idx) => {
          const selected = pathname?.startsWith(tab.href)
          const Icon = getTabIcon(tab.label)
          return (
            <Link
              key={tab.href}
              to={tab.href}
              ref={el => {
                tabRefs.current[idx] = el
              }}
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              className={`snap-start relative inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-medium rounded-full transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                selected
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
              }`}
            >
              {Icon && (
                <span className="inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-500">
                  <Icon className="w-4 h-4" />
                </span>
              )}
              <span>{tab.label}</span>
            </Link>
          )
        })}

        {overflowTabs.length > 0 && (
          <div className="relative" onKeyDown={e => e.stopPropagation()}>
            <button
              type="button"
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-haspopup="menu"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen(open => !open)}
            >
              More <FiChevronDown className="w-4 h-4" />
            </button>
            {dropdownOpen && (
              <ul
                role="menu"
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50"
              >
                {overflowTabs.map(tab => (
                  <li key={tab.href} role="none">
                    <Link
                      role="menuitem"
                      to={tab.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {tab.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <span
        ref={indicatorRef}
        aria-hidden="true"
        className="absolute bottom-0 h-0.5 bg-primary-600 transition-all duration-300"
        style={{
          transform: 'translateX(var(--tw-indicator-x, 0px))',
          width: 'var(--tw-indicator-w, 0px)',
        }}
      />
    </nav>
  )
}
