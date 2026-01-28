'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';

const servicesList = [
  {
    title: "Développement Web Sur Mesure",
    tagline: "Performance, Scalabilité & Sécurité",
    description: "Le backend est le cerveau derrière le succès de votre projet, assurant stabilité et performance pour propulser votre plateforme vers l'avant. Nous concevons des applications web robustes utilisant Next.js et Laravel pour garantir une expérience utilisateur fluide et une rapidité de chargement optimale.",
    features: ["Applications Web Progressives (PWA)", "Systèmes de gestion de contenu (CMS)", "E-commerce & Plateformes SaaS", "Optimisation Core Web Vitals"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop", // Image dyal Code/Web
    color: "accent"
  },
  {
    title: "Applications Mobiles iOS & Android",
    tagline: "Votre Business à portée de main",
    description: "Nous développons des applications mobiles exceptionnelles associant performances et design attrayant. En utilisant des technologies comme React Native et Kotlin, nous créons des interfaces intuitives qui captivent vos utilisateurs.",
    features: ["Développement iOS & Android Natif", "Cross-platform (React Native/Expo)", "Maintenance Applicative", "Intégration d'API tierces"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop", // Image dyal Mobile
    color: "secondary"
  },
  {
    title: "Production Media & Shooting",
    tagline: "L'image de marque en mouvement",
    description: "La magie visuelle qui captive passe par une production de haute qualité. Nous réalisons des shootings photo professionnels et des productions vidéo (reels, publicités, corpo) qui reflètent l'identité de votre marque.",
    features: ["Shooting Photo Professionnel", "Production Vidéo & Reels", "Montage & Motion Graphics", "Post-production & Color Grading"],
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop", // Image dyal Shooting/Camera
    color: "pink"
  },
  {
    title: "Design UI/UX & Web Design",
    tagline: "Expérience Utilisateur Immersive",
    description: "Nous créons la magie visuelle qui captive vos visiteurs avec des interfaces intuitives et esthétiques. Chaque pixel est pensé pour refléter l'identité de votre marque tout en facilitant le parcours de l'utilisateur.",
    features: ["Wireframing & Prototypage", "Design d'interface (UI) moderne", "Audit d'expérience utilisateur (UX)", "Charte graphique & Branding"],
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Image dyal Design/Figma
    color: "orange"
  },
  {
    title: "Rédaction & Stratégie de Contenu",
    tagline: "Les mots qui vendent",
    description: "Le cerveau de votre succès réside aussi dans votre message. Nos rédacteurs et copywriters créent des contenus percutants qui captivent votre audience et optimisent votre SEO structurel.",
    features: ["Copywriting Publicitaire", "Rédaction d'Articles SEO", "Storytelling de Marque", "Scripts Vidéo & Scénarios"],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop", // Image dyal Writing
    color: "blue"
  },
  {
    title: "SEO & Stratégie Digitale",
    tagline: "Dominez les Résultats de Recherche",
    description: "L'IA est au service de votre croissance grâce à des algorithmes intelligents qui améliorent vos performances. Notre expertise en SEO technique et sémantique permet à votre marque de gagner en visibilité sur Google.",
    features: ["Audit SEO technique", "Netlinking & Backlinks", "Analyse de données", "Campagnes SEA / Google Ads"],
    image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?q=80&w=2029&auto=format&fit=crop", // Image dyal SEO/Analytics
    color: "purple"
  }
];

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden pb-32 pt-44">
      {/* Background Decor */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] glow-purple opacity-20 animate-aura"></div>

      <main className="relative z-10 max-w-7xl mx-auto px-6">
        {/* SEO Header */}
        <div className="text-center mb-40">
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Expertise Digitale Premium</span>
          <h1 className="text-6xl md:text-[110px] font-black uppercase tracking-tighter leading-none mb-8">
            NOS <span className="text-gradient italic font-script lowercase">services.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed">
            Découvrez notre expertise et nos services sur mesure conçus pour propulser votre entreprise vers de nouveaux sommets digitaux.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-48">
          {servicesList.map((service, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 lg:gap-32 items-center`}>
              
              {/* Visual Side (Blast Icon, drna Image) */}
              <div className="w-full md:w-1/2 group relative">
                <div className="relative aspect-[4/3] bg-muted/20 border border-white/5 rounded-[3rem] overflow-hidden transition-all duration-700 hover:border-accent/30 shadow-2xl">
                  {/* Main Image */}
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100 opacity-60 group-hover:opacity-100"
                  />
                  {/* Glassmorphism Floating Badge inside image */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-1">{service.tagline}</p>
                    <h4 className="text-sm font-black uppercase">{service.title}</h4>
                  </div>
                </div>
                {/* Accent Glow behind image */}
                <div className="absolute -inset-4 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-1000 -z-10 bg-gradient-to-r from-accent to-secondary"></div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
                  {service.title}
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 group/feat">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center group-hover/feat:bg-accent transition-all">
                        <CheckCircle className="text-accent group-hover/feat:text-white" size={14} />
                      </div>
                      <span className="text-xs font-bold text-white/60 group-hover/feat:text-white transition-colors uppercase tracking-tight">{feat}</span>
                    </div>
                  ))}
                </div>

                <AnimatedButton href="/contact" className="px-12 py-5 text-[10px] tracking-widest">
                  Parler de votre projet
                </AnimatedButton>
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}