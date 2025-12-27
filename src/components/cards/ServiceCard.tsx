import { ArrowRight } from 'lucide-react'

interface ServiceCardProps {
  id: string
  title: string
  description?: string
  purpose?: string
  price?: number
  icon?: string // optional image url kept for backward compatibility
  onAddToRequest?: (serviceId: string) => void
  unavailable?: boolean
}

export default function ServiceCard({
  title,
  description,
  purpose,
  price,
  onAddToRequest,
  id,
  unavailable,
  icon,
}: ServiceCardProps) {
  const isImageIcon =
    !!icon &&
    (icon.startsWith('http') ||
      icon.startsWith('/') ||
      icon.startsWith('data:') ||
      icon.startsWith('blob:') ||
      icon.includes('.'))

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

  const imageSrc = isImageIcon
    ? icon.startsWith('/') ||
      icon.startsWith('http') ||
      icon.startsWith('data:') ||
      icon.startsWith('blob:')
      ? icon
      : `${API_URL}/${icon.replace(/^\/+/, '')}`
    : '/Default Image.jpg'

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-lg shadow-sm hover:shadow-md flex flex-col overflow-hidden h-full transition-shadow">
      <div className="p-6 flex-1 flex flex-col">
        <div className="w-full h-32 rounded-xl bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover object-center"
            onError={e => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const fallback = target.nextElementSibling as HTMLElement | null
              if (fallback) fallback.style.display = 'flex'
            }}
          />
          <div className="hidden items-center justify-center w-full h-full text-3xl">
            <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
              <rect x="8" y="12" width="48" height="36" rx="3" fill="#E5E7EB" />
              <path d="M18 38L26 30L34 38L40 32L46 38H18Z" fill="#9CA3AF" />
              <circle cx="24" cy="24" r="3" fill="#9CA3AF" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
          {title}
        </h3>
        {unavailable && (
          <p className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full inline-flex items-center mb-3">
            Temporarily unavailable
          </p>
        )}

        {description && (
          <div className="text-gray-600 text-sm mb-3 leading-relaxed flex-1">
            {description.split('\n').map((line, index) => {
              const trimmedLine = line.trim()
              if (!trimmedLine) return null
              return (
                <div key={index} className="text-left mb-1">
                  {trimmedLine.replace(/^•\s*/, '')}
                </div>
              )
            })}
          </div>
        )}

        {purpose && (
          <p className="text-primary-600 text-xs font-medium mb-4 bg-primary-50 px-3 py-1 rounded-full inline-block">
            {purpose}
          </p>
        )}
      </div>

      <div className="p-6 pt-0 border-t border-gray-200">
        {price !== null && price !== undefined && (
          <div className="flex items-center justify-between mb-4">
            <div className="text-left">
              {price === 0 ? (
                <div className="text-2xl font-bold text-gradient bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  FREE
                </div>
              ) : (
                <div className="text-2xl font-bold text-gradient">₱{price.toFixed(2)}</div>
              )}
              <div className="text-xs text-gray-500">Estimated price</div>
            </div>
          </div>
        )}

        {onAddToRequest && (
          <button
            onClick={() => onAddToRequest(id)}
            className="btn-primary w-full flex items-center justify-center space-x-2"
            aria-label="Add to request"
          >
            <span>Request Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}


