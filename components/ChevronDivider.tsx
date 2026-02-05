'use client';

import React from 'react';

export default function ChevronDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-32 overflow-hidden z-20 -mt-16 -mb-16 pointer-events-none ${className}`}>
      <style jsx>{`
        @keyframes slide-pattern {
          0% { background-position: 0 0; }
          100% { background-position: 40px 0; }
        }
        .chevron-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='20' viewBox='0 0 40 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L10 10 L0 20 L10 20 L20 10 L10 0 Z M20 0 L30 10 L20 20 L30 20 L40 10 L30 0 Z' fill='%238b5cf6' fill-rule='evenodd'/%3E%3Cpath d='M10 0 L20 10 L10 20 L20 20 L30 10 L20 0 Z' fill='%23FFFFFF' fill-rule='evenodd'/%3E%3C/svg%3E");
          background-size: 40px 100%;
          animation: slide-pattern 3s linear infinite;
        }
      `}</style>
      
      {/* Tilted Container */}
      <div className="absolute inset-0 flex items-center justify-center transform skew-y-[-2deg] origin-center scale-[1.15]">
        <div className="w-full h-10 bg-black border-y border-white/20 flex items-center overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <div className="w-[120%] h-full opacity-60 chevron-pattern shrink-0" />
        </div>
      </div>
    </div>
  );
}
