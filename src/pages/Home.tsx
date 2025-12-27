import { useEffect, useState } from 'react'
import { getServicesServer, getBundlesServer, getProductsServer, getPostsServer } from '../lib/server-data'
import StructuredData from '../components/StructuredData'
import ScrollReveal from '../components/ScrollReveal'
import HeroSection from '../components/sections/HeroSection'
import { ContainerScroll } from '../components/ui/container-scroll-animation'
import RobotIntro from '../components/3d/RobotIntro'
import ValuePropositionBand from '../components/sections/ValuePropositionBand'
import ServicesSection from '../components/sections/ServicesSection'
import BundlesSection from '../components/sections/BundlesSection'
import WebsiteDevServicesSection from '../components/sections/WebsiteDevServicesSection'
import StoreTeaserSection from '../components/sections/StoreTeaserSection'
import AnimatedTestimonialsSection from '../components/sections/AnimatedTestimonialsSection'
import HomeFeedClient from '../components/sections/HomeFeedClient'

type Service = any
type Bundle = any
type Product = any
type Post = any

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([])
  const [bundles, setBundles] = useState<Bundle[]>([])
  const [webDevServices, setWebDevServices] = useState<Service[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const [servicesAll, bundlesAll, productsAll, postsAll] = await Promise.all([
          getServicesServer(),
          getBundlesServer(),
          getProductsServer(),
          getPostsServer(),
        ])

        if (cancelled) return

        const servicesData = (servicesAll || [])
          .slice()
          .sort((a: any, b: any) => Number(a?.price ?? 0) - Number(b?.price ?? 0))
          .slice(0, 5)

        const bundlesData = (bundlesAll || [])
          .slice()
          .sort((a: any, b: any) => Number(a?.price ?? 0) - Number(b?.price ?? 0))
          .slice(0, 5)

        const featured = (productsAll || [])
          .filter((p: any) => p?.status === 'active' && p?.featured)
          .slice(0, 4)

        setServices(servicesData)
        const webFilter = (servicesAll || []).filter((s: any) => {
          const catName = (s?.category?.name || '').toString().toLowerCase()
          const catId = (s?.category_id || s?.category || '').toString().toLowerCase()
          const title = (s?.title || '').toString().toLowerCase()
          return catName.includes('website') || catId.includes('website') || title.includes('website')
        }).slice(0,5)
        setWebDevServices(webFilter)
        setBundles(bundlesData)
        setFeaturedProducts(featured)
        setPosts(postsAll || [])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:5173'

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GigaEase',
    url: baseUrl,
  }

  return (
    <div className="min-h-screen flex flex-col">
      <StructuredData data={webSiteSchema} id="website-jsonld" />
      <ScrollReveal />

      <HeroSection />

      {/* Second hero: Container Scroll (Aceternity-style) with technician over tower background */}
      <section className="relative flex flex-col items-center justify-center -mt-20 py-0 px-4 sm:px-6 md:px-8">
        <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-2/3 h-[90%] pointer-events-none select-none">
          <img
            src="/Tower.png"
            alt="Decorative office tower background"
            className="w-full h-full object-contain object-left opacity-25 scale-110"
          />
        </div>

        <ContainerScroll
          titleComponent={
            <div className="space-y-4 relative z-10 sm:-translate-y-28">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-gray-900 dark:text-white">
                Empower Your Tech Journey <span className="text-primary-600">with Ease</span>
              </h2>
              <p className="text-sm sm:text-base text-primary-700 dark:text-primary-300 max-w-2xl mx-auto">
                One platform for expert repairs, smart bundles, and premium products.
              </p>
            </div>
          }
        >
          <div className="relative h-full w-full flex items-end justify-center">
            <img
              src="/Technician-no background.png"
              alt="GigaEase technician providing on-site support"
              className="relative z-10 max-h-full w-auto object-contain drop-shadow-2xl"
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/80 to-transparent" />
          </div>
        </ContainerScroll>
      </section>

      <div className="components-wrapper relative z-20 -mt-8 sm:-mt-10 md:-mt-12 mx-auto mb-10 sm:mb-14 md:mb-[60px] w-full max-w-[1200px] min-h-[320px] sm:min-h-[360px] md:min-h-[400px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] border border-gray-300 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.05)] px-4 sm:px-6 md:px-8">
        <ValuePropositionBand />
        <ServicesSection services={services} />
        <WebsiteDevServicesSection services={webDevServices} />
        <BundlesSection bundles={bundles} />
        <StoreTeaserSection products={featuredProducts} />
        <AnimatedTestimonialsSection />
      </div>

      {posts.length > 0 && (
        <section
          id="technician-posts"
          className="bg-gradient-to-b from-gray-50 via-white to-gray-100 border-t border-gray-100 py-16 sm:py-20 md:py-24"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-10 sm:mb-12 text-center">
              <span className="inline-flex items-center rounded-full bg-primary-50 px-3 sm:px-4 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-primary-700">
                From our technicians
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                Technician Insights
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                Practical tips, guides, and behind-the-scenes fixes from GigaEase experts to help you get more from your tech.
              </p>
            </div>

            <HomeFeedClient posts={posts} />
          </div>
        </section>
      )}
    </div>
  )
}


