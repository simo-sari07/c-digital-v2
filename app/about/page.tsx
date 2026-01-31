'use client';

import React from 'react';
import { Target, Lightbulb, BarChart4, Users2, ShieldCheck, Sparkles } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';

const stats = [
  { label: "Projets Réalisés", value: "150+" },
  { label: "Clients Satisfaits", value: "98%" },
  { label: "Années d'Expérience", value: "8+" },
  { label: "Experts Dédiés", value: "12" },
];

const values = [
  {
    title: "Créativité Illimitée",
    description: "Nous repoussons les limites du design pour créer des expériences uniques.",
    icon: <Lightbulb size={24} className="text-accent" />
  },
  {
    title: "Stratégie Data-Driven",
    description: "Chaque décision est basée sur des données réelles pour maximiser votre ROI.",
    icon: <BarChart4 size={24} className="text-secondary" />
  },
  {
    title: "Engagement Total",
    description: "Votre succès est notre priorité absolue. Nous sommes vos partenaires, pas seulement des prestataires.",
    icon: <ShieldCheck size={24} className="text-purple-500" />
  }
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden pb-32 pt-44">
      {/* Background Decor */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] glow-purple opacity-20 animate-aura"></div>

      <main className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* --- Hero Section (Mn l-ktba dyalk) --- */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-40">
          <div>
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">
              Premium Services & Support
            </span>
            <h1 className="text-5xl md:text-[80px] font-black uppercase tracking-tighter leading-none mb-8">
              À PROPOS DE <br />
              <span className="text-gradient italic font-script lowercase">c-digital.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
              Chez C-Digital, nous combinons créativité et stratégies basées sur les données pour aider votre entreprise à prospérer en ligne. Notre équipe d’experts se consacre à fournir des solutions de marketing numérique sur mesure qui génèrent des résultats.
            </p>
            <AnimatedButton href="/portfolio" className="px-10 py-5 text-xs">
              Discover our work
            </AnimatedButton>
          </div>

          <div className="relative">
            <div className="aspect-square bg-muted/20 border border-white/5 rounded-[4rem] overflow-hidden group">
               <img 
                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                 alt="Our Team" 
                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[3rem] hidden md:block shadow-2xl">
               <p className="text-black font-black text-4xl italic leading-none">Since <br/> 2018</p>
            </div>
          </div>
        </div>

        {/* --- Stats Section --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-40 border-y border-white/5 py-16">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <h2 className="text-4xl md:text-6xl font-black text-gradient mb-2">{stat.value}</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* --- Who We Are & Mission --- */}
        <div className="grid md:grid-cols-2 gap-20 items-start mb-40">
           <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                 <Target className="text-accent" /> NOTRE MISSION
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                 Votre parcours digital commence ici. Nous ne nous contentons pas de créer des sites web ; nous bâtissons des écosystèmes numériques qui propulsent votre marque. Plongez dans l'expertise C.digital pour transformer chaque interaction en une opportunité de croissance.
              </p>
           </div>
           <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                 <Sparkles className="text-secondary" /> QUI NOUS SOMMES ?
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                 Une équipe d'architectes digitaux, de designers passionnés et de stratèges data-driven. Nous croyons que la technologie doit être invisible pour laisser place à l'expérience utilisateur. C-Digital est le pont entre votre vision et la réalité numérique.
              </p>
           </div>
        </div>

        {/* --- Our Values Section --- */}
        <div className="bg-muted/30 border border-white/5 rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
           <div className="absolute inset-0 glow-pink opacity-5 -z-10"></div>
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">NOS VALEURS FONDAMENTALES</h2>
              <p className="text-white/40 uppercase tracking-widest text-[10px] font-bold italic">L'ADN de notre agence</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-12">
              {values.map((val, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                   <div className="p-5 bg-black rounded-3xl border border-white/10 mb-6 group-hover:border-accent transition-all duration-500 shadow-xl">
                      {val.icon}
                   </div>
                   <h3 className="text-xl font-black uppercase mb-4">{val.title}</h3>
                   <p className="text-gray-500 text-sm leading-relaxed">{val.description}</p>
                </div>
              ))}
           </div>
        </div>

      </main>
    </div>
  );
}