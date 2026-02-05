'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';
import Image from 'next/image';
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

// Assets li maktbedelch (Cloudinary URLs)
const serviceAssets = [
  { image: "https://res.cloudinary.com/digfptrqs/image/upload/v1769953599/photo-1460925895917-afdab827c52f_qziwwe.jpg", color: "accent" },
  { image: "https://res.cloudinary.com/digfptrqs/image/upload/v1769953600/photo-1512941937669-90a1b58e7e9c_fuysak.jpg", color: "secondary" },
  { image: "https://res.cloudinary.com/digfptrqs/image/upload/v1769953599/photo-1492691527719-9d1e07e534b4_ez0zsm.jpg", color: "pink" },
  { image: "https://res.cloudinary.com/digfptrqs/image/upload/v1769953599/photo-1558655146-d09347e92766_uynxyk.jpg", color: "orange" },
  { image: "https://res.cloudinary.com/digfptrqs/image/upload/v1769956912/photo-1455390582262-044cdead277a_ftzbmt.avif", color: "blue" },
  { image: "https://res.cloudinary.com/digfptrqs/image/upload/v1769956913/photo-1571721795195-a2ca2d3370a9_fhegom.avif", color: "purple" }
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
        {/* Header Dynamique */}
        <div className="text-center mb-40">
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">{t.badge}</span>
          <h1 className="text-5xl md:text-[80px] font-black uppercase tracking-tighter leading-none mb-8">
            {t.title_main} <span className="text-gradient font-script normal-case tracking-normal">{t.title_italic}</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed font-medium">
            {t.description}
          </p>
        </div>

        {/* Services List Optimized */}
        <div className="space-y-48">
          {t.list.map((service: any, idx: number) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 lg:gap-32 items-center`}>
              
              {/* Visual Side Optimized */}
              <div className="w-full md:w-1/2 group relative">
                <div className="relative aspect-[4/3] bg-muted/20 border border-white/5 rounded-[3rem] overflow-hidden transition-all duration-700 hover:border-accent/30 shadow-2xl">
                  <Image 
                    src={serviceAssets[idx].image} 
                    alt={`Expertise C-Digital: ${service.title}`} 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100 opacity-60 group-hover:opacity-100"
                    loading={idx === 0 ? "eager" : "lazy"}
                    priority={idx === 0} // Fix dial LCP bach n-weslo l score 100
                  />
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-1">{service.tagline}</p>
                    <h4 className="text-sm font-black uppercase">{service.title}</h4>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 text-left">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
                  {service.title}
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-10 font-medium">
                  {service.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
                  {service.features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 group/feat">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center group-hover/feat:bg-accent transition-all shrink-0">
                        <CheckCircle className="text-accent group-hover/feat:text-white" size={14} />
                      </div>
                      <span className="text-[10px] font-black text-white/40 group-hover/feat:text-white transition-colors uppercase tracking-widest">{feat}</span>
                    </div>
                  ))}
                </div>

                <AnimatedButton href="/contact" variant="primary" className="px-12 py-5 text-[10px] tracking-widest">
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