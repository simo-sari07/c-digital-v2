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
    <div ref={containerRef} className="w-full max-w-7xl mx-auto py-32 space-y-48">
      {t.items.map((service: any, index: number) => {
        const isFirst = index % 2 === 0;
        return (
          <div 
            key={service.id}
            className={`service-card flex flex-col ${isFirst ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center px-4 md:px-8`}
          >
            {/* Visual Block */}
            <div className="w-full lg:w-1/2 relative aspect-square md:aspect-video lg:aspect-square rounded-[3rem] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl border border-white/10 group-hover:border-violet-500/30 transition-colors duration-500" />
              
              {/* Massive Floating Icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative transform group-hover:scale-110 transition-transform duration-700">
                  <div className="absolute inset-0 bg-violet-500/20 blur-[60px] rounded-full animate-aura" />
                  <div className="relative p-12 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl">
                    {icons[service.id]}
                  </div>
                </div>
              </div>
              
              {/* Diagonal Number Backdrop */}
              <span className="absolute top-10 right-10 text-[12rem] font-black text-white/[0.03] select-none leading-none">
                0{index + 1}
              </span>
            </div>

            {/* Content Block */}
            <div className={`w-full lg:w-1/2 flex flex-col ${isFirst ? 'lg:items-start' : 'lg:items-end'} text-center ${isFirst ? 'lg:text-left' : 'lg:text-right'}`}>
              <div className="inline-block px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-[10px] font-black tracking-[0.2em] uppercase mb-6">
                Department 0{index + 1}
              </div>
              
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
                {service.title}
              </h3>
              
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 font-medium max-w-xl">
                {service.desc}
              </p>

              {/* Features Grid-style List */}
              <div className={`flex flex-wrap gap-4 mb-12 ${isFirst ? 'justify-start' : 'justify-end'}`}>
                {service.features.map((feature: string, i: number) => (
                  <div key={i} className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs md:text-sm font-bold text-white/80 hover:border-violet-500/30 transition-colors cursor-default">
                    {feature}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link href={`/services/${service.id}`}>
                <AnimatedButton 
                  showIcon 
                  variant="primary" 
                  className="px-10 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 border-none shadow-xl shadow-violet-500/10"
                >
                  {t.cta}
                </AnimatedButton>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
