'use client';

import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    number: '01',
    title: 'Développement Web Sur Mesure',
    desc: 'Performance, Scalabilité & Sécurité',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop'
  },
  {
    number: '02',
    title: 'Applications Mobiles iOS & Android',
    desc: 'Votre Business à portée de main',
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop", // Image dyal Mobile
  },
  {
    number: '03',
    title: "Production Media & Shooting",
    desc: "L'image de marque en mouvement",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop", // Image dyal Shooting/Camera
  },
  {
    number: '04',
    title: "Design UI/UX & Web Design",
    desc: 'Expérience Utilisateur Immersive.',
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Image dyal Design/Figma
  },
  {
    number: '05',
    title: "Rédaction & Stratégie de Contenu",
    desc: 'Le cerveau de votre succès réside aussi dans votre message.',
    image: "https://marketing-bienveillant.com/wp-content/uploads/2021/11/strategie-de-contenu-pour-votre-entreprise.png", // Image dyal SEO/Analytics
  },
  {
    number: '06',
    title: "SEO & Stratégie Digitale",
    desc: 'Dominez les Résultats de Recherche',
    image: "https://www.adimeo.com/hubfs/webinar-strategie-ia-seo-2026.webp", // Image dyal SEO/Analytics
  }
];

export default function ServicesPreview() {
  return (
    <SectionWrapper id="services" data-bgcolor="#050a14" className="bg-black">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 px-4 md:px-0">
        <SectionTitle className="text-left mb-0">
          The Only <span className="font-script text-accent normal-case">Services</span> <br className="hidden md:block" /> You'll Ever Need
        </SectionTitle>
        <Link href="/services" className="hidden md:flex items-center gap-2 text-white hover:text-accent transition-colors uppercase tracking-widest text-sm font-bold">
          View All Services <ArrowRight size={16} />
        </Link>
      </div>

      <div className="flex flex-col gap-8 pb-20">
        {services.map((service, idx) => (
          <div 
            key={idx} 
            className="sticky top-20 md:top-32 bg-neutral-900 border-t border-white/10 overflow-hidden shadow-2xl rounded-t-3xl"
            style={{
                // Stagger the sticky top slightly if we want them to pile up visible headers, 
                // or keep same top to stack completely correctly.
                // User said "kaytjm3o whda mora whda" -> gather one after another.
                // Standard sticky behavior does this.
                top: `${120 + (idx * 10)}px` 
            }}
          >
            <div className="flex flex-col md:flex-row items-center p-8 md:p-12 gap-8 h-[500px] md:h-[400px]">
              
              {/* Left: Text */}
              <div className="w-full md:w-1/3 flex flex-col justify-center">
                 <h3 className="text-4xl md:text-5xl font-black text-white uppercase mb-4 leading-[0.9]">
                   {service.title}
                 </h3>
                 <p className="text-gray-400 text-sm md:text-base font-medium max-w-xs">
                   {service.desc}
                 </p>
              </div>

              {/* Center: Image */}
              <div className="w-full md:w-1/3 h-full rounded-2xl overflow-hidden relative group">
                 <img 
                   src={service.image} 
                   alt={service.title} 
                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>

              {/* Right: Number */}
              <div className="w-full md:w-1/3 flex justify-end items-end h-full">
                 <span className="text-[8rem] md:text-[10rem] font-black text-accent leading-none opacity-20 md:opacity-100 select-none">
                   {service.number}
                 </span>
              </div>

            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 md:hidden text-center">
        <Link href="/services" className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors uppercase tracking-widest text-sm font-bold">
          View All Services <ArrowRight size={16} />
        </Link>
      </div>
    </SectionWrapper>
  );
}
