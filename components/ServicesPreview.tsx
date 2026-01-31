'use client';

import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

// Khallina l-data li maktbedelch (images/numbers) hna
const serviceAssets = [
  { number: '01', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop' },
  { number: '02', image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop" },
  { number: '03', image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop" },
  { number: '04', image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=764&auto=format&fit=crop" },
  { number: '05', image: "https://marketing-bienveillant.com/wp-content/uploads/2021/11/strategie-de-contenu-pour-votre-entreprise.png" },
  { number: '06', image: "https://www.adimeo.com/hubfs/webinar-strategie-ia-seo-2026.webp" }
];

export default function ServicesPreview() {
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

  const t = dictionaries[lang]?.services_preview || dictionaries.en.services_preview;

  if (!mounted) return null;

  return (
    <SectionWrapper id="services" data-bgcolor="#050a14" className="bg-black font-sans">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 px-4 md:px-0">
        <SectionTitle className="text-left mb-0">
          {t.title_main} <span className="font-script text-accent normal-case">{t.title_script}</span> <br className="hidden md:block" /> {t.title_sub}
        </SectionTitle>
        <Link href="/services" className="hidden md:flex items-center gap-2 text-white hover:text-accent transition-colors uppercase tracking-widest text-sm font-bold">
          {t.view_all} <ArrowRight size={16} />
        </Link>
      </div>

      <div className="flex flex-col gap-8 pb-20">
        {t.items.map((item: any, idx: number) => (
          <div 
            key={idx} 
            className="sticky top-20 md:top-32 bg-neutral-900 border-t border-white/10 overflow-hidden shadow-2xl rounded-t-3xl"
            style={{ top: `${120 + (idx * 10)}px` }}
          >
            <div className="flex flex-col md:flex-row items-center p-8 md:p-12 gap-8 h-[500px] md:h-[400px]">
              
              {/* Left: Text (Dynamique mn JSON) */}
              <div className="w-full md:w-1/3 flex flex-col justify-center">
                 <h3 className="text-4xl md:text-5xl font-black text-white uppercase mb-4 leading-[0.9]">
                   {item.title}
                 </h3>
                 <p className="text-gray-400 text-sm md:text-base font-medium max-w-xs">
                   {item.desc}
                 </p>
              </div>

              {/* Center: Image (Mn assets local) */}
              <div className="w-full md:w-1/3 h-full rounded-2xl overflow-hidden relative group">
                 <img 
                   src={serviceAssets[idx].image} 
                   alt={item.title} 
                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>

              {/* Right: Number (Mn assets local) */}
              <div className="w-full md:w-1/3 flex justify-end items-end h-full">
                 <span className="text-[8rem] md:text-[10rem] font-black text-accent leading-none opacity-20 md:opacity-100 select-none">
                   {serviceAssets[idx].number}
                 </span>
              </div>

            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 md:hidden text-center">
        <Link href="/services" className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors uppercase tracking-widest text-sm font-bold">
          {t.view_all} <ArrowRight size={16} />
        </Link>
      </div>
    </SectionWrapper>
  );
}