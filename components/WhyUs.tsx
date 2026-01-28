'use client';

import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    title: "Approche Axée sur la Stratégie",
    description: "Chaque projet commence par une découverte et des objectifs clairs afin que nous puissions concevoir des solutions qui génèrent des résultats commerciaux tangibles."
  },
  {
    title: "Livraison de Bout en Bout",
    description: "Du concept et du design au développement, au lancement et à l'optimisation, nous gérons le cycle de vie numérique complet."
  },
  {
    title: "Collaboration Transparente",
    description: "Communication claire, délais réalistes et rapports accessibles vous tiennent informé à chaque étape."
  },
  {
    title: "Performance & Évolutivité",
    description: "Nous concevons des solutions numériques qui fonctionnent aujourd'hui et évoluent avec votre entreprise demain."
  }
];

export default function WhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Use fromTo for rock-solid visibility and reliable animation
      gsap.fromTo(cardsRef.current, 
        { 
          opacity: 0, 
          y: 60 
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} data-bgcolor="#0f0714" className="bg-black py-32 overflow-hidden relative">
      <SectionWrapper id="why-us">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Centered Section Header - Perfectly aligned with global style */}
          <div className="max-w-4xl mx-auto text-center mb-24">
            <span className="text-violet-500 font-black tracking-[0.5em] text-xs uppercase mb-6 block">
              POURQUOI C-DIGITAL
            </span>
            <SectionTitle className="mb-8">
              Concepts <span className="font-script text-violet-400 normal-case">Précis</span>, <br />
              Résultats Impitoyables.
            </SectionTitle>
            <p className="text-gray-400 text-lg lg:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              Nous combinons stratégie, design et technologie pour construire des écosystèmes numériques qui dominent votre marché.
            </p>
          </div>

          {/* Clean, High-Visibility Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                ref={el => { cardsRef.current[idx] = el; }}
                className="group relative p-10 lg:p-14 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 hover:border-violet-500/20 transition-all duration-500"
              >
                {/* Subtle Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]"></div>
                
                <div className="relative z-10">
                  {/* High visibility number */}
                  <span className="text-violet-500/40 font-black text-5xl mb-8 block group-hover:text-violet-500 transition-colors">
                    0{idx + 1}
                  </span>
                  <h4 className="text-white font-bold text-2xl lg:text-3xl mb-4 uppercase tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 text-base lg:text-lg leading-relaxed font-medium group-hover:text-gray-400 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </SectionWrapper>
    </section>
  );
}
