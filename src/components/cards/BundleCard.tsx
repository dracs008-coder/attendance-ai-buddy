import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'

interface BundleCardProps {
  id: string
  title: string
  description?: string
  price: number
  level: 'Basic' | 'Standard' | 'Advanced' | 'Premium'
  includedServices?: string[]
  category?: string
  icon?: string
}

const levelColors: Record<BundleCardProps['level'], string> = {
  Basic: 'bg-green-100 text-green-800 border-green-300',
  Standard: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  Advanced: 'bg-blue-100 text-blue-800 border-blue-300',
  Premium: 'bg-purple-100 text-purple-800 border-purple-300',
}

export default function BundleCard({
  title,
  description,
  price,
  level,
  includedServices,
  id,
  category,
  icon,
}: BundleCardProps) {
  const isImageIcon =
    !!icon &&
    (icon.startsWith('http') ||
      icon.startsWith('/') ||
      icon.startsWith('data:') ||
      icon.startsWith('blob:'))

  return (
    <div className="h-full flex flex-col justify-between rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-lg shadow-sm hover:shadow-md p-6 relative transition-shadow">
      <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${levelColors[level]} z-10`}>
        {level}
      </div>

      <div className="mb-4">
        <div className="flex flex-col mb-3">
          <div className="w-full h-24 rounded-xl bg-gray-100 mb-3 flex items-center justify-center overflow-hidden">
            <img
              src={isImageIcon ? icon! : '/Default Image.jpg'}
              alt={title}
              className="w-full h-full object-cover"
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
          <h3 className="text-xl font-bold text-gray-900 flex-1">{title}</h3>
        </div>
        {description && (
          <div className="text-gray-600 text-sm mb-4">
            <div className="space-y-1.5">
              {description.split('\n').map((line, index) => {
                const trimmedLine = line.trim()
                if (!trimmedLine) return null
                return (
                  <div key={index} className="text-xs text-gray-700 leading-relaxed">
                    {trimmedLine.replace(/^•\s*/, '')}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <div className="mb-4 flex-grow">
        {includedServices && includedServices.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-gray-900 mb-2">Package Includes:</p>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <ul className="space-y-1.5 max-h-64 overflow-y-auto">
                {includedServices.map((service, index) => (
                  <li key={index} className="flex items-start text-xs text-gray-700">
                    <Check className="w-3.5 h-3.5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="text-left">
            {price === 0 ? (
              <div className="text-2xl font-bold text-gradient bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                FREE
              </div>
            ) : (
              <div className="text-2xl font-bold text-gradient">₱{price.toFixed(2)}</div>
            )}
            <div className="text-xs text-gray-500">Starting price</div>
          </div>
        </div>

        <Link
          to={`/request?bundle=${id}${category ? `&category=${category}` : ''}`}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <span>Request Now</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}


