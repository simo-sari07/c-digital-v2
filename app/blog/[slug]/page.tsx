'use client';

import { useEffect, useRef, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { blogPosts } from '@/lib/blogData';
import AnimatedButton from '@/components/AnimatedButton';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);
  const post = blogPosts.find((p) => p.slug === slug);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!post) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from('.post-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('.post-image', {
        scale: 1.05,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.4')
      .from('.post-content', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.4');
    }, containerRef);

    return () => ctx.revert();
  }, [post]);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden pb-32 pt-44" ref={containerRef}>
      {/* Background Decor */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] glow-purple opacity-20 animate-aura"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Back Link */}
        <div className="mb-12 post-header">
          <Link 
            href="/blog" 
            className="group inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </div>

        {/* Header Info */}
        <div className="mb-12 post-header">
          <div className="flex items-center gap-2 mb-6 text-accent">
            <Tag size={14} />
            <span className="text-[12px] font-black uppercase tracking-[0.2em]">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-[80px] font-black uppercase tracking-tighter leading-none mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/40 text-sm font-medium border-y border-white/10 py-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-accent/60" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-accent/60" />
              <span>{post.author}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-16 post-image shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="post-content prose prose-invert prose-lg max-w-none">
          <div 
            className="text-white/80 leading-relaxed space-y-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Footer CTA */}
        <div className="mt-20 p-10 bg-gradient-to-br from-accent/10 to-transparent border border-white/10 rounded-3xl text-center post-content">
          <h3 className="text-2xl font-title text-white mb-6">Vous voulez plus de contenu comme celui-ci ?</h3>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Abonnez-vous à notre newsletter ou suivez notre parcours sur les réseaux sociaux pour rester au courant des dernières nouveautés en matière de technologie et de design.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <AnimatedButton href="/contact">
              Parlons-en
            </AnimatedButton>
            <AnimatedButton href="/blog" variant="secondary">
              Plus d'articles
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full" />
      </div>
    </div>
  );
}
