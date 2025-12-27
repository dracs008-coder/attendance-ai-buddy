import { Link } from 'react-router-dom'
import { ShoppingCart, Eye, Star } from 'lucide-react'
import { safelyLinkifyText } from '../../utils/linkUtils'

interface ProductCardProps {
  id: string
  name: string
  description?: string
  price: number
  image_url?: string
  stock?: number
  featured?: boolean
  category?: string
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  image_url,
  stock,
  featured,
  category,
}: ProductCardProps) {
  const isOutOfStock = typeof stock === 'number' && stock <= 0

  const safeDescription = description
    ? safelyLinkifyText(description)
    : ''

  return (
    <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-lg shadow-sm hover:shadow-md transition-shadow relative flex flex-col h-full">
      {featured && (
        <div className="absolute top-4 right-4 bg-primary-yellow text-primary-dark px-3 py-1 rounded-full text-xs font-semibold z-10 flex items-center gap-1.5">
          <Star className="w-4 h-4 flex-shrink-0" />
          <span>Featured</span>
        </div>
      )}

      <div className="relative w-full h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-4xl">📦</span>
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="mb-4 flex-grow product-content">
        {category && (
          <span className="text-xs text-gray-500 uppercase tracking-wide mb-2 inline-block">
            {category}
          </span>
        )}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{name}</h3>
        {description && (
          <div
            className="text-gray-600 text-sm mb-3 line-clamp-2 product-description"
            dangerouslySetInnerHTML={{ __html: safeDescription }}
          />
        )}
      </div>

      <div className="mb-4">
        <span className="text-2xl font-bold text-primary-blue">₱{price.toFixed(2)}</span>
        {typeof stock === 'number' && (
          <p className="text-xs text-gray-500 mt-1">
            {stock > 0 ? `${stock} in stock` : 'Out of stock'}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2 mt-auto">
        <Link
          to={`/products/${id}`}
          className="flex-1 btn-outline flex items-center justify-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>View</span>
        </Link>
        <button
          disabled={isOutOfStock}
          className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => {
            window.location.href = `/products/${id}?action=contact`
          }}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Contact</span>
        </button>
      </div>
    </div>
  )
}


