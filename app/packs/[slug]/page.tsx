'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Check, Zap, Star, ShieldCheck, Settings2 } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

const iconsMap: any = {
  web: [<Zap size={20} />, <Star size={20} />, <ShieldCheck size={20} />, <Settings2 size={20} />],
  seo: [<Zap size={20} />, <Star size={20} />, <ShieldCheck size={20} />],
  video: [<Zap size={20} />, <Star size={20} />, <ShieldCheck size={20} />]
};

export default function PackPage() {
  const params = useParams();
  const slug = params.slug as string;
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

  const t = dictionaries[lang]?.packs_page || dictionaries.en.packs_page;
  const pack = t.data[slug];

  if (!mounted) return null;
  if (!pack) return <div className="pt-40 text-center text-white font-black uppercase tracking-widest">{t.not_found.replace('{slug}', slug)}</div>;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden pb-32 font-sans">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] glow-purple opacity-20 animate-aura"></div>

      <main className="relative z-10 pt-44 px-6 max-w-[90rem] mx-auto">
        <div className="text-center mb-24">
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">{t.badge}</span>
          <h1 className="text-5xl md:text-[80px] font-black uppercase tracking-tighter leading-none mb-8">
            {pack.title.split(' ')[0]} <span className="text-gradient font-script normal-case tracking-normal">{pack.title.split(' ')[1]}s.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-medium">{t.description}</p>
        </div>

        <div className={`grid grid-cols-1 gap-8 items-stretch ${pack.plans.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
          {pack.plans.map((plan: any, index: number) => {
            const isCustom = slug === 'web' && index === 3;
            const isRecommended = (slug === 'web' && index === 1) || (slug === 'seo' && index === 1) || (slug === 'video' && index === 1);

            return (
              <div key={index} className={`relative flex flex-col p-10 rounded-[3.5rem] border transition-all duration-700 hover:translate-y-[-15px] group ${isRecommended ? 'bg-white/5 border-accent/50 scale-105 z-10 shadow-[0_0_50px_rgba(99,102,241,0.15)]' : 'bg-muted/10 border-white/5 hover:border-white/20'}`}>
                {isRecommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-primary px-8 py-2.5 rounded-full shadow-xl">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">{t.popular}</span>
                  </div>
                )}

                <div className="mb-12">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-4 rounded-[1.5rem] transition-colors ${isRecommended ? 'bg-accent text-white' : 'bg-white/5 text-accent group-hover:bg-accent/20'}`}>
                      {iconsMap[slug]?.[index]}
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter">{plan.name}</h3>
                  </div>
                  
                  <div className="flex flex-col">
                    {isCustom ? (
                      <span className="text-3xl font-black uppercase tracking-tighter leading-none">{plan.price}</span>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-2">
                          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{t.starting_at}</span>
                          <span className="text-5xl font-black tracking-tighter leading-none text-gradient">{plan.price}</span>
                        </div>
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-3">{t.unit}</span>
                      </>
                    )}
                  </div>
                </div>

                <ul className="space-y-6 mb-16 flex-grow">
                  {plan.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5"><Check size={12} className="text-accent" /></div>
                      <span className="text-gray-400 group-hover:text-white/90 transition-colors text-sm font-medium leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <AnimatedButton href={`/contact?service=${slug}&plan=${plan.name}`} className="w-full py-5 text-[10px] tracking-[0.2em]" showIcon>
                    {isCustom ? t.btn_quote : t.btn_launch}
                  </AnimatedButton>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}