'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

// Assets li maktbedelch (images/colors)
const serviceAssets = [
  { image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop", color: "accent" },
  { image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop", color: "secondary" },
  { image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop", color: "pink" },
  { image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=764&auto=format&fit=crop", color: "orange" },
  { image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop", color: "blue" },
  { image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?q=80&w=2029&auto=format&fit=crop", color: "purple" }
];

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

  const t = dictionaries[lang]?.services_page || dictionaries.en.services_page;

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden pb-32 pt-44 font-sans">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
      
      <main className="relative z-10 max-w-7xl mx-auto px-6">
        {/* SEO Header Dynamique */}
        <div className="text-center mb-40">
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">{t.badge}</span>
          <h1 className="text-5xl md:text-[80px] font-black uppercase tracking-tighter leading-none mb-8">
            {t.title_main} <span className="text-gradient italic font-script lowercase">{t.title_italic}</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Services List Mapping Dynamique */}
        <div className="space-y-48">
          {t.list.map((service: any, idx: number) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 lg:gap-32 items-center`}>
              
              {/* Visual Side */}
              <div className="w-full md:w-1/2 group relative">
                <div className="relative aspect-[4/3] bg-muted/20 border border-white/5 rounded-[3rem] overflow-hidden transition-all duration-700 hover:border-accent/30 shadow-2xl">
                  <img 
                    src={serviceAssets[idx].image} 
                    alt={service.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-1">{service.tagline}</p>
                    <h4 className="text-sm font-black uppercase">{service.title}</h4>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
                  {service.title}
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                  {service.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
                  {service.features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 group/feat">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center group-hover/feat:bg-accent transition-all">
                        <CheckCircle className="text-accent group-hover/feat:text-white" size={14} />
                      </div>
                      <span className="text-xs font-bold text-white/60 group-hover/feat:text-white transition-colors uppercase tracking-tight">{feat}</span>
                    </div>
                  ))}
                </div>

                <AnimatedButton href="/contact" className="px-12 py-5 text-[10px] tracking-widest">
                  {t.cta_button}
                </AnimatedButton>
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}