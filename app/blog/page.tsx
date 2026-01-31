'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { blogPosts } from '@/lib/blogData';
import AnimatedButton from '@/components/AnimatedButton';
import { ArrowRight, Calendar, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.blog-header-content', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      });

      // Alternating rows animation
      rowsRef.current.forEach((row, index) => {
        if (row) {
          const imageSide = row.querySelector('.blog-image-side');
          const contentSide = row.querySelector('.blog-content-side');

          gsap.from(imageSide, {
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
            },
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
          });

          gsap.from(contentSide, {
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
            },
            x: index % 2 === 0 ? 100 : -100,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.2,
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden pb-32 pt-44" ref={containerRef}>
      {/* Background Decor */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] glow-purple opacity-20 animate-aura"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] glow-pink opacity-10 animate-aura-reverse"></div>

      <main className="relative z-10 max-w-7xl mx-auto px-6">
        {/* SEO Header - Styled like Services Page */}
        <div className="text-center mb-40 blog-header-content">
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Actualités & Digital</span>
          <h1 className="text-5xl md:text-[80px] font-black uppercase tracking-tighter leading-none mb-8">
            NOS <span className="text-gradient italic font-script lowercase">articles.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed">
            Découvrez nos dernières réflexions sur le développement, le branding et l'avenir du numérique.
          </p>
        </div>

        {/* Blog Posts List - Alternating Layout like Services */}
        <div className="space-y-48">
          {blogPosts.map((post, idx) => (
            <div 
              key={post.id} 
              ref={(el) => { rowsRef.current[idx] = el; }}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 lg:gap-32 items-center`}
            >
              
              {/* Visual Side (Image with Hover Effect) */}
              <div className="w-full md:w-1/2 group relative blog-image-side">
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-[4/3] bg-muted/20 border border-white/5 rounded-[3rem] overflow-hidden transition-all duration-700 hover:border-accent/30 shadow-2xl cursor-pointer">
                    {/* Main Image */}
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100 opacity-60 group-hover:opacity-100"
                    />
                    {/* Glassmorphism Floating Badge inside image */}
                    <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-1">{post.category}</p>
                      <h4 className="text-sm font-black uppercase text-white line-clamp-1">{post.title}</h4>
                    </div>
                  </div>
                </Link>
                {/* Accent Glow behind image */}
                <div className="absolute -inset-4 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-1000 -z-10 bg-gradient-to-r from-accent to-secondary"></div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 blog-content-side">
                <div className="flex items-center gap-4 text-accent/60 text-[10px] font-bold uppercase tracking-widest mb-6">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <div className="flex items-center gap-1.5">
                    <User size={12} />
                    <span>{post.author}</span>
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                  {post.excerpt}
                </p>

                <AnimatedButton href={`/blog/${post.slug}`} className="px-12 py-5 text-[10px] tracking-widest">
                  <span className="flex items-center gap-2">
                    Lire l'article
                    <ArrowRight size={14} />
                  </span>
                </AnimatedButton>
              </div>

            </div>
          ))}
        </div>
      </main>

      <style jsx global>{`
        .grid-bg {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>
    </div>
  );
}
