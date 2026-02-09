'use client';

import React, { useState, useEffect, useRef } from 'react';
import SectionWrapper from '@/components/SectionWrapper';
import SectionTitle from '@/components/SectionTitle';
import ServicesList from '@/components/ServicesList';
import AnimatedButton from '@/components/AnimatedButton';
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

export default function ServicesPage() {
  const [lang, setLang] = useState('en');
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

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

  const t = dictionaries[lang]?.services_departments || dictionaries.en.services_departments;

  if (!mounted) return null;

  return (
    <main ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      {/* Cinematic Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <SectionWrapper className="relative z-10 pt-32 pb-10">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex flex-col gap-4 mb-4">
              <span className="text-violet-500 font-black text-[10px] uppercase tracking-[0.3em] opacity-80">
                OUR EXPERTISE
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
              {t.title_main} <span className="text-gradient font-script normal-case tracking-normal inline-block contrast-125">{t.title_italic}</span>
            </h1>

            <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto opacity-70">
              {t.description}
            </p>
          </div>
        </div>

        {/* The Bento Grid List */}
        <ServicesList />

        {/* Bento Final CTA */}
        <div className="mt-40 px-4">
          <div className="max-w-7xl mx-auto p-12 md:p-24 rounded-[3rem] bg-gradient-to-br from-violet-600 to-fuchsia-600 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-white/10 blur-[120px] rounded-full animate-pulse" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-center md:text-left">
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-6">
                  READY TO <br /> SCALE?
                </h2>
                <p className="text-white/80 text-lg md:text-xl font-medium max-w-md">
                  Let's discuss how our bento-style design and high-tech engineering can elevate your brand.
                </p>
              </div>
              
              <AnimatedButton 
                href="/contact" 
                showIcon={false}
                className="px-12 py-6 text-sm font-black bg-white text-violet-600 border-none shadow-2xl hover:scale-105 transition-transform"
              >
                START A PROJECT
              </AnimatedButton>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}