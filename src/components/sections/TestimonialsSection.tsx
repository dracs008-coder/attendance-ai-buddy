import { Quote, Star } from 'lucide-react'

interface Testimonial {
  quote: string
  name: string
  role: string
}

const TESTIMONIALS: Testimonial[] = [
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

export default function TestimonialsSection() {
  return (
    <section className="relative py-16 sm:py-18 md:py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 text-center flex flex-col items-center">
        <span className="inline-block mb-4 sm:mb-5 md:mb-6 rounded-full bg-primary-50 px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-semibold text-primary-600">
          Testimonials
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
          What Our{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
            Customers Say
          </span>
        </h2>
        <p className="mb-8 sm:mb-10 md:mb-12 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Join thousands of satisfied customers who trust GigaEase for their tech needs
        </p>
        <div className="w-full max-w-6xl mx-auto">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-purple-50 via-purple-50/80 to-transparent hidden sm:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-purple-50 via-purple-50/80 to-transparent hidden sm:block" />

            <div className="mb-8 sm:mb-10 md:mb-12 flex gap-4 sm:gap-6 items-stretch overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory justify-start">
              {TESTIMONIALS.map(({ quote, name, role }, idx) => (
                <figure
                  key={idx}
                  className="snap-center flex-shrink-0 w-72 sm:w-80 md:w-96 lg:w-1/3 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-lg shadow-sm p-6 sm:p-7 md:p-8 text-left flex flex-col h-full"
                >
                  <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-primary-300 mb-3 sm:mb-4" />
                  <div className="flex mb-3 sm:mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400 mr-1"
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 flex-1 text-sm sm:text-base">
                    “{quote}”
                  </blockquote>
                  <hr className="border-gray-200 my-4 sm:my-6" />
                  <div className="space-y-0.5">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{name}</p>
                    <p className="text-[11px] sm:text-xs text-gray-500">{role}</p>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


