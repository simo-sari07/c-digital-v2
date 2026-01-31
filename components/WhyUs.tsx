'use client';

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [lang, setLang] = useState('en');
  const [mounted, setMounted] = useState(false);

  // 1. Logic dial Language Detection
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

  const t = dictionaries[lang]?.why_us || dictionaries.en.why_us;

  // 2. GSAP Animations (Intact)
  useLayoutEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current, 
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 1.2, ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [mounted, lang]);

  if (!mounted) return null;

  return (
    <section ref={containerRef} data-bgcolor="#0f0714" className="bg-black overflow-hidden relative font-sans">
      <SectionWrapper id="why-us">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-24">
            <span className="text-violet-500 font-black tracking-[0.5em] text-xs uppercase mb-6 block">
              {t.badge}
            </span>
            <SectionTitle className="mb-8">
              {t.title_main} <span className="font-script text-violet-400 normal-case">{t.title_script}</span>, <br />
              {t.title_sub}
            </SectionTitle>
            <p className="text-gray-400 text-lg lg:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              {t.description}
            </p>
          </div>

          {/* Features Grid Mapping Dynamique */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {t.features.map((feature: any, idx: number) => (
              <div 
                key={idx} 
                ref={el => { cardsRef.current[idx] = el; }}
                className="group relative p-10 lg:p-14 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 hover:border-violet-500/20 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]"></div>
                
                <div className="relative z-10">
                  <span className="text-violet-500/40 font-black text-5xl mb-8 block group-hover:text-violet-500 transition-colors">
                    0{idx + 1}
                  </span>
                  <h4 className="text-white font-bold text-2xl lg:text-3xl mb-4 uppercase tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 text-base lg:text-lg leading-relaxed font-medium group-hover:text-gray-400 transition-colors">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </SectionWrapper>
    </section>
  );
}