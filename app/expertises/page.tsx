'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

// Logos data (Cloudinary URLs)
const logosData = [
  [
    { name: "Node.js", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045665/nodejs-original_agwo2g.svg" },
    { name: "Firebase", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045664/firebase-icon_tj0wx0.svg" },
    { name: "PostgreSQL", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045664/postgresql-original_f3ib1k.svg" },
    { name: "Prisma", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045653/prisma-original_w0nhbl.svg" },
    { name: "Supabase", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045655/supabase-icon_gb4pqw.svg" },
    { name: "Python", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045671/python-original_uurepm.svg" },
    { name: "Django", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045671/django-plain_x4dsph.svg" },
    { name: "Laravel", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045671/laravel-original_loy3w4.svg" },
    { name: "Symfony", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045667/symfony-original_ya5tuf.svg" },
    { name: "MongoDB", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770047170/mongodb-original_zmyw4a.svg" },
  ],
  [
    { name: "Next.js", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045679/nextjs-original_xrrcmm.svg" },
    { name: "React JS", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045679/react-original_cdwjoj.svg" },
    { name: "TypeScript", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045678/typescript-original_cx3qhm.svg" },
    { name: "Tailwind", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045673/tailwindcss-original_abwtk8.svg" },
    { name: "Framer", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045672/framer-icon_lfq39b.svg" },
    { name: "Redux", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770047816/redux-original_nxujpm.svg" },
    { name: "Figma", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045672/figma-original_kb0ybr.svg" }
  ],
  [
    { name: "React Native", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045679/react-original_cdwjoj.svg" },
    { name: "Expo", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770047881/expoio-icon_z5lhfq.svg" },
    { name: "Kotlin", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770047883/kotlin-original_v8q7ze.svg" },
    { name: "Flutter", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045651/flutter-original_rjekta.svg" }
  ],
  [
    { name: "Shopify", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045651/shopify-icon_pgfj7s.svg" },
    { name: "Webflow", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045651/webflow-icon_eusy0v.svg" },
    { name: "WordPress", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770047976/wordpress-plain_rer2xi.svg" },
  ],
  [
    { name: "Docker", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045653/docker-original_wvs1s0.svg" },
    { name: "Kubernetes", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770048024/kubernetes-plain_tckrvs.svg" },
    { name: "GitHub", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770045652/github-icon_mzxhpc.svg" },
    { name: "GitLab", url: "https://res.cloudinary.com/digfptrqs/image/upload/v1770048025/gitlab-icon_obbns3.svg" }, 
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
              <span className="text-gradient font-script normal-case tracking-normal">{t.title_italic}</span>
            </h1>
            <p className="text-gray-400 font-black uppercase tracking-widest text-sm max-w-2xl mx-auto leading-relaxed opacity-60">
              {t.description}
            </p>
          </div>
        </motion.div>

        <div className="space-y-40">
          {t.sections.map((section: any, idx: number) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 gap-16 items-start border-b border-white/5 pb-20">
              <div className="max-w-md text-left">
                <h2 className="text-2xl font-black text-accent uppercase tracking-widest mb-6 flex items-center gap-4">
                  <span className="w-12 h-[2px] bg-accent"></span> {section.title}
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg font-medium">{section.desc}</p>
              </div>

              <div className="flex flex-wrap gap-10 md:gap-14 items-center justify-start md:justify-end">
                {logosData[idx].map((logo, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="group relative flex flex-col items-center gap-4">
                    <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center p-4 bg-white/[0.03] rounded-[2rem] border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:border-accent shadow-2xl relative">
                      <Image 
                        src={logo.url} 
                        alt={`Technology Expertise: ${logo.name}`} 
                        width={64} // Optimisation CLS o Performance
                        height={64}
                        className="object-contain filter grayscale brightness-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500" 
                        loading="lazy"
                      />
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