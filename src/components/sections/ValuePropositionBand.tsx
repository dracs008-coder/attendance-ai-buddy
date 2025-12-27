import { Wrench, Globe, Package, ShoppingBag } from 'lucide-react'

const FEATURES = [
  {
    icon: Wrench,
    title: 'Tech Repair & Support',
    desc: 'Device diagnostics, fixes, and IT help for home and business.',
  },
  {
    icon: Globe,
    title: 'Website & Digital Services',
    desc: 'Done-for-you websites, optimizations, and ongoing site care.',
  },
  {
    icon: Package,
    title: 'Service Bundles',
    desc: 'Pre-built packages that combine multiple services for better value.',
  },
  {
    icon: ShoppingBag,
    title: 'Tech Products & Add‑ons',
    desc: 'Curated accessories and gear that complement your services.',
  },
]

export default function ValuePropositionBand() {
  return (
    <section className="bg-white rounded-3xl shadow-soft overflow-hidden py-12">
      <div className="container mx-auto px-4">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden no-scrollbar md:grid md:grid-cols-4 md:gap-8">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="snap-start flex-shrink-0 w-56 rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow transition hover:-translate-y-1 hover:shadow-lg md:w-auto"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


