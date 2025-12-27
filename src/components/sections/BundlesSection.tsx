import { Link } from 'react-router-dom'
import BundleCard from '../cards/BundleCard'

interface BundlesSectionProps {
  bundles: any[]
}

export default function BundlesSection({ bundles }: BundlesSectionProps) {
  if (!bundles || bundles.length === 0) return null

  return (
    <section
      id="bundles"
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 py-12 sm:py-14 md:py-16"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white via-white/70 to-gray-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white via-white/70 to-gray-50" />

      <div className="relative container mx-auto px-4 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-8 sm:mb-10 md:mb-12">
          Service Bundles
        </h2>
        <div className="w-full max-w-6xl mx-auto">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent hidden sm:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent hidden sm:block" />

            <div className="mb-8 sm:mb-10 md:mb-12 flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory justify-start pr-6 sm:pr-8 md:pr-10">
              {bundles.map((b: any) => {
                const rawLevel = (b as any).level
                const level: 'Basic' | 'Standard' | 'Advanced' | 'Premium' =
                  rawLevel === 'Basic' ||
                  rawLevel === 'Standard' ||
                  rawLevel === 'Advanced' ||
                  rawLevel === 'Premium'
                    ? rawLevel
                    : 'Standard'

                const included = (b as any).includedServices || (b as any).included_service_titles

                const category =
                  (b as any).category?.id || (b as any).category?.name || (b as any).category

                return (
                  <div
                    key={b.id}
                    className="snap-center flex-shrink-0 w-64 sm:w-72 md:w-1/2 lg:w-1/4"
                  >
                    <BundleCard
                      id={b.id}
                      title={b.title}
                      description={b.description}
                      price={typeof b.price === 'number' ? Number(b.price) : 0}
                      level={level}
                      includedServices={included}
                      category={category}
                      icon={b.icon}
                    />
                  </div>
                )
              })}

              <div className="snap-center flex-shrink-0 w-64 sm:w-72 md:w-1/2 lg:w-1/4">
                <Link
                  to="/bundles"
                  className="group flex h-full min-h-[20rem] sm:min-h-[22rem] md:min-h-[24rem] flex-col justify-between rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 p-6 sm:p-7 md:p-8 text-white shadow-sm hover:shadow-md transition-shadow text-left"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wide">
                      Bundles
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-semibold">
                      View All Bundles
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 max-w-xs">
                      See every bundle, compare inclusions, and pick the best value for your devices.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm sm:text-base font-semibold">
                    <span>Browse bundles</span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 border border-white/20">
                      →
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


