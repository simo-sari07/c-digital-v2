'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Code, ShoppingBag, Clapperboard, ArrowRight } from 'lucide-react';

// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

const iconMap: Record<number, any> = {
  0: Code,
  1: ShoppingBag,
  2: Clapperboard,
};

const bentoSpans: Record<number, string> = {
  0: "lg:col-span-4 lg:row-span-1",
  1: "lg:col-span-4 lg:row-span-1",
  2: "lg:col-span-4 lg:row-span-1",
};

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
          y: 40,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
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
    <div ref={containerRef} className="w-full py-10 px-4 md:px-8 xl:px-4 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {t.items.map((service: any, index: number) => {
          const Icon = iconMap[index % 3];
          const spanClass = bentoSpans[index % 3] || "lg:col-span-4";
          
          return (
            <div 
              key={index}
              className={`service-card group relative flex flex-col bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 overflow-hidden transition-all duration-700 hover:bg-white/[0.04] hover:border-violet-500/20 hover:shadow-[0_40px_100px_rgba(124,58,237,0.05)] min-h-[320px] ${spanClass}`}
            >
              <div className="relative z-20 h-full flex flex-col">
                {/* Header: Icon & Type */}
                <div className="flex justify-between items-start mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-violet-600/20 blur-2xl rounded-full" />
                    <Icon size={24} className="text-violet-400 relative z-10" />
                  </div>
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] group-hover:text-violet-500/40 transition-colors">
                    SERVICE
                  </span>
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col justify-end">
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-tighter leading-tight transition-all duration-500 group-hover:text-gradient">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium opacity-60 group-hover:opacity-100 transition-opacity max-w-[90%] mb-10">
                    {service.desc}
                  </p>

                  {/* High-End Action Button (Always aligned at bottom) */}
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-3 text-[10px] font-black text-white/50 group-hover:text-white transition-all duration-500">
                      <span className="tracking-[0.2em] relative">
                        EXPLORE DEPARTMENT
                        <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-violet-500 group-hover:w-full transition-all duration-500" />
                      </span>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-violet-600 group-hover:border-violet-500 transition-all duration-500 transform group-hover:translate-x-1">
                        <ArrowRight size={14} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Invisible Hover Link Overlay */}
                <Link href={`/services/${service.id}`} className="absolute inset-0 z-30" />
              </div>

              {/* Ghost Background Icon */}
              <div className="absolute bottom-4 right-4 opacity-[0.03] transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-12 group-hover:opacity-[0.07]">
                 <Icon size={160} strokeWidth={0.5} />
              </div>

              {/* Bottom Glow */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
