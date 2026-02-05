'use client';

import React, { useState, useEffect, useRef } from 'react';
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import AnimatedButton from './AnimatedButton';
import { Target, Sparkles } from 'lucide-react';
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

export default function AboutPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
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

  const t = dictionaries[lang]?.about_preview || dictionaries.en.about_preview;

  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(leftContentRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.5, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        }
      );

      gsap.fromTo(rightContentRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.5, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [mounted, lang]);

  if (!mounted) return null;

  return (
    <SectionWrapper id="about-preview" bgColor="#FFFFFF" className="overflow-hidden font-sans relative">
      {/* Chart Grid Background Light */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div ref={containerRef} className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Column: Vision & Content */}
        <div ref={leftContentRef} className="text-left">
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">
            {t.badge}
          </span>
          <SectionTitle className="text-left mb-8 !text-black">
            {t.title_main} <br />
            <span className="text-gradient font-script normal-case tracking-normal">{t.title_italic}</span>
          </SectionTitle>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg font-medium">
            {t.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-8 mb-10">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/5 rounded-2xl border border-accent/10 shrink-0">
                <Target className="text-accent" size={24} />
              </div>
              <div>
                <h4 className="text-black font-black uppercase text-[10px] tracking-widest mb-1">{t.mission.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[200px] font-medium">
                  {t.mission.text}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary/5 rounded-2xl border border-secondary/10 shrink-0">
                <Sparkles className="text-secondary" size={24} />
              </div>
              <div>
                <h4 className="text-black font-black uppercase text-[10px] tracking-widest mb-1">{t.who.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[200px] font-medium">
                  {t.who.text}
                </p>
              </div>
            </div>
          </div>

          <AnimatedButton href="/about" variant="primary" showIcon className="px-10 py-5 text-[10px] !text-white">
            {t.btn_more}
          </AnimatedButton>
        </div>

        {/* Right Column: Visual & Stats - Optimized with next/image */}
        <div ref={rightContentRef} className="relative">
          <div className="aspect-square bg-black/5 border border-black/5 rounded-[4rem] overflow-hidden group relative">
            <Image 
              src="https://res.cloudinary.com/digfptrqs/image/upload/v1769953600/photo-1522071820081-009f0129c71c_gq1x8i.jpg" 
              alt="C-Digital Agency Team working on web development" 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100 opacity-90"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-10 left-10 right-10 grid grid-cols-2 gap-4 z-10">
              {t.stats.map((stat: any, i: number) => (
                <div key={i} className="bg-white/90 backdrop-blur-md border border-black/5 p-6 rounded-3xl shadow-xl">
                  <h3 className="text-3xl font-black text-gradient mb-1">{stat.value}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-black/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 blur-[80px] rounded-full animate-aura pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/5 blur-[80px] rounded-full animate-aura-reverse pointer-events-none"></div>
        </div>

      </div>
    </SectionWrapper>
  );
}