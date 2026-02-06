'use client';

import React, { useState, useEffect } from 'react';
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
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Cinematic Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <SectionWrapper className="relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center mb-20 px-4">
          <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-violet-400 text-[10px] font-black tracking-[0.2em] uppercase mb-6">
            {t.badge}
          </div>
          
          <SectionTitle className="mb-8">
            {t.title_main} <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 font-script normal-case tracking-normal">{t.title_italic}</span>
          </SectionTitle>

          <p className="text-gray-400 text-sm md:text-base lg:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        {/* The 3 Departments List */}
        <ServicesList />

        {/* Final CTA */}
        <div className="mt-20 text-center px-4">
          <div className="inline-flex flex-col items-center gap-6 p-10 md:p-16 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm relative overflow-hidden group">
            {/* CTA Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight relative z-10">
              Ready to <span className="text-violet-400">elevate</span> your brand?
            </h2>
            <AnimatedButton 
              href="/contact" 
              showIcon 
              className="px-12 py-5 text-xs font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 border-none shadow-2xl shadow-violet-500/20 relative z-10"
            >
              Get Started Now
            </AnimatedButton>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}