'use client';

import { useParams } from 'next/navigation';
import { Check, Zap, Star, ShieldCheck } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';

const packsData = {
  web: {
    title: "Pack Web",
    plans: [
      { 
        name: "Standard", 
        price: "4 000", 
        features: ["Site Vitrine One-page", "Design Responsive", "Formulaire de Contact", "Hébergement 1 an Included"],
        icon: <Zap size={20} />
      },
      { 
        name: "Pro", 
        price: "8 000", 
        features: ["Jusqu'à 5 Pages", "SEO Google Basique", "Dashboard Admin", "Support Technique 3 mois"],
        recommended: true,
        icon: <Star size={20} />
      },
      { 
        name: "Ultimate", 
        price: "15 000", 
        features: ["E-commerce Complet", "Paiement en ligne", "SEO Avancé Strategy", "Maintenance VIP 1 an"],
        icon: <ShieldCheck size={20} />
      }
    ]
  },
  seo: {
    title: "Pack SEO",
    plans: [
      { 
        name: "Standard", 
        price: "2 000", 
        features: ["Audit Technique", "Optimisation 5 Mots-clés", "Google My Business", "Rapport Mensuel"],
        icon: <Zap size={20} />
      },
      { 
        name: "Pro", 
        price: "4 500", 
        features: ["Optimisation 15 Mots-clés", "Stratégie de Contenu", "3 Backlinks Qualitatifs", "Analyse de la Concurrence"],
        recommended: true,
        icon: <Star size={20} />
      },
      { 
        name: "Ultimate", 
        price: "9 000", 
        features: ["SEO International", "Campagne Netlinking Luxe", "Rédaction Blog Hebdo", "Garantie de Croissance"],
        icon: <ShieldCheck size={20} />
      }
    ]
  },
  video: {
    title: "Pack Vidéo",
    plans: [
      { 
        name: "Standard", 
        price: "3 000", 
        features: ["Montage 1 Vidéo (1 min)", "Color Grading", "Musique Libre de Droit", "Format Full HD"],
        icon: <Zap size={20} />
      },
      { 
        name: "Pro", 
        price: "6 000", 
        features: ["3 Vidéos par Mois", "Motion Graphics (Intros)", "Sous-titres Dynamiques", "Format Reels / TikTok"],
        recommended: true,
        icon: <Star size={20} />
      },
      { 
        name: "Ultimate", 
        price: "12 000", 
        features: ["Production Publicitaire", "Scriptwriting & Storyboard", "Motion Graphics 3D", "Qualité Cinéma 4K"],
        icon: <ShieldCheck size={20} />
      }
    ]
  }
};

export default function PackPage() {
  const params = useParams();
  const slug = params.slug as string;
  const pack = packsData[slug as keyof typeof packsData];

  if (!pack) return <div className="pt-40 text-center text-white font-black">PACK NON TROUVÉ.</div>;

  return (
    <div className="relative min-h-screen bg-background text-white overflow-hidden pb-32">
      {/* Background Decor */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] glow-purple opacity-20 animate-aura"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] glow-pink opacity-20 animate-aura-reverse"></div>

      <main className="relative z-10 pt-44 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-4">
            {pack.title.split(' ')[0]} <br />
            <span className="text-gradient italic">{pack.title.split(' ')[1]}s</span>
          </h1>
          <p className="font-script text-2xl md:text-3xl text-white/60 mt-4">
            Choisissez l'excellence adaptée à vos ambitions.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pack.plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative flex flex-col p-10 rounded-[3rem] border transition-all duration-500 hover:translate-y-[-10px] shadow-2xl ${
                plan.recommended 
                ? 'bg-white/5 border-accent scale-105 z-10' 
                : 'bg-muted/40 border-white/5 hover:border-white/20'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-primary px-6 py-2 rounded-full shadow-lg shadow-accent/20">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Plus Populaire</span>
                </div>
              )}

              {/* Card Header */}
              <div className="mb-10 flex justify-between items-start">
                <div>
                  <div className="text-accent mb-4 bg-accent/10 p-3 rounded-2xl inline-block">
                    {plan.icon}
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tight leading-none">{plan.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black leading-none">{plan.price}</div>
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">MAD / Pack</div>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-5 mb-12 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <Check size={18} className="text-accent mt-0.5 shrink-0" />
                    <span className="text-gray-400 group-hover:text-white transition-colors text-sm font-medium leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <div className="mt-auto">
                <AnimatedButton 
                  href={`/contact?service=${slug}&plan=${plan.name}`} 
                  className="w-full py-5 text-[10px]" 
                  showIcon={true}
                >
                  Démarrer le projet
                </AnimatedButton>
              </div>

              {/* Subtle Aura for Recommended */}
              {plan.recommended && (
                <div className="absolute inset-0 glow-purple opacity-10 -z-10 rounded-[3rem]"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Tagline */}
        <div className="mt-24 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Digital Concept Agency • L'Art de Dominer le Marché
          </p>
        </div>
      </main>
    </div>
  );
}