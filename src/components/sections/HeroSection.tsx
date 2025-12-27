import { Link } from 'react-router-dom'
import RobotIntro from '../3d/RobotIntro'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 md:py-14">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/A%20man%20sitting.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-20 container mx-auto px-4 flex justify-center">
        <div className="bg-white p-3 sm:p-5 rounded-xl shadow-md w-full max-w-[16rem] sm:max-w-md md:max-w-lg mx-auto hero-fade-up">
          <h1 className="mb-3 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-snug text-gray-900">
            Empower Your Tech Journey <span className="text-primary-600">with Ease</span>
          </h1>
          <p className="mb-6 text-xs sm:text-sm md:text-base text-gray-800">
            One platform for expert repairs, smart bundles, and premium products.
          </p>
          <p className="mb-6 text-[11px] sm:text-xs text-gray-600 italic">
            GigaEase technician providing on-site support
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-start">
            <Link
              to="/request"
              className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-2.5 md:text-base"
            >
              Request a Technician
            </Link>
            <Link
              to="/account/register"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-900 shadow-sm transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-2.5 md:text-base"
            >
              Get Started
            </Link>
          </div>
          <div className="mt-5 w-full rounded-2xl p-2 sm:p-3">
            <RobotIntro className="h-72 sm:h-80 md:h-96" />
          </div>
        </div>
      </div>
    </section>
  )
}


