'use client';

import Link from 'next/link';
import { Instagram, Linkedin, Youtube, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {


  return (
    <footer className="w-full bg-black pt-32 relative overflow-hidden">
      <style jsx>{`
        @keyframes slide-pattern {
          0% { background-position: 0 0; }
          100% { background-position: 40px 0; }
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(167, 139, 250, 0.3);
          transform: translateY(-5px);
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-6">
        {/* Large Header Section */}
        <div className="mb-24 text-center">
          <h2 className="text-[12vw] md:text-[10vw] font-black text-[#1A1A1A] uppercase tracking-tighter leading-[0.8] relative inline-block">
            C <span className="text-violet-500">●</span> DIGITAL
          </h2>
          <p className="text-white text-lg md:text-2xl font-bold tracking-[0.3em] uppercase mt-4">
            L&apos;ART DE <span className="text-violet-500">DOMINER</span> LE MARCHÉ.
          </p>
        </div>

        {/* Floating CTA Banner Section */}
        <div className="relative group bg-violet-500 rounded-[2.5rem] p-8 md:p-14 overflow-hidden border border-white/10 shadow-[0_20px_100px_rgba(167,139,250,0.3)] mb-20">
          <div className="absolute top-4 right-4 w-64 h-24 opacity-40 pointer-events-none">
            <svg viewBox="0 0 200 60" className="w-full h-full text-white fill-current">
              <path d="M10,30 Q50,5 90,30 T170,30" strokeWidth="15" fill="none" stroke="currentColor" strokeLinecap="round" />
              <path d="M20,45 Q60,20 100,45 T180,45" strokeWidth="8" fill="none" stroke="currentColor" strokeLinecap="round" />
            </svg>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 text-black">
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.8] tracking-tighter mb-8">
                WANT TO GET <br /> STARTED?
              </h2>
              <p className="font-medium text-sm md:text-base max-w-xl leading-snug">
                Plongez dans l&apos;excellence avec notre équipe. Des créatifs passionnés prêts à propulser votre projet vers de nouveaux sommets.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-black italic text-4xl lg:text-5xl hover:translate-x-4 transition-transform"
              >
                DISCUTER <ArrowRight size={48} className="mt-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          
          {/* Expertises Card */}
          <div className="glass-card rounded-3xl p-8">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-violet-500 font-bold text-xs">01</span>
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">EXPERTISES</h4>
            </div>
            <ul className="space-y-4">
              {['Création de Sites', 'E-Commerce Pro', 'Apps Mobiles', 'Stratégie SEO', 'Identité Visuelle'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Agence Card */}
          <div className="glass-card rounded-3xl p-8">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-violet-500 font-bold text-xs">02</span>
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">AGENCE</h4>
            </div>
            <ul className="space-y-4">
              {['Notre ADN', 'Notre Équipe', 'Réalisations', 'Packs Elite', 'Contact Direct'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Card */}
          <div className="glass-card rounded-3xl p-8">
            <div className="flex items-center gap-2 mb-8">
              <Mail className="text-violet-500" size={16} />
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">CONTACT</h4>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">SUPPORT LIGNE</p>
                <p className="text-white font-black">+212 655 55 55 55</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">EMAIL</p>
                <p className="text-white font-black break-all text-xs">contact@C-Digital.com</p>
              </div>
              <div className="flex gap-3">
                {[Linkedin, Youtube, Instagram].map((Icon, i) => (
                  <Link key={i} href="#" className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-white hover:text-violet-500 hover:border-violet-500 transition-all">
                    <Icon size={18} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="glass-card rounded-3xl p-8">
            <div className="flex justify-between items-start mb-12">
              <div className="p-2 bg-white/5 rounded-lg">
                <MapPin size={24} className="text-violet-500" />
              </div>
            </div>
            <h3 className="text-2xl font-medium text-white uppercase leading-tight mb-8">
              48 Lot IGUIDER Allal El Fasi Marrakech
            </h3>
            <Link 
              href="#" 
              className="inline-flex items-center justify-center w-full bg-violet-500 text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest gap-2 hover:bg-white transition-colors"
            >
              <MapPin size={14} /> VOIR SUR LA CARTE
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 pb-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest gap-4">
          <div className="flex items-center gap-4">
            <span className="text-violet-500">●</span>
            <p>© 2026 C-DIGITAL. TOUS DROITS RÉSERVÉS.</p>
          </div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">CONFIDENTIALITÉ</Link>
            <Link href="#" className="hover:text-white transition-colors">LÉGAL</Link>
            <Link href="#" className="hover:text-white transition-colors">CONDITIONS</Link>
            <Link href="#" className="hover:text-white transition-colors">COOKIES</Link>
          </div>
          <div className="flex items-center gap-2 text-violet-500/50">
            <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse"></span>
            PROTOCOLE SÉCURISÉ V.2.5
          </div>
        </div>
      </div>

      {/* Decorative Scrolling Chevron */}
      <div className="w-full h-12 border-t border-white/5 overflow-hidden bg-black relative">
        <div
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'20\' viewBox=\'0 0 40 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0 L10 10 L0 20 L10 20 L20 10 L10 0 Z M20 0 L30 10 L20 20 L30 20 L40 10 L30 0 Z\' fill=\'%238b5cf6\' fill-rule=\'evenodd\'/%3E%3Cpath d=\'M10 0 L20 10 L10 20 L20 20 L30 10 L20 0 Z\' fill=\'%23FFFFFF\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            backgroundSize: '40px 100%',
            animation: 'slide-pattern 2s linear infinite'
          }}
        />
      </div>
    </footer>
  );
}
