'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import AnimatedButton from './AnimatedButton';
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState('en');

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

  const t = dictionaries[lang]?.hero || dictionaries.en.hero;

  // 2. GSAP Animations (Intact)
  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
        }
      });

      tl.to(videoWrapperRef.current, { width: "100%", ease: "power2.inOut" }, 0);
      
      tl.to(".chevron-border, .chevron-video", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 50%, 100% 100%, 0% 100%)",
        ease: "power2.inOut",
      }, 0);

      tl.to(contentRef.current, { opacity: 0, x: 100, ease: "power2.inOut" }, 0);

      const tlEntrance = gsap.timeline();
      tlEntrance.from(".hero-badge", { y: -20, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(".hero-title span", {
          y: 60, opacity: 0, duration: 1, stagger: 0.1, ease: "power4.out"
        }, "-=0.4")
        .from(".hero-services, .hero-description, .hero-btns", {
          opacity: 0, y: 20, duration: 0.8, stagger: 0.2, ease: "power3.out"
        }, "-=0.6");
    }, containerRef);
    return () => ctx.revert();
  }, [mounted, lang]); // Rerun animation mlli t-beddel l-logha bach l-text jdid i-t-anima

  if (!mounted) return <div className="h-screen bg-black" />;

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col md:flex-row font-sans">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent/20 blur-[120px] rounded-full animate-aura"></div>
        <div className="absolute inset-0 grid-bg opacity-20"></div>
      </div>

      {/* Video Wrapper */}
      <div ref={videoWrapperRef} className="fixed left-0 top-0 h-full w-[50%] z-10 pointer-events-none">
        <div className="chevron-border absolute inset-0 bg-secondary w-full h-full z-0" style={{ clipPath: "polygon(0 0, 60.5% 0, 95.5% 50%, 60.5% 100%, 0 100%)" }}></div>
        <div className="chevron-video absolute inset-0 bg-black w-full h-full z-10" style={{ clipPath: "polygon(0 0, 60% 0, 95% 50%, 60% 100%, 0 100%)" }}>
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80 grayscale">
            <source src={"/video.mp4"} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Content Section */}
      <div ref={contentRef} className="relative z-20 w-full md:w-1/2 ml-auto h-full flex flex-col justify-center px-12 md:pr-20 items-center md:items-start text-center md:text-left">
        <div className="max-w-xl">
          <div className="hero-badge mb-6 inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-semibold tracking-wider uppercase">
            {t.badge}
          </div>

          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            <span className="inline-block mr-3">{t.title_1}</span> 
            <span className="inline-block mr-3">{t.title_2}</span> 
            <span className="inline-block mr-3">{t.title_3}</span><br />
            <span className="inline-block mr-3">{t.title_4}</span> 
            <span className="text-gradient inline-block">{t.title_convert}</span>
          </h1>

          <div className="hero-services flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-2 mb-8 text-gray-400 text-xs md:text-sm font-medium">
            {t.services.map((service: string, i: number) => (
              <React.Fragment key={i}>
                <span>{service}</span>
                {i < t.services.length - 1 && <span className="w-1 h-1 rounded-full bg-accent/50"></span>}
              </React.Fragment>
            ))}
          </div>

          <p className="hero-description text-gray-400 text-sm md:text-base mb-10 leading-relaxed">
            {t.description}
          </p>

          <div className="hero-btns flex flex-col sm:flex-row items-center gap-4">
            <AnimatedButton href="/services" showIcon variant="primary">
              {t.btn_get_started}
            </AnimatedButton>
            <AnimatedButton href="/work" showIcon variant="secondary">
              {t.btn_view_work}
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
}