'use client';

import { useParams } from 'next/navigation';
import { Check, Zap, Star, ShieldCheck, Infinity, Settings2 } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';

// 1. Definir l-interface bach TypeScript ma-ib9ach ichki
interface Plan {
  name: string;
  price: string;
  features: string[];
  icon: React.ReactNode;
  recommended?: boolean;
  isCustom?: boolean; // Optional property
}

interface Pack {
  title: string;
  plans: Plan[];
}

const packsData: Record<string, Pack> = {
  web: {
    title: "Pack Web",
    plans: [
      { 
        name: "Starter", 
        price: "1 999", 
        features: ["Landing Page (One-page)", "Design Mobile First", "WhatsApp Integration", "Hébergement Included (1 an)", "Certificat SSL Gratuit", "Le nom de domaine .com"],
        icon: <Zap size={20} />
      },
      { 
        name: "Business", 
        price: "4 999", 
        features: ["Site Multipage (5-7 pages)", "Blog / News Section", "SEO On-page Basic", "Panneau d'administration", "Support 24/7 (3 mois)", "Le nom de domaine .com"],
        recommended: true,
        icon: <Star size={20} />
      },
      { 
        name: "E-Commerce", 
        price: "9 999", 
        features: ["Boutique en ligne complète", "Paiements (CMI, Stripe, PayPal)", "Gestion de Stock & Commandes", "Formation à l'outil", "Sécurité Bancaire Avancée", "Le nom de domaine .com"],
        icon: <ShieldCheck size={20} />
      },
      { 
        name: "Sur Mesure", 
        price: "Contactez-nous", 
        features: ["Applications Web Complexes", "Systèmes SaaS Personnalisés", "Intégration API Tierces", "Maintenance VIP Dédiée", "Évolutivité Illimitée"],
        icon: <Settings2 size={20} />,
        isCustom: true
      }
    ]
  },
  seo: {
    title: "Pack SEO",
    plans: [
      { 
        name: "Standard", 
        price: "1 249", 
        features: ["Audit Technique SEO", "Mots-clés (5 ciblés)", "Optimisation Google My Business", "Rapport de Performance Mensuel"],
        icon: <Zap size={20} />
      },
      { 
        name: "SEO Pro", 
        price: "3 999", 
        features: ["Stratégie de Contenu (Blog)", "Audit Concurrentiel Profond", "Backlinks de Qualité (3/mois)", "Optimisation de Vitesse (Core Vitals)"],
        recommended: true,
        icon: <Star size={20} />
      },
      { 
        name: "Ultimate SEO", 
        price: "6 699", 
        features: ["Domination de Niche", "SEO Local & National Intensif", "Rédaction Contenu Premium", "Suivi Positionnement Temps Réel"],
        icon: <ShieldCheck size={20} />
      }
    ]
  },
  video: {
    title: "Pack Vidéo",
    plans: [
      { 
        name: "Social Starter", 
        price: "2 499", 
        features: ["2 Vidéos Reels / TikTok", "Montage Dynamique", "Musique Trend Incluse", "Format Vertical HD"],
        icon: <Zap size={20} />
      },
      { 
        name: "Creative Pro", 
        price: "5 499", 
        features: ["4 Vidéos (Reels + Corporate)", "Motion Design de base", "Étalonnage (Color Grading)", "Scriptwriting & Storyboard"],
        recommended: true,
        icon: <Star size={20} />
      },
      { 
        name: "Cinematic Elite", 
        price: "10 999", 
        features: ["Publicité TV / Cinéma", "Motion Graphics 3D", "Prises de vue Drone 4K", "Direction Artistique Complète"],
        icon: <ShieldCheck size={20} />
      }
    ]
  }
};

export default function PackPage() {
  const params = useParams();
  const slug = params.slug as string;
  const pack = packsData[slug as keyof typeof packsData];

  if (!pack) return <div className="pt-40 text-center text-white font-black uppercase tracking-widest">Le pack "{slug}" n'existe pas.</div>;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden pb-32">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] glow-purple opacity-20 animate-aura"></div>

      <main className="relative z-10 pt-44 px-6 max-w-[90rem] mx-auto">
        <div className="text-center mb-24">
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Tarification Transparente</span>
          <h1 className="text-5xl md:text-[80px] font-black uppercase tracking-tighter leading-none mb-8">
            {pack.title.split(' ')[0]} <span className="text-gradient italic font-script lowercase tracking-normal">{pack.title.split(' ')[1]}s.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-medium">
            Investissez dans des solutions de haute performance conçues pour maximiser votre retour sur investissement.
          </p>
        </div>

        <div className={`grid grid-cols-1 gap-8 items-stretch ${pack.plans.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
          {pack.plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative flex flex-col p-10 rounded-[3.5rem] border transition-all duration-700 hover:translate-y-[-15px] group ${
                plan.recommended 
                ? 'bg-white/5 border-accent/50 scale-105 z-10 shadow-[0_0_50px_rgba(99,102,241,0.15)]' 
                : 'bg-muted/10 border-white/5 hover:border-white/20'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-primary px-8 py-2.5 rounded-full shadow-xl">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em]">Plus Populaire</span>
                </div>
              )}

              <div className="mb-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-4 rounded-[1.5rem] transition-colors ${plan.recommended ? 'bg-accent text-white' : 'bg-white/5 text-accent group-hover:bg-accent/20'}`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">{plan.name}</h3>
                </div>
                
                <div className="flex flex-col">
                  {/* Hna l-Fix dial TypeScript: plan.isCustom m9ada daba */}
                  {plan.isCustom ? (
                    <span className="text-3xl font-black uppercase tracking-tighter leading-none">{plan.price}</span>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">À partir de</span>
                        <span className="text-5xl font-black tracking-tighter leading-none text-gradient">{plan.price}</span>
                      </div>
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-3">MAD / HT</span>
                    </>
                  )}
                </div>
              </div>

              <ul className="space-y-6 mb-16 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                       <Check size={12} className="text-accent" />
                    </div>
                    <span className="text-gray-400 group-hover:text-white/90 transition-colors text-sm font-medium leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <AnimatedButton 
                  href={`/contact?service=${slug}&plan=${plan.name}`} 
                  className="w-full py-5 text-[10px] tracking-[0.2em]" 
                  showIcon={true}
                >
                  {plan.isCustom ? "Demander un Devis" : "Lancer mon Projet"}
                </AnimatedButton>
              </div>

              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 -z-10 bg-gradient-to-br from-accent to-secondary rounded-[3.5rem]`}></div>
            </div>
          ))}
        </div>

        <div className="mt-32 pt-16 border-t border-white/5 text-center">
          <p className="text-[9px] font-black uppercase tracking-[1em] text-white/10">
            C-DIGITAL EXCELLENCE • TRANSFORMING VISIONS INTO REALITY
          </p>
        </div>
      </main>
    </div>
  );
}