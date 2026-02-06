'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Code, ShoppingBag, Clapperboard, ArrowRight, Check } from 'lucide-react';
import AnimatedButton from './AnimatedButton';
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

const icons: any = {
  development: <Code className="w-8 h-8 md:w-10 md:h-10 text-violet-400 group-hover:scale-110 transition-transform duration-500" />,
  ecommerce: <ShoppingBag className="w-8 h-8 md:w-10 md:h-10 text-fuchsia-400 group-hover:scale-110 transition-transform duration-500" />,
  production: <Clapperboard className="w-8 h-8 md:w-10 md:h-10 text-violet-400 group-hover:scale-110 transition-transform duration-500" />,
};

gsap.registerPlugin(ScrollTrigger);

export default function ServicesList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState('en');

  useEffect(() => {
    setMounted(true);
    const updateLang = () => {
      setLang(document.documentElement.lang || 'en');
    };
    updateLang();
    const observer = new MutationObserver(updateLang);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.service-card');
      
      gsap.fromTo(cards, 
        { 
          opacity: 0, 
          y: 60, 
          scale: 0.9 
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  const t = dictionaries[lang]?.services_departments || dictionaries.en.services_departments;

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="w-full py-20 px-4 md:px-8 xl:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {t.items.map((service: any, index: number) => (
          <div 
            key={service.id}
            className="service-card group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.08] hover:border-violet-500/30 hover:shadow-[0_20px_50px_rgba(124,58,237,0.15)] overflow-hidden"
          >
            {/* Background Gradient Detail */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Header: Icon & Number */}
            <div className="flex justify-between items-start mb-8">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-violet-500/30 transition-colors duration-500">
                {icons[service.id]}
              </div>
              <span className="text-4xl font-black text-white/5 select-none transition-colors duration-500 group-hover:text-violet-500/10">
                0{index + 1}
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-violet-400">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 font-medium">
                {service.desc}
              </p>

              {/* Features List */}
              <ul className="space-y-3 mb-10">
                {service.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-xs md:text-sm font-semibold text-white/70">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                      <Check size={12} className="text-violet-400" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link href={`/services/${service.id}`} className="block w-full">
                <AnimatedButton 
                  showIcon 
                  variant="secondary" 
                  className="w-full mt-auto py-4 border-white/10 group-hover:border-violet-500/40 group-hover:bg-violet-500/[0.05] transition-all duration-500 pointer-events-none"
                >
                  {t.cta}
                </AnimatedButton>
              </Link>
            </div>
            
            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
