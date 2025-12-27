import { Link } from 'react-router-dom'
import ProductCard from '../cards/ProductCard'

interface StoreTeaserProps {
  products: any[]
}

export default function StoreTeaserSection({ products }: StoreTeaserProps) {
  if (!products || products.length === 0) return null

  return (
    <section id="products" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center">
          Featured Products
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Quality tech accessories and equipment to complement our services
        </p>

        <div className="mt-12 bg-white rounded-3xl shadow-soft p-6 md:p-8">
          <div className="mb-12 flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {products.map((p: any) => (
              <div key={p.id} className="snap-start flex-shrink-0 w-64 md:w-auto">
                <ProductCard
                  id={p.id}
                  name={p.name || p.title}
                  description={p.description}
                  price={Number(p.price ?? 0)}
                  image_url={p.image_url}
                  stock={p.stock}
                  featured={!!p.featured}
                  category={p.category?.name || p.category}
                />
              </div>
            ))}
          </div>

          <hr className="my-6 border-gray-200" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold text-gray-900">Shop Our Store</h3>
              <p className="text-gray-600 text-sm">
                Browse our full collection of tech products
              </p>
            </div>
            <Link
              to="/products"
              className="group inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition hover:bg-primary-700"
            >
              View Store
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}


