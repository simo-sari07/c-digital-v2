'use client';

import SectionTitle from './SectionTitle';

// --- Data ---
const ICON_ROWS = [
    [
        { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'GSAP', icon: 'https://cdn.prod.website-files.com/67a1f290f2efe04ef2447e11/67a1f290f2efe04ef2447e85_gsap.svg' },
        { name: 'Framer', icon: 'https://www.vectorlogo.zone/logos/framer/framer-icon.svg' },
        { name: 'Three.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
        { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
        { name: 'Symfony', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg' },
    ],
    [
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Firebase', icon: 'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'Supabase', icon: 'https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg' },
        { name: 'Prisma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
        { name: 'GitHub', icon: 'https://www.vectorlogo.zone/logos/github/github-icon.svg' },
        { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
        { name: 'Shopify', icon: 'https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg' },
        { name: 'Webflow', icon: 'https://www.vectorlogo.zone/logos/webflow/webflow-icon.svg' },
    ]
];

// --- Sub-Components ---

const TechIcon = ({ tech }: { tech: { name: string, icon: string } }) => (
    <div className="flex-shrink-0 flex items-center justify-center bg-white/[0.03] backdrop-blur-xl border border-white/10 p-5 rounded-[1.5rem] hover:border-violet-500/40 hover:bg-white/[0.08] transition-all duration-500 group/icon h-24 w-24 md:h-28 md:w-28 shadow-2xl">
        <img
            src={tech.icon}
            alt={tech.name}
            loading="lazy"
            className="w-12 h-12 md:w-14 md:h-14 object-contain brightness-90 saturate-[0.8] group-hover/icon:brightness-110 group-hover/icon:saturate-100 group-hover/icon:scale-110 transition-all duration-500"
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://www.vectorlogo.zone/logos/github/github-icon.svg';
            }}
        />
    </div>
);

const MarqueeRow = ({ items, reverse = false }: { items: typeof ICON_ROWS[0], reverse?: boolean }) => (
    <div className="flex gap-4 group overflow-hidden">
        <div className={`flex gap-4 whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
            {/* Repeated 4 times to ensure seamless loop on even the largest screens */}
            {[...items, ...items, ...items, ...items].map((tech, i) => (
                <TechIcon key={`${tech.name}-${i}`} tech={tech} />
            ))}
        </div>
    </div>
);

// --- Main Component ---

export default function TechStack() {
    return (
        <section id="stack" data-bgcolor="#111111" className="bg-black py-20 overflow-hidden w-full relative">
            {/* Title & Description */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-20 relative z-30">
                <SectionTitle>
                    NOTRE <span className="font-script text-violet-400 normal-case">STACK</span> TECHNIQUE
                </SectionTitle>
                <p className="text-white/60 max-w-2xl mx-auto mt-6 text-base md:text-lg font-medium leading-relaxed">
                    Nous utilisons les meilleures technologies pour créer des expériences numériques performantes et évolutives.
                </p>
            </div>

            {/* Scrolling Grid */}
            <div className="flex flex-col gap-6 relative w-full">
                {/* Visual Depth Masks */}
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

            {/* Global Keyframes */}
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
