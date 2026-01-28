'use client';

import React, { useEffect, useRef } from 'react';
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import AnimatedButton from './AnimatedButton';
import { Target, Sparkles, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { label: "Projets Réalisés", value: "150+" },
  { label: "Clients Satisfaits", value: "98%" },
];

export default function AboutPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left content entry
      gsap.fromTo(leftContentRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Right content entry
      gsap.fromTo(rightContentRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="about-preview" bgColor="#030303" className="overflow-hidden">
      <div ref={containerRef} className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Vision & Content */}
        <div ref={leftContentRef}>
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">
            Premium Services & Support
          </span>
          <SectionTitle className="text-left mb-8">
            À PROPOS DE <br />
            <span className="text-gradient italic font-script lowercase">C-Digital.</span>
          </SectionTitle>
          
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
            Chez C-Digital, nous combinons créativité et stratégies basées sur les données pour aider votre entreprise à prospérer en ligne. Notre équipe d'experts se consacre à fournir des solutions de marketing numérique sur mesure qui génèrent des résultats.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 mb-10">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 rounded-2xl border border-accent/20">
                <Target className="text-accent" size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold uppercase text-sm mb-1">Notre Mission</h4>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
                  Bâtir des écosystèmes numériques qui propulsent votre marque.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary/10 rounded-2xl border border-secondary/20">
                <Sparkles className="text-secondary" size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold uppercase text-sm mb-1">Qui nous sommes</h4>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
                  Une équipe d'architectes digitaux et de designers passionnés.
                </p>
              </div>
            </div>
          </div>

          <AnimatedButton href="/about" variant="primary" showIcon={true}>
            En savoir plus
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
            
            {/* Overlay Stats */}
            <div className="absolute bottom-10 left-10 right-10 grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
                  <h3 className="text-3xl font-black text-gradient mb-1">{stat.value}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 blur-[80px] rounded-full animate-aura"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 blur-[80px] rounded-full animate-aura-reverse"></div>
        </div>

      </div>
    </SectionWrapper>
  );
}
