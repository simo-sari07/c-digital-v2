'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const categories = ["ALL", "WEB", "BRANDING", "SEO", "CONTENT"];
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
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredItems = activeTab === "ALL" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen bg-black text-white pt-44 pb-32 px-6">
      {/* Background Decor */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>

      {/* Header */}
      <div className="text-center mb-20 relative z-10">
        <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Succès & Réalisations</span>
        <h1 className="text-5xl md:text-[80px] font-black uppercase tracking-tighter leading-none mb-8">
          NOS <span className="text-gradient italic font-script lowercase">réalisations.</span>
        </h1>
        <p className="text-gray-400 font-medium text-lg max-w-2xl mx-auto">
          Plus qu'un simple code, une expérience digitale complète.
        </p>
      </div>

      {/* Filter Bar (Style li sifti f tswira) */}
      <div className="flex justify-center mb-24 relative z-20">
        <div className="inline-flex bg-muted/20 backdrop-blur-xl border border-white/5 rounded-full p-1.5 shadow-2xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative z-10 px-10 py-3.5 text-[10px] font-black tracking-[0.2em] transition-all duration-500 uppercase ${
                activeTab === cat ? 'text-black' : 'text-white/40 hover:text-white'
              }`}
            >
              {cat}
              {activeTab === cat && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white rounded-full -z-10 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto relative z-10"
      >
        <AnimatePresence mode='popLayout'>
          {filteredItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="group relative block aspect-[4/3] bg-muted/10 rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-accent/50 transition-all duration-500 shadow-2xl"
            >
              {/* Media Container */}
              <div className="absolute inset-0">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 opacity-60 group-hover:opacity-100"
                />
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex justify-between items-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div>
                    <span className="text-accent text-[9px] font-black uppercase tracking-[0.3em] mb-3 block">Digital Experience</span>
                    <h3 className="text-2xl font-black uppercase tracking-tight">{item.title}</h3>
                  </div>
                  <div className="bg-white text-black p-3 rounded-2xl shadow-xl">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>

              {/* Card Footer (Visible always) */}
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest border border-white/10">
                  {item.category}
                </span >
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Tagline matching your layout */}
      <div className="mt-32 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20">
          C-DIGITAL • L'Art de Dominer le Marché par l'Innovation
        </p>
      </div>
    </div>
  );
}