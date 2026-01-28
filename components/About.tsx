'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionWrapper from './SectionWrapper';
import AnimatedButton from './AnimatedButton';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "150+", label: "Projets Réalisés" },
  { value: "98%", label: "Clients Satisfaits" },
  { value: "8+", label: "Années d'Expérience" },
  { value: "12", label: "Experts Dédiés" },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left Column Animation
      gsap.from(leftColRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top 80%",
        }
      });

      // Right Column Animation
      gsap.from(rightColRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: rightColRef.current,
          start: "top 80%",
        }
      });

      // Stats Animation
      const statItems = statsRef.current?.children;
      if (statItems) {
        gsap.from(statItems, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-black overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-violet-900/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-fuchsia-900/5 blur-[120px] pointer-events-none" />

      <SectionWrapper>
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          
          {/* Left Column: Text */}
          <div ref={leftColRef} className="w-full lg:w-1/2 relative z-10">
            <div className="inline-block px-3 py-1 mb-6 border border-violet-500/30 rounded-full bg-violet-500/10 backdrop-blur-sm">
              <span className="text-violet-400 text-xs font-bold tracking-widest uppercase">
                Premium Services & Support
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
              À PROPOS <br />
              DE <br />
              <span className="font-script text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
                C-DIGITAL.
              </span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
              Chez C-Digital, nous combinons créativité et stratégies basées sur les données pour aider votre entreprise à prospérer en ligne. 
              Notre équipe d'experts se consacre à fournir des solutions de marketing numérique sur mesure qui génèrent des résultats.
            </p>

            <AnimatedButton href="/work" variant="primary" showIcon={true}>
              Découvrir Notre Travail
            </AnimatedButton>
          </div>

          {/* Right Column: Image */}
          <div ref={rightColRef} className="w-full lg:w-1/2 relative">
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 group">
              <div className="absolute inset-0 bg-violet-500/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="Equipe C-Digital"
                width={800}
                height={600}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Badge Overlay */}
              <div className="absolute bottom-8 left-[-2rem] bg-white text-black p-6 rounded-[2rem] shadow-2xl transform rotate-[-5deg] z-20 group-hover:rotate-0 transition-transform duration-300">
                <p className="font-script text-3xl leading-none mb-1">Since</p>
                <p className="font-black text-4xl leading-none tracking-tighter">2018</p>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Row */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-2 group-hover:from-violet-400 group-hover:to-fuchsia-400 transition-all duration-300">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </SectionWrapper>
    </section>
  );
}
