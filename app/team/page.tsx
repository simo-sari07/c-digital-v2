'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TeamPage() {
  const [lang, setLang] = useState('en');
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

  const t = dictionaries[lang]?.team_page || dictionaries.en.team_page;

  const teamData = {
    leader: { name: "Hicham Mhammedi", role: t.roles.ceo, img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769433025/WhatsApp_Image_2026-01-26_at_14.09.55_hs9tin.jpg" },
    managers: [
      { 
        name: "Salih", role: t.roles.lead_tech, img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769433026/WhatsApp_Image_2026-01-26_at_13.13.40_6_qvzvte.jpg",
        subTeam: [
          { name: "Hassan Moassar", role: t.roles.dev, img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769433028/WhatsApp_Image_2026-01-26_at_13.13.40_4_m801rm.jpg" },
          { name: "El Mehdi El Fatimy", role: t.roles.dev, img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769433046/WhatsApp_Image_2026-01-26_at_13.13.40_1_oakctp.jpg" },
          { name: "Mohamed Ibaa Ali", role: t.roles.dev, img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769433025/WhatsApp_Image_2026-01-26_at_13.13.40_7_r40fkz.jpg" },
          { name: "Mohamed Sari", role: t.roles.dev, img: "https://res.cloudinary.com/da63nggkh/image/upload/v1769570129/1769569640458-019c0291-7902-7f67-bd83-5bc5763bb76d_u0fxsf.png" },
          { name: "Asma Bendalh", role: t.roles.dev, img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769434889/WhatsApp_Image_2026-01-26_at_14.35.16_ayx2sp.jpg" },
          { name: "Mohamedkarim Kribi", role: t.roles.devops, img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769433045/WhatsApp_Image_2026-01-26_at_13.13.40_2_s1bppg.jpg" }
        ]
      },
      { 
        name: "Hiba Ennajjar", role: t.roles.assistant, img: "https://res.cloudinary.com/digfptrqs/image/upload/v1770050392/WhatsApp_Image_2026-02-02_at_17.36.59_tv6ld1.jpg",
        subTeam: [
          { name: "Anas El Aarsaoui", role: t.roles.content, img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769433026/WhatsApp_Image_2026-01-26_at_13.13.40_5_duqxud.jpg" },
          { name: "Othmane", role: t.roles.video, img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769446448/WhatsApp_Image_2026-01-26_at_17.53.15_ewusl2.jpg" }
        ]
      }
    ]
  };

  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(gridRef.current, { scale: 1.2, opacity: 0, duration: 2, ease: "power3.out" }, 0);
      tl.from(".reveal-text", { yPercent: 100, duration: 1.2, stagger: 0.1, ease: "power4.out", skewY: 5 }, 0.4)
        .from(".team-script", { opacity: 0, scale: 0.5, duration: 1, ease: "back.out(2)" }, "-=0.8");
      
      gsap.from(".team-card", { 
        y: 80, opacity: 0, scale: 0.9, duration: 1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".tree-container", start: "top 85%" }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [mounted, lang]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden pb-40 pt-44 font-sans text-white text-left md:text-center">
      <div ref={gridRef} className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      
      <main className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="mb-32">
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">{t.badge}</span>
          <h1 className="text-5xl md:text-[80px] font-black uppercase tracking-tighter leading-tight">
            <div className="overflow-hidden md:block">
              <span className="reveal-text block">{t.title_main}</span>
            </div>
            <span className="team-script font-script text-accent lowercase block tracking-normal">{t.title_italic}</span>
          </h1>
        </div>

        <div className="tree-container relative w-full flex flex-col items-center">
          <div className="mb-40 relative">
            <TeamCard member={teamData.leader} size="lg" glow="accent" priority />
            <div className="connector-line absolute top-full left-1/2 -translate-x-1/2 w-[1.5px] h-40 bg-gradient-to-b from-accent to-secondary/20" />
          </div>

          <div className="grid md:grid-cols-2 gap-20 w-full max-w-6xl relative">
            {teamData.managers.map((manager, mIdx) => (
              <div key={mIdx} className="flex flex-col items-center w-full relative">
                <TeamCard member={manager} size="md" glow="secondary" />
                <div className="connector-line w-[1px] h-20 bg-white/10 my-10" />
                <div className={`grid gap-4 w-full ${manager.subTeam.length > 2 ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2'}`}>
                  {manager.subTeam.map((member, sIdx) => (
                    <TeamCard key={sIdx} member={member} size="sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function TeamCard({ member, size, glow, priority = false }: any) {
  const isLg = size === "lg";
  const isMd = size === "md";
  const cardRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={cardRef} className="team-card perspective-1000">
      <div className={`relative group overflow-hidden rounded-[2.5rem] bg-muted/20 border border-white/5 backdrop-blur-xl transition-all duration-500 hover:border-accent/40 ${isLg ? 'w-72 h-96' : isMd ? 'w-60 h-80' : 'w-full aspect-[4/5]'} relative`}>
        <Image 
          src={member.img} 
          alt={`C-Digital Team Member: ${member.name} - ${member.role}`} 
          fill
          priority={priority} // Optimization dial LCP dial Lighthouse
          sizes={isLg ? "288px" : isMd ? "240px" : "(max-width: 768px) 50vw, 20vw"}
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100 scale-105 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 text-left z-10 pointer-events-none">
          <span className={`text-[8px] font-black uppercase tracking-[0.2em] mb-1 ${glow === 'accent' ? 'text-accent' : 'text-secondary'}`}>{member.role}</span>
          <h3 className={`${isLg ? 'text-xl' : 'text-[12px]'} font-black uppercase tracking-tight`}>{member.name}</h3>
        </div>
      </div>
    </div>
  );
}