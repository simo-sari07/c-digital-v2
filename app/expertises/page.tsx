'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

// Logos data (Maktbedelch)
const logosData = [
  [
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
  ],
  [
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
  ],
  [
    { name: "React Native", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Expo", url: "https://www.vectorlogo.zone/logos/expoio/expoio-icon.svg" },
    { name: "Kotlin", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { name: "Flutter", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" }
  ],
  [
    { name: "Shopify", url: "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg" },
    { name: "Webflow", url: "https://www.vectorlogo.zone/logos/webflow/webflow-icon.svg" },
    { name: "WordPress", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
  ],
  [
    { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Kubernetes", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
    { name: "GitHub", url: "https://www.vectorlogo.zone/logos/github/github-icon.svg" },
    { name: "GitLab", url: "https://www.vectorlogo.zone/logos/gitlab/gitlab-icon.svg" }, 
  ]
];

export default function ExpertisesPage() {
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

  const t = dictionaries[lang]?.expertises_page || dictionaries.en.expertises_page;

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden pb-32 pt-40 px-6 font-sans">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>

      <main className="relative z-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="mb-24 text-center">
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">{t.badge}</span>
            <h1 className="text-5xl md:text-[80px] font-black uppercase tracking-tighter leading-none mb-8">
              {t.title_main} <br className="md:hidden" />
              <span className="text-gradient italic font-script lowercase">{t.title_italic}</span>
            </h1>
            <p className="text-gray-400 font-medium text-lg max-w-2xl mx-auto">{t.description}</p>
          </div>
        </motion.div>

        <div className="space-y-40">
          {t.sections.map((section: any, idx: number) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 gap-16 items-start border-b border-white/5 pb-20">
              <div className="max-w-md">
                <h2 className="text-2xl font-black text-accent uppercase tracking-widest mb-6 flex items-center gap-4">
                  <span className="w-12 h-[2px] bg-accent"></span> {section.title}
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg font-medium">{section.desc}</p>
              </div>

              <div className="flex flex-wrap gap-10 md:gap-14 items-center justify-start md:justify-end">
                {logosData[idx].map((logo, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="group relative flex flex-col items-center gap-4">
                    <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center p-4 bg-white/[0.03] rounded-[2rem] border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:border-accent shadow-2xl">
                      <img src={logo.url} alt={logo.name} className="w-full h-full object-contain filter grayscale brightness-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500" />
                    </div>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] group-hover:text-white transition-colors">{logo.name}</span>
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