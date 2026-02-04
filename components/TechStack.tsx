'use client';

import React, { useState, useEffect } from 'react';
import SectionTitle from './SectionTitle';
import Image from 'next/image';
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

// --- Data (Cloudinary URLs) ---
const ICON_ROWS = [
    [
        { name: 'Next.js', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045679/nextjs-original_xrrcmm.svg' },
        { name: 'React', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045679/react-original_cdwjoj.svg' },
        { name: 'TypeScript', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045678/typescript-original_cx3qhm.svg' },
        { name: 'Tailwind', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045673/tailwindcss-original_abwtk8.svg' },
        { name: 'Framer', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045672/framer-icon_lfq39b.svg' },
        { name: 'Figma', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045672/figma-original_kb0ybr.svg' },
        { name: 'Python', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045671/python-original_uurepm.svg' },
        { name: 'Django', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045671/django-plain_x4dsph.svg' },
        { name: 'Laravel', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045671/laravel-original_loy3w4.svg' },
        { name: 'Symfony', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045667/symfony-original_ya5tuf.svg' },
    ],
    [
        { name: 'Node.js', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045665/nodejs-original_agwo2g.svg' },
        { name: 'Firebase', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045664/firebase-icon_tj0wx0.svg' },
        { name: 'PostgreSQL', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045664/postgresql-original_f3ib1k.svg' },
        { name: 'Supabase', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045655/supabase-icon_gb4pqw.svg' },
        { name: 'Prisma', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045653/prisma-original_w0nhbl.svg' },
        { name: 'Docker', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045653/docker-original_wvs1s0.svg' },
        { name: 'GitHub', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045652/github-icon_mzxhpc.svg' },
        { name: 'React Native', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045652/react-original_1_yzvlzv.svg' },
        { name: 'Flutter', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045651/flutter-original_rjekta.svg' },
        { name: 'Shopify', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045651/shopify-icon_pgfj7s.svg' },
        { name: 'Webflow', icon: 'https://res.cloudinary.com/digfptrqs/image/upload/v1770045651/webflow-icon_eusy0v.svg' },
    ]
];

// --- Sub-Components ---

const TechIcon = ({ tech }: { tech: { name: string, icon: string } }) => (
    <div className="flex-shrink-0 flex items-center justify-center bg-white/[0.03] backdrop-blur-xl border border-white/10 p-5 rounded-[1.5rem] hover:border-violet-500/40 hover:bg-white/[0.08] transition-all duration-500 group/icon h-24 w-24 md:h-28 md:w-28 shadow-2xl relative">
        <Image
            src={tech.icon}
            alt={`Technology Logo: ${tech.name}`}
            width={56} // Optimisation Performance: misa7a t-abita (14*4)
            height={56}
            loading="lazy"
            className="object-contain brightness-90 saturate-[0.8] group-hover/icon:brightness-110 group-hover/icon:saturate-100 group-hover/icon:scale-110 transition-all duration-500"
        />
    </div>
);

const MarqueeRow = ({ items, reverse = false }: { items: typeof ICON_ROWS[0], reverse?: boolean }) => (
    <div className="flex gap-4 group overflow-hidden">
        <div className={`flex gap-4 whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
            {[...items, ...items, ...items, ...items].map((tech, i) => (
                <TechIcon key={`${tech.name}-${i}`} tech={tech} />
            ))}
        </div>
    </div>
);

// --- Main Component ---

export default function TechStack() {
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

    const t = dictionaries[lang]?.tech_stack || dictionaries.en.tech_stack;

    if (!mounted) return null;

    return (
        <section id="stack" data-bgcolor="#111111" className="bg-black py-24 md:py-32 overflow-hidden w-full relative font-sans">
            <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-20 relative z-30">
                <SectionTitle>
                    {t.title_main} <span className="font-script text-violet-400 normal-case tracking-normal">{t.title_script}</span> {t.title_sub}
                </SectionTitle>
                <p className="text-white/60 max-w-2xl mx-auto mt-6 text-base md:text-lg font-black uppercase tracking-widest leading-relaxed">
                    {t.description}
                </p>
            </div>

            <div className="flex flex-col gap-6 relative w-full">
                <div className="absolute inset-y-0 left-0 w-[15%] md:w-[25%] bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-[15%] md:w-[25%] bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

                {ICON_ROWS.map((row, idx) => (
                    <MarqueeRow
                        key={`row-${idx}`}
                        items={row}
                        reverse={idx % 2 !== 0}
                    />
                ))}
            </div>

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-reverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .animate-marquee {
                    animation: marquee 35s linear infinite;
                }
                .animate-marquee-reverse {
                    animation: marquee-reverse 35s linear infinite;
                }
                .group:hover .animate-marquee,
                .group:hover .animate-marquee-reverse {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}