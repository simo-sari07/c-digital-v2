'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import AnimatedButton from './AnimatedButton';
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState('en');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check dial Language o Device
    const updateLang = () => setLang(document.documentElement.lang || 'en');
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    updateLang();
    checkMobile();

    window.addEventListener('resize', checkMobile);
    const observer = new MutationObserver(updateLang);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const t = dictionaries[lang]?.hero || dictionaries.en.hero;

  useEffect(() => {
    if (!mounted) return;

    // GSAP Context k-i-nfa3 f l-cleanup bach ma-i-trach NotFoundError
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
          anticipatePin: 1, // K-i-7mi mn l-jitters f mobile
        }
      });

      tl.to(videoWrapperRef.current, { width: "100%", ease: "power2.inOut" }, 0);
      tl.to(".chevron-border, .chevron-video", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 50%, 100% 100%, 0% 100%)",
        ease: "power2.inOut",
      }, 0);
      tl.to(contentRef.current, { opacity: 0, x: 100, ease: "power2.inOut" }, 0);

      // Entrance Animations m-optimisyin bach ma-i-blockiwch l-Main Thread
      gsap.timeline()
        .from(".hero-badge", { y: -20, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(".hero-title span", {
          y: 40, opacity: 0, duration: 0.8, stagger: 0.05, ease: "power4.out"
        }, "-=0.4")
        .from(".hero-services, .hero-description, .hero-btns", {
          opacity: 0, y: 15, duration: 0.6, stagger: 0.1, ease: "power3.out"
        }, "-=0.5");
    }, containerRef);

    return () => {
      ctx.revert(); // Revert k-i-msa7 l-pin-spacers dial GSAP bach React ma-i-t-left-ch
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [mounted, lang]);

  if (!mounted) return <div className="h-screen bg-black" />;

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col md:flex-row font-sans">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent/20 blur-[120px] rounded-full animate-aura"></div>
        <div className="absolute inset-0 grid-bg opacity-20"></div>
      </div>

      {/* Video/Image Wrapper - Performance Fix */}
      <div ref={videoWrapperRef} className="fixed left-0 top-0 h-full w-full md:w-[50%] z-10 pointer-events-none">
        <div className="chevron-border absolute inset-0 bg-secondary w-full h-full z-0" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}></div>
        <div className="chevron-video absolute inset-0 bg-black w-full h-full z-10 overflow-hidden" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
          
          {/* Conditional Rendering bach n-hbtou l-Payload f Mobile */}
          {!isMobile ? (
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              preload="metadata"
              poster="https://res.cloudinary.com/digfptrqs/image/upload/f_auto,q_auto/v1769952848/video_thumb.jpg"
              className="w-full h-full object-cover opacity-80 grayscale"
            >
              <source src="https://res.cloudinary.com/digfptrqs/video/upload/f_auto,q_auto/v1769952848/video_nou45y.mp4" type="video/mp4" />
            </video>
          ) : (
            <Image 
              src="https://res.cloudinary.com/digfptrqs/image/upload/f_auto,q_auto/v1769952848/video_thumb.jpg"
              alt="Hero Visual C-Digital"
              fill
              priority
              className="object-cover opacity-80 grayscale"
            />
          )}
        </div>
      </div>

      {/* Content Section */}
      <div ref={contentRef} className="relative z-20 w-full md:w-1/2 ml-auto h-full flex flex-col justify-center px-8 md:px-12 md:pr-20 items-center md:items-start text-center md:text-left">
        <div className="max-w-xl">
          <div className="hero-badge mb-6 inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-[10px] font-black tracking-[0.3em] uppercase">
            {t.badge}
          </div>

          <h1 className="hero-title text-4xl md:text-6xl lg:text-[75px] font-black text-white tracking-tighter leading-[0.95] mb-8 uppercase">
            <span className="inline-block">{t.title_1}</span> 
            <span className="inline-block mx-2">{t.title_2}</span> 
            <span className="inline-block">{t.title_3}</span><br />
            <span className="inline-block">{t.title_4}</span> 
            <span className="text-gradient inline-block italic font-script lowercase tracking-normal mx-2">{t.title_convert}</span>
          </h1>

          <div className="hero-services flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-2 mb-8 text-white/40 text-[10px] font-black uppercase tracking-widest">
            {t.services.map((service: string, i: number) => (
              <React.Fragment key={i}>
                <span>{service}</span>
                {i < t.services.length - 1 && <span className="w-1 h-1 rounded-full bg-accent/30"></span>}
              </React.Fragment>
            ))}
          </div>

          <p className="hero-description text-gray-400 text-sm md:text-base mb-10 leading-relaxed font-medium">
            {t.description}
          </p>

          <div className="hero-btns flex flex-col sm:flex-row items-center gap-6">
            <AnimatedButton href="/services" showIcon variant="primary" className="px-10 py-5 text-[10px]">
              {t.btn_get_started}
            </AnimatedButton>
            <AnimatedButton href="/portfolio" variant="secondary" className="px-10 py-5 text-[10px]">
              {t.btn_view_work}
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
}