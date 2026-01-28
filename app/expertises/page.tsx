'use client';

import React from 'react';
import { motion } from 'framer-motion';

const expertiseData = [
  {
    title: "BACKEND",
    description: "Le cerveau derrière le succès de votre projet. Stabilité, sécurité et performance : notre Backend propulse votre plateforme vers l'avant.",
    logos: [
       { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
       { name: "Firebase", url: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" },
       { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
       { name: "Prisma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
       { name: "Supabase", url: "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg" },
       { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
       { name: "Django", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
       { name: "Laravel", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
       { name: "Symfony", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg" },
       { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    ]
  },
  {
    title: "FRONTEND",
    description: "La magie visuelle qui captive. Interfaces intuitives et esthétiques pour une expérience utilisateur mémorable.",
    logos: [
       { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
       { name: "React JS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
       { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
       { name: "Tailwind", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
       { name: "GSAP", url: "https://cdn.prod.website-files.com/67a1f290f2efe04ef2447e11/67a1f290f2efe04ef2447e85_gsap.svg" },
       { name: "Framer", url: "https://www.vectorlogo.zone/logos/framer/framer-icon.svg" },
       { name: "Three.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
       { name: "Redux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
       { name: "Zustand", url: "https://raw.githubusercontent.com/pmndrs/zustand/main/zustand.ico" },
       { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }
    ]
  },
  {
    title: "APPLICATION MOBILE",
    description: "Votre Business à portée de main. Des applications iOS et Android exceptionnelles, associant performances et design attrayant.",
    logos: [
       { name: "React Native", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
       { name: "Expo", url: "https://www.vectorlogo.zone/logos/expoio/expoio-icon.svg" },
       { name: "Kotlin", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
       { name: "Flutter", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" }
    ]
  },
  {
    title: "E-COMMERCE & CMS",
    description: "Solutions e-commerce sur mesure. Spécialistes Shopify et Webflow pour une présence en ligne percutante.",
    logos: [
       { name: "Shopify", url: "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg" },
       { name: "Webflow", url: "https://www.vectorlogo.zone/logos/webflow/webflow-icon.svg" },
       { name: "WordPress", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
    ]
  },
  {
    title: "OUTILS DEVOPS & QA",
    description: "L'efficacité à son meilleur. Des outils qui automatisent les processus et garantissent la perfection à chaque étape.",
    logos: [
       { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
       { name: "Kubernetes", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
       { name: "GitHub", url: "https://www.vectorlogo.zone/logos/github/github-icon.svg" },
       { name: "GitLab", url: "https://www.vectorlogo.zone/logos/gitlab/gitlab-icon.svg" }, 
    ]
  }
];

export default function ExpertisesPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden pb-32 pt-40 px-6 font-sans">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>

      <main className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">
            NOTRE PALETTE <br />
            <span className="text-gradient italic lowercase font-serif">Technologique.</span>
          </h1>
          <p className="text-gray-400 font-medium text-lg max-w-2xl">
            Maîtrise des outils de pointe pour des solutions digitales robustes, scalables et innovantes.
          </p>
        </motion.div>

        <div className="space-y-40">
          {expertiseData.map((section, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="grid md:grid-cols-2 gap-16 items-start border-b border-white/5 pb-20"
            >
              {/* Text Side */}
              <div className="max-w-md">
                <h2 className="text-2xl font-black text-accent uppercase tracking-widest mb-6 flex items-center gap-4">
                  <span className="w-12 h-[2px] bg-accent"></span> {section.title}
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg font-medium">
                  {section.description}
                </p>
              </div>

              {/* Logos Grid Side */}
              <div className="flex flex-wrap gap-10 md:gap-14 items-center justify-start md:justify-end">
                {section.logos.map((logo, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group relative flex flex-col items-center gap-4"
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                    
                    <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center p-4 bg-white/[0.03] rounded-[2rem] border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:border-accent group-hover:bg-white/[0.08] shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
                      
                      <img 
                        src={logo.url} 
                        alt={logo.name} 
                        className="w-full h-full object-contain filter grayscale brightness-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 relative z-10"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://cdn-icons-png.flaticon.com/512/25/25231.png";
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                      {logo.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}