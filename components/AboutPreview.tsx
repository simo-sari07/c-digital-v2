'use client';

import React, { useState, useEffect, useRef } from 'react';
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import AnimatedButton from './AnimatedButton';
import { Target, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

  const t = dictionaries[lang]?.about_preview || dictionaries.en.about_preview;

  // 2. GSAP Animations (Intact)
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
    <SectionWrapper id="about-preview" bgColor="#030303" className="overflow-hidden font-sans">
      <div ref={containerRef} className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Vision & Content */}
        <div ref={leftContentRef}>
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">
            {t.badge}
          </span>
          <SectionTitle className="text-left mb-8">
            {t.title_main} <br />
            <span className="text-gradient italic font-script lowercase">{t.title_italic}</span>
          </SectionTitle>
          
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
            {t.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-8 mb-10">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 rounded-2xl border border-accent/20">
                <Target className="text-accent" size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold uppercase text-sm mb-1">{t.mission.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
                  {t.mission.text}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary/10 rounded-2xl border border-secondary/20">
                <Sparkles className="text-secondary" size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold uppercase text-sm mb-1">{t.who.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
                  {t.who.text}
                </p>
              </div>
            </div>
          </div>

          <AnimatedButton href="/about" variant="primary" showIcon>
            {t.btn_more}
          </AnimatedButton>
        </div>

        {/* Right Column: Visual & Stats */}
        <div ref={rightContentRef} className="relative">
          <div className="aspect-square bg-muted/20 border border-white/5 rounded-[4rem] overflow-hidden group relative">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Our Team" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            
            <div className="absolute bottom-10 left-10 right-10 grid grid-cols-2 gap-4">
              {t.stats.map((stat: any, i: number) => (
                <div key={i} className="bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
                  <h3 className="text-3xl font-black text-gradient mb-1">{stat.value}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 blur-[80px] rounded-full animate-aura"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 blur-[80px] rounded-full animate-aura-reverse"></div>
        </div>

      </div>
    </SectionWrapper>
  );
}