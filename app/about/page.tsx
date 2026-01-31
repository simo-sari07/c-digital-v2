'use client';

import React, { useState, useEffect } from 'react';
import { Target, Lightbulb, BarChart4, ShieldCheck, Sparkles } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

export default function AboutPage() {
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

  const t = dictionaries[lang]?.about_page || dictionaries.en.about_page;

  // Re-mapping dial l-icons localement
  const valueIcons = [
    <Lightbulb size={24} className="text-accent" />,
    <BarChart4 size={24} className="text-secondary" />,
    <ShieldCheck size={24} className="text-purple-500" />
  ];

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden pb-32 pt-44 font-sans">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] glow-purple opacity-20 animate-aura"></div>

      <main className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* --- Hero Section Dynamique --- */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-40">
          <div>
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">{t.badge}</span>
            <h1 className="text-5xl md:text-[80px] font-black uppercase tracking-tighter leading-none mb-8">
              {t.title_main} <br />
              <span className="text-gradient italic font-script lowercase">{t.title_italic}</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">{t.description}</p>
            <AnimatedButton href="/portfolio" className="px-10 py-5 text-xs">{t.cta_button}</AnimatedButton>
          </div>

          <div className="relative">
            <div className="aspect-square bg-muted/20 border border-white/5 rounded-[4rem] overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Our Team" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[3rem] hidden md:block shadow-2xl text-center">
               <p className="text-black font-black text-4xl italic leading-none">{t.since} <br/> 2018</p>
            </div>
          </div>
        </div>

        {/* --- Stats Section Dynamique --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-40 border-y border-white/5 py-16">
          {t.stats.map((stat: any, i: number) => (
            <div key={i} className="text-center">
              <h2 className="text-4xl md:text-6xl font-black text-gradient mb-2">{stat.value}</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* --- Mission & Who We Are Dynamique --- */}
        <div className="grid md:grid-cols-2 gap-20 items-start mb-40">
           <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                 <Target className="text-accent" /> {t.mission.title}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">{t.mission.text}</p>
           </div>
           <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                 <Sparkles className="text-secondary" /> {t.who.title}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">{t.who.text}</p>
           </div>
        </div>

        {/* --- Our Values Dynamique --- */}
        <div className="bg-muted/30 border border-white/5 rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">{t.values_section.title}</h2>
              <p className="text-white/40 uppercase tracking-widest text-[10px] font-bold italic">{t.values_section.subtitle}</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-12">
              {t.values_section.items.map((val: any, i: number) => (
                <div key={i} className="flex flex-col items-center text-center group">
                   <div className="p-5 bg-black rounded-3xl border border-white/10 mb-6 group-hover:border-accent transition-all duration-500 shadow-xl">
                      {valueIcons[i]}
                   </div>
                   <h3 className="text-xl font-black uppercase mb-4">{val.title}</h3>
                   <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
}