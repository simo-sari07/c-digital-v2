'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import SectionWrapper from '@/components/SectionWrapper';
import SectionTitle from '@/components/SectionTitle';
import AnimatedButton from '@/components/AnimatedButton';
import AnimatedCreativeTitle from '@/components/AnimatedCreativeTitle';
import { ArrowLeft, Check, Monitor, Smartphone, Palette, ShoppingBag, Search, PenTool, Camera, Film, Code, Clapperboard } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';

// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

const themeConfig: Record<string, any> = {
  development: {
    accent: "from-indigo-400 to-violet-400",
    glow: "bg-indigo-600/10",
    shadow: "shadow-indigo-500/20",
    text: "text-indigo-400",
    border: "border-indigo-500/20",
    pattern: "grid-bg opacity-10",
    headerImage: "https://cleverix.ma/storage/2024/12/application-mobile.jpg"
  },
  ecommerce: {
    accent: "from-fuchsia-400 to-pink-400",
    glow: "bg-fuchsia-600/10",
    shadow: "shadow-fuchsia-500/20",
    text: "text-fuchsia-400",
    border: "border-fuchsia-500/20",
    pattern: "grid-bg opacity-10 scale-[1.5]",
    headerImage: "https://real-dreamhouse.com/img/blog/279/e-commerce-au-maroc-etat-des-lieux-et-perspectives-2025.webp"
  },
  production: {
    accent: "from-violet-400 to-blue-400",
    glow: "bg-violet-600/10",
    shadow: "shadow-violet-500/20",
    text: "text-violet-400",
    border: "border-violet-500/20",
    pattern: "grid-bg opacity-5 scale-[0.8]",
    headerImage: "https://blog.frame.io/wp-content/uploads/2021/09/Virtual_production_essentials.jpg"
  }
};

const iconMap: any = {
  // English mappings
  "Custom Web Development": <Monitor className="w-6 h-6" />,
  "iOS & Android Mobile Apps": <Smartphone className="w-6 h-6" />,
  "UI/UX & Web Design": <Palette className="w-6 h-6" />,
  "Shopify & Custom E-Commerce": <ShoppingBag className="w-6 h-6" />,
  "SEO & Digital Strategy": <Search className="w-6 h-6" />,
  "Copywriting & Content Strategy": <PenTool className="w-6 h-6" />,
  "Media Production & Shooting": <Camera className="w-6 h-6" />,
  "Post-Production & Motion": <Film className="w-6 h-6" />,
  // French mappings
  "Développement Web Sur Mesure": <Monitor className="w-6 h-6" />,
  "Apps Mobiles iOS & Android": <Smartphone className="w-6 h-6" />,
  "Shopify & E-Commerce Sur Mesure": <ShoppingBag className="w-6 h-6" />,
  "Rédaction & Stratégie de Contenu": <PenTool className="w-6 h-6" />,
  "Production Média & Shooting": <Camera className="w-6 h-6" />,
  "Post-Production & Motion ": <Film className="w-6 h-6" /> 
};

export default function ServiceDepartmentPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const [lang, setLang] = useState('en');
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!mounted) return;
    
    const ctx = gsap.context(() => {
      // Hero elements animation
      gsap.fromTo(".animate-hero", 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power3.out",
          delay: 0.2
        }
      );

      // Service cards staggered animation
      gsap.fromTo(".animate-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: ".grid-container",
            start: "top 80%",
          }
        }
      );
      
      // Floating animation for background glows
      gsap.to(".bg-glow", {
        y: 40,
        x: 20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [mounted, slug]);

  const department = dictionaries[lang]?.department_details?.[slug];
  const theme = themeConfig[slug] || themeConfig.development;

  if (!mounted) return null;
  if (!department) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Department Not Found</h1>
          <Link href="/services">
            <AnimatedButton showIcon>Back to Services</AnimatedButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main ref={containerRef} className="min-h-screen bg-black relative overflow-hidden pt-32 pb-20">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`bg-glow absolute top-[-10%] right-[-10%] w-[60%] h-[60%] ${theme.glow} blur-[150px] rounded-full`} />
        <div className={`bg-glow absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] ${theme.glow} blur-[120px] rounded-full delay-1000`} />
        <div className={`absolute inset-0 ${theme.pattern}`} />
      </div>

        {/* Hero Section */}
        <div className="relative min-h-[75vh] flex flex-col items-center justify-center text-center mb-24 -mt-32 -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 overflow-hidden rounded-b-[5rem]">
          {/* Background Image with Overlay & Attachment */}
          <div className="absolute inset-0 z-0">
            {theme.headerImage ? (
              <>
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2000ms] scale-110 animate-header-zoom"
                  style={{ 
                    backgroundImage: `url(${theme.headerImage})`,
                    backgroundAttachment: 'fixed'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black z-10" />
              </>
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br from-black via-black to-${theme.glow.split('-')[1]}-950/20`} />
            )}
            
            {/* Creative Background Accents */}
            <div className={`absolute top-1/4 left-1/4 w-[40rem] h-[40rem] ${theme.glow} blur-[120px] rounded-full opacity-30 animate-aura z-10`} />
            <div className={`absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] ${theme.glow} blur-[100px] rounded-full opacity-20 animate-aura-reverse z-10`} />
            
            <div className={`absolute inset-0 bg-gradient-to-r ${theme.glow.replace('bg-', 'from-').replace('/10', '/30')} to-transparent opacity-40 z-10`} />
            <div className={`absolute inset-0 ${theme.pattern} z-10`} />
          </div>

          <div className="relative z-20 max-w-5xl flex flex-col items-center">
            {/* Creative Centered Header Content */}
            <div className="flex flex-col items-center">
              <AnimatedCreativeTitle 
                title={department.title}
                accentColorClass={theme.accent}
                className="mb-4"
              />
            </div>
          </div>
        </div>

        <SectionWrapper className="relative z-10 px-6 md:px-12 lg:px-24">
          {/* Detailed Services Sections (Split Layout) */}
          <div className="space-y-32">
          {department.services.map((service: any, idx: number) => {
            const isFirst = idx % 2 === 0;
            return (
              <div 
                key={idx}
                className={`animate-card opacity-0 flex flex-col ${isFirst ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
              >
                {/* Visual Block */}
                <div className="w-full lg:w-1/2 relative aspect-square lg:aspect-video rounded-[3rem] overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.glow.replace('bg-', 'from-').replace('/10', '/30')} to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-700`} />
                  <div className={`absolute inset-0 ${theme.pattern} scale-150 opacity-20`} />
                  
                  {/* Glowing Icon Central Piece */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`relative p-12 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl ${theme.shadow} group-hover:scale-110 transition-transform duration-700`}>
                      <div className={`absolute inset-0 ${theme.glow} blur-3xl opacity-50`} />
                      {React.cloneElement(iconMap[service.title] || <Monitor className="w-6 h-6 text-white" />, { 
                        className: `w-16 h-16 relative z-10 ${theme.text}` 
                      })}
                    </div>
                  </div>

                  {/* Aesthetic Particles */}
                  <div className={`absolute top-1/4 left-1/4 w-2 h-2 rounded-full ${theme.text.replace('text-', 'bg-')} blur-sm animate-pulse`} />
                  <div className={`absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full ${theme.text.replace('text-', 'bg-')} blur-md opacity-50 animate-bounce`} />
                </div>

                {/* Content Block */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-5xl font-black text-white/10 font-anton">0{idx + 1}</span>
                      <div className={`h-px flex-1 bg-gradient-to-r from-white/20 to-transparent`} />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-anton">
                      {service.title}
                    </h3>
                    <p className={`text-sm font-black uppercase tracking-[0.3em] ${theme.text} opacity-80`}>
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-gray-400 text-lg leading-relaxed font-medium">
                    {service.desc}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((feature: any, fIdx: number) => (
                      <div key={fIdx} className="flex items-center gap-3 text-sm font-semibold text-white/70 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                        <Check size={14} className={theme.text} />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <AnimatedButton 
                      href="/contact" 
                      showIcon 
                      className={`px-10 py-4 bg-white/5 border-white/10 hover:bg-white/10 hover:border-${theme.text.split('-')[1]}-500/40 transition-all`}
                    >
                      {lang === 'fr' ? 'Demander ce Service' : 'Request this Service'}
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final CTA Section */}
        <div className="mt-40">
          <div className={`animate-card opacity-0 relative rounded-[4rem] overflow-hidden p-12 md:p-24 text-center bg-gradient-to-br from-white/[0.03] to-white/[0.01] border ${theme.border} group`}>
            <div className={`absolute inset-full ${theme.glow} blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-anton leading-[1.1]">
                Let&apos;s build your <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accent} lowercase font-script tracking-normal`}>success story</span> together.
              </h2>
              <AnimatedButton 
                href="/contact" 
                showIcon 
                className={`px-16 py-6 text-lg bg-gradient-to-r ${theme.accent} border-none shadow-2xl ${theme.shadow} hover:scale-105 transition-transform`}
              >
                {lang === 'fr' ? 'Démarrer Votre Projet' : 'Start Your Project'}
              </AnimatedButton>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
