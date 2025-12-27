import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "GigaEase fixed my laptop in no time and saved my business presentation! Highly recommended.",
    name: "Sarah L.",
    designation: "Startup Founder",
    src: "/A man sitting.png",
  },
  {
    quote:
      "Their bundle packages are a great value. I got my phone screen and battery replaced for less.",
    name: "Mark D.",
    designation: "Remote Worker",
    src: "/Default Image.jpg",
  },
  {
    quote:
      "Fast, reliable, and friendly service. The 3D robot intro blew me away!",
    name: "Aisha K.",
    designation: "Homeowner",
    src: "/Auth Background.png",
  },
];

export default function AnimatedTestimonialsSection({
  autoplay = false,
  className,
}: {
  autoplay?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const isActive = (index: number) => index === active;

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <section
      className={cn(
        "py-16 sm:py-18 md:py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-white",
        className,
      )}
    >
      <div className="max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <span className="inline-block mb-4 rounded-full bg-primary-50 px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-semibold text-primary-600">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            What Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
              Customers Say
            </span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {TESTIMONIALS.map((t, idx) => (
                <motion.img
                  key={t.src}
                  src={t.src}
                  alt={t.name}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(idx) ? 1 : 0.7,
                    scale: isActive(idx) ? 1 : 0.95,
                    z: isActive(idx) ? 0 : -100,
                    rotate: isActive(idx) ? 0 : randomRotateY(),
                    zIndex: isActive(idx)
                      ? 999
                      : TESTIMONIALS.length + 2 - idx,
                    y: isActive(idx) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 h-full w-full rounded-3xl object-cover object-center"
                  draggable={false}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Quote side */}
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex flex-col justify-between h-full"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {TESTIMONIALS[active].name}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {TESTIMONIALS[active].designation}
              </p>
              <motion.p className="text-lg text-gray-700">
                {TESTIMONIALS[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                    animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: 'easeInOut',
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </div>
            <div className="flex gap-4 pt-8">
              <button
                onClick={handlePrev}
                className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center group/button"
              >
                <ArrowLeft className="h-5 w-5 text-gray-900 group-hover/button:rotate-12 transition-transform duration-300" />
              </button>
              <button
                onClick={handleNext}
                className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center group/button"
              >
                <ArrowRight className="h-5 w-5 text-gray-900 group-hover/button:-rotate-12 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
