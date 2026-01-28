'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

// --- Hicham, hna fin t-7et les liens dyal les images mn l-cloud ---
const teamData = {
  leader: { 
    name: "Hicham Mhammedi", 
    role: "CEO & FONDATEUR", 
    img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769433025/WhatsApp_Image_2026-01-26_at_14.09.55_hs9tin.jpg" 
  },
  managers: [
    { 
      name: "Salih", 
      role: "LEAD TECH", 
      img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769433026/WhatsApp_Image_2026-01-26_at_13.13.40_6_qvzvte.jpg",
      subTeam: [
        { name: "Hassan Moassar", role: "FULL STACK DEV", img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769433028/WhatsApp_Image_2026-01-26_at_13.13.40_4_m801rm.jpg" },
        { name: "El Mehdi El Fatimy ", role: "FULL STACK DEV", img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769433046/WhatsApp_Image_2026-01-26_at_13.13.40_1_oakctp.jpg" },
        { name: "Mohamed Ibaa Ali", role: "FULL STACK DEV", img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769433025/WhatsApp_Image_2026-01-26_at_13.13.40_7_r40fkz.jpg" },
        { name: "Mohamed Sari", role: "FULL STACK DEV", img: "https://messages-prod.27c852f3500f38c1e7786e2c9ff9e48f.r2.cloudflarestorage.com/019b5a1e-251f-7863-b4c8-d95348eea9cf/1769569640458-019c0291-7902-7f67-bd83-5bc5763bb76d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=af634fe044bd071ab4c5d356fdace60f%2F20260128%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260128T030721Z&X-Amz-Expires=3600&X-Amz-Signature=ecd5fddd415fd8dfea024d2cebb1ca6cf335ff8a9090d449566d205b2cced275&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject" },
        { name: "Asma Bendalh", role: "FULL STACK DEV", img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769434889/WhatsApp_Image_2026-01-26_at_14.35.16_ayx2sp.jpg" },
        { name: "Mohamedkarim Kribi", role: "DEVOPS & FULLSTACK", img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769433045/WhatsApp_Image_2026-01-26_at_13.13.40_2_s1bppg.jpg" }
      ]
    },
    { 
      name: "Hiba Ennajjar", 
      role: "EXECUTIVE ASSISTANT", 
      img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769433029/WhatsApp_Image_2026-01-26_at_13.13.40_3_hnswyk.jpg",
      subTeam: [
        { name: "Anas El Aarsaoui", role: "CONTENT CREATOR", img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769433026/WhatsApp_Image_2026-01-26_at_13.13.40_5_duqxud.jpg" },
        { name: "Othmane", role: "VIDEO EDITOR", img: "https://res.cloudinary.com/digfptrqs/image/upload/v1769446448/WhatsApp_Image_2026-01-26_at_17.53.15_ewusl2.jpg" }
      ]
    }
  ]
};

export default function TeamPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Cinematic Grid Zoom-out
      tl.from(gridRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 2,
        ease: "power3.out"
      }, 0);

      // Masked Title reveal
      tl.from(".reveal-text", {
        yPercent: 100,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        skewY: 5
      }, 0.4)
      .from(".team-script", {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: "back.out(2)"
      }, "-=0.8");

      // Dynamic Background Auras
      tl.from(".bg-aura", {
        opacity: 0,
        scale: 0.2,
        duration: 2,
        stagger: 0.3,
        ease: "power2.out"
      }, 0.2);

      // Card staggered entrances
      gsap.from(".team-card", {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".tree-container",
          start: "top 85%"
        }
      });

      // Connector line drawing (Energy flow)
      gsap.from(".connector-line", {
        scaleY: 0,
        opacity: 0,
        transformOrigin: "top center",
        duration: 1.2,
        ease: "power2.inOut",
        stagger: 0.15,
        delay: 0.8
      });

      gsap.from(".connector-horizontal", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "center center",
        duration: 1.2,
        ease: "power2.inOut",
        delay: 1.5
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background overflow-hidden pb-40 pt-44">
      <div ref={gridRef} className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      
      {/* Dynamic Background Auras */}
      <div className="bg-aura absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full animate-pulse" />
      <div className="bg-aura absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full animate-pulse-slow" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Title */}
        <div className="mb-32">
          <h1 className="text-6xl md:text-[100px] font-black uppercase tracking-tighter leading-[0.85]">
            <div className="overflow-hidden inline-block md:block">
              <span className="reveal-text block">L'ARCHITECTURE</span>
            </div>
            <span className="team-script font-script text-accent lowercase block mt-4">humaine.</span>
          </h1>
        </div>

        {/* Tree Container */}
        <div className="tree-container relative w-full flex flex-col items-center">
          
          {/* Level 0: CEO */}
          <div className="mb-40 relative team-card-wrapper">
            <TeamCard member={teamData.leader} size="lg" glow="accent" />
            {/* Connector Line Down */}
            <div className="connector-line absolute top-full left-1/2 -translate-x-1/2 w-[1.5px] h-40 bg-gradient-to-b from-accent to-secondary/20" />
          </div>

          {/* Level 1 & 2: Managers and their Teams */}
          <div className="grid md:grid-cols-2 gap-20 w-full max-w-6xl relative">
            {/* Horizontal Connection line between managers */}
            <div className="connector-horizontal absolute top-[-40px] left-[25%] right-[25%] h-[1.5px] bg-secondary/30 hidden md:block" />

            {teamData.managers.map((manager, mIdx) => (
              <div key={mIdx} className="flex flex-col items-center w-full relative">
                {/* Vertical Connector to manager */}
                <div className="connector-line absolute top-[-40px] left-1/2 -translate-x-1/2 w-[1.5px] h-10 bg-secondary/30 hidden md:block" />
                
                <TeamCard member={manager} size="md" glow="secondary" />
                
                {/* Line to sub-team */}
                <div className="connector-line w-[1px] h-20 bg-white/10 my-10" />

                {/* Sub-Team Grid */}
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

function TeamCard({ member, size, glow }: any) {
  const isLg = size === "lg";
  const isMd = size === "md";
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    const moveX = (x - 0.5) * 20;
    const moveY = (y - 0.5) * 20;
    
    gsap.to(cardRef.current, {
      rotateY: moveX,
      rotateX: -moveY,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };
  
  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="team-card perspective-1000 cursor-pointer"
    >
      <div className={`
        relative group overflow-hidden rounded-[2.5rem] bg-muted/20 border border-white/5 backdrop-blur-xl transition-all duration-500 hover:border-accent/40
        ${isLg ? 'w-72 h-96' : isMd ? 'w-60 h-80' : 'w-full aspect-[4/5]'}
      `}>
        <img 
          src={member.img || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop"} 
          alt={member.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100 scale-105 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 text-left">
          <span className={`text-[8px] font-black uppercase tracking-[0.2em] mb-1 ${glow === 'accent' ? 'text-accent' : 'text-secondary'}`}>
            {member.role}
          </span>
          <h3 className={`${isLg ? 'text-xl' : 'text-[12px]'} font-black uppercase tracking-tight`}>
            {member.name}
          </h3>
        </div>

        {/* Hover Light Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br from-white to-transparent" />
      </div>
    </div>
  );
}
