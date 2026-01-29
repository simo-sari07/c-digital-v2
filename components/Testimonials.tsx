"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';

const testimonials = [
  {
    category: "Design Quality",
    quote: "Cool theme, cool team! Thanks a lot for the theme and quick resolving the issue. BR, Eduard",
    handle: "edosik1312",
    stars: 5
  },
  {
    category: "Customer Support",
    quote: "Great customer support, very quick and efficient. 10/10 would recommend!",
    handle: "juandeveloper03",
    stars: 5
  },
  {
    category: "Feature Availability",
    quote: "This theme is amazing just need to learn customization properly. Their support team is very cooperative.",
    handle: "masoodhusain007",
    stars: 5
  },
  {
    category: "Design Quality",
    quote: "Thank you very much! I appreciate, you have a 5 star theme. It's really worth it!",
    handle: "luigik99",
    stars: 5
  },
  {
    category: "Feature Availability",
    quote: "Really well designed templates. Well documented. Looking forward for WordPress theme.",
    handle: "shykeys",
    stars: 5
  },
  {
    category: "Design Quality",
    quote: "Grate template and grate code I love the modern designs with many deferent styles to choose. I recommend this template any one who wants to display advanced features and user friendly code.",
    handle: "edosik1312",
    stars: 5
  },
  {
    category: "Customer Support",
    quote: "Very helpful and quick support!",
    handle: "luigik99",
    stars: 5
  },
  {
    category: "Documentation Quality",
    quote: "easy to use and a very great customer service",
    handle: "shykeys",
    stars: 5
  },
  {
    category: "Customizability",
    quote: "Extreme flexiblity and easy to customize.",
    handle: "masoodhusain007",
    stars: 5
  }
];

// Split data into two rows for marquee
const ROW_1 = testimonials.slice(0, 5);
const ROW_2 = testimonials.slice(4);

// --- Sub-Components ---

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index ? index * 0.1 : 0 }}
    className="flex-shrink-0 w-full md:w-[450px] bg-neutral-900/40 p-6 md:p-8 border border-white/5 rounded-[2rem] md:rounded-[2.5rem] hover:bg-neutral-800/50 transition-all duration-300 group select-none"
  >
    {/* Header: Stars & Category */}
    <div className="flex flex-col gap-2 mb-6">
      <div className="flex gap-1">
        {[...Array(testimonial.stars)].map((_, i) => (
          <svg key={i} className="w-3 h-3 text-orange-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <h4 className="text-white font-bold text-base tracking-tight group-hover:text-accent transition-colors">
        {testimonial.category}
      </h4>
    </div>

    {/* Body: Quote */}
    <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed italic">
      "{testimonial.quote}"
    </p>

    {/* Footer: Profile */}
    <div className="flex items-center gap-3 mt-auto pt-6 border-t border-white/5">
      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
        <div className="w-4 h-4 text-accent">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
      <span className="text-gray-300 font-bold text-xs md:text-sm tracking-wide">
        {testimonial.handle}
      </span>
    </div>
  </motion.div>
);

const TestimonialMarquee = ({ items, reverse = false }: { items: typeof testimonials, reverse?: boolean }) => (
  <div className="flex w-full group overflow-hidden">
    <div className={`flex flex-nowrap w-max gap-6 py-4 ${reverse ? 'animate-marquee-slow-reverse' : 'animate-marquee-slow'} will-change-transform`}>
      {/* Repeated exactly twice for a perfect -50% seamless loop */}
      {[...items, ...items].map((t, i) => (
        <TestimonialCard key={`testimonial-${i}`} testimonial={t} />
      ))}
    </div>
  </div>
);

const MobileTestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative px-6 flex flex-col items-center">
      <div className="w-full relative overflow-hidden min-h-[350px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 w-full"
          >
            <TestimonialCard testimonial={testimonials[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-8 mt-12 pb-8">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 active:scale-95 transition-all"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-accent w-4' : 'bg-white/20'}`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 active:scale-95 transition-all"
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default function Testimonials() {
  return (
    <section id="testimonials" data-bgcolor="#000000" className="bg-black py-24 md:py-32 overflow-hidden w-full relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-12 md:mb-20 relative z-30">
        <SectionTitle className="mb-6 text-3xl md:text-5xl lg:text-7xl">
          The Only <span className="font-script text-accent normal-case">Testimonials</span> <br className="hidden md:block" /> You'll Ever Need
        </SectionTitle>
        <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base lg:text-lg font-medium leading-relaxed">
          Rejoignez des centaines de clients satisfaits qui ont transformé leur vision numérique avec chartgrafique.
        </p>
      </div>

      {/* Desktop Marquee Design */}
      <div className="hidden md:flex flex-col gap-2 relative w-full">
        <div className="absolute inset-y-0 left-0 w-[15%] md:w-[25%] bg-gradient-to-r from-black via-black/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[15%] md:w-[25%] bg-gradient-to-l from-black via-black/90 to-transparent z-20 pointer-events-none" />

        <TestimonialMarquee items={ROW_1} />
        <TestimonialMarquee items={ROW_2} reverse />
      </div>

      {/* Mobile Slider Design */}
      <div className="md:hidden">
        <MobileTestimonialSlider />
      </div>

      <style jsx global>{`
            @keyframes marquee-slow {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-50% - 12px)); }
            }
            @keyframes marquee-slow-reverse {
                0% { transform: translateX(calc(-50% - 12px)); }
                100% { transform: translateX(0); }
            }
            .animate-marquee-slow {
                animation: marquee-slow 80s linear infinite;
            }
            .animate-marquee-slow-reverse {
                animation: marquee-slow-reverse 80s linear infinite;
            }
            .group:hover .animate-marquee-slow,
            .group:hover .animate-marquee-slow-reverse {
                animation-play-state: paused;
            }
        `}</style>
    </section>
  );
}

