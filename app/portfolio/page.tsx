'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

const portfolioItems = [
  { id: 1, title: "Mahtaaj", category: "WEB", url: "https://mahtaaj.com/", img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769431065/WhatsApp_Image_2026-01-26_at_13.34.33_scunse.jpg" },
  { id: 2, title: "Car-Ino", category: "WEB", url: "https://car-ino.com/", img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769430488/WhatsApp_Image_2026-01-26_at_13.25.20_3_cmtp0p.jpg" },
  { id: 3, title: "Rihtac", category: "WEB", url: "http://rihtac.com/", img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769431065/WhatsApp_Image_2026-01-26_at_13.35.21_mbuwrk.jpg" },
  { id: 4, title: "Herbes Jabal Toubkal", category: "WEB", url: "https://herbesjabaltoubkal.com/", img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769430487/WhatsApp_Image_2026-01-26_at_13.25.21_ibmgem.jpg" },
  { id: 5, title: "Mokhliss Physiotherapy", category: "WEB", url: "https://mokhlissphysiotherapy.com/", img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769431065/WhatsApp_Image_2026-01-26_at_13.36.17_nam2qy.jpg" },
  { id: 6, title: "Frach Dark", category: "WEB", url: "http://frachdark.com/", img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769430488/WhatsApp_Image_2026-01-26_at_13.25.20_pxyrex.jpg" },
  { id: 7, title: "Waoo Tapis", category: "WEB", url: "https://waootapis.com/", img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769431343/WhatsApp_Image_2026-01-26_at_13.38.51_rbi73i.jpg" },
  { id: 8, title: "Triastore", category: "WEB", url: "https://triastore.com/", img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769431343/WhatsApp_Image_2026-01-26_at_13.40.17_bcwvuz.jpg" },
  { id: 9, title: "Taw10", category: "WEB", url: "https://taw10.com/", img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769431343/WhatsApp_Image_2026-01-26_at_13.41.57_bv2dap.jpg" },
  { id: 10, title: "Atlas Cera", category: "WEB", url: "https://atlas-cera.com/", img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769430487/WhatsApp_Image_2026-01-26_at_13.25.21_1_ld1hmy.jpg" },
  { id: 11, title: "Al Assala Event", category: "WEB", url: "https://www.alassalaevent.com/", img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769430488/WhatsApp_Image_2026-01-26_at_13.25.20_2_vlzbsh.jpg" },
];

export default function PortfolioPage() {
  const [lang, setLang] = useState('en');
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("ALL");

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

  const t = dictionaries[lang]?.portfolio_page || dictionaries.en.portfolio_page;

  const categories = [
    { id: "ALL", label: t.categories.all },
    { id: "WEB", label: t.categories.web },
    { id: "BRANDING", label: t.categories.branding },
    { id: "SEO", label: t.categories.seo },
    { id: "CONTENT", label: t.categories.content }
  ];

  const filteredItems = activeTab === "ALL" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeTab);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white pt-44 pb-32 px-6 font-sans">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>

      <div className="text-center mb-20 relative z-10">
        <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">{t.badge}</span>
        <h1 className="text-5xl md:text-[80px] font-black uppercase tracking-tighter leading-none mb-8">
          {t.title_main} <span className="text-gradient italic font-script lowercase tracking-normal">{t.title_italic}</span>
        </h1>
        <p className="text-gray-400 font-medium text-lg max-w-2xl mx-auto leading-relaxed">{t.description}</p>
      </div>

      {/* Categories Filter Optimized for Accessibility */}
      <div className="flex justify-center mb-24 relative z-20">
        <div className="inline-flex bg-muted/20 backdrop-blur-xl border border-white/5 rounded-full p-1.5 shadow-2xl overflow-x-auto max-w-full no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              aria-label={`Filter by ${cat.label}`}
              className={`relative z-10 px-6 md:px-10 py-3.5 text-[10px] font-black tracking-[0.2em] transition-all duration-500 uppercase shrink-0 ${
                activeTab === cat.id ? 'text-black' : 'text-white/40 hover:text-white'
              }`}
            >
              {cat.label}
              {activeTab === cat.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid Optimized with next/image */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode='popLayout'>
          {filteredItems.map((item, idx) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer" // Security Fix for Best Practices
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group relative block aspect-[4/3] bg-muted/10 rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-accent/50 transition-all duration-500 shadow-2xl"
            >
              <div className="absolute inset-0">
                <Image 
                  src={item.img} 
                  alt={`Portfolio Project: ${item.title}`} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-60 group-hover:opacity-100 scale-105 group-hover:scale-100"
                  loading={idx < 3 ? "eager" : "lazy"}
                  priority={idx < 3} // Optimisation Performance: 3 tswari l-wala k-it-charg-aw dghya
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                <div className="flex justify-between items-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-left">
                    <span className="text-accent text-[9px] font-black uppercase tracking-[0.3em] mb-3 block">{t.card_badge}</span>
                    <h3 className="text-2xl font-black uppercase tracking-tight">{item.title}</h3>
                  </div>
                  <div className="bg-white text-black p-3 rounded-2xl shrink-0"><ExternalLink size={20} /></div>
                </div>
              </div>

              <div className="absolute top-6 left-6 flex gap-2 z-10">
                <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest border border-white/10">{item.category}</span>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-32 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20">{t.tagline}</p>
      </div>
    </div>
  );
}