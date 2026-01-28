'use client';

import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  bgColor?: string;
  className?: string;
  id?: string;
}

export default function SectionWrapper({ 
  children, 
  bgColor = '#000000', 
  className = '',
  id 
}: SectionWrapperProps) {
  return (
    <section 
      id={id}
      data-bgcolor={bgColor} 
      className={`relative min-h-screen py-20 px-6 md:px-12 ${className}`}
    >
      <div className="max-w-[1400px] mx-auto">
        {children}
      </div>
    </section>
  );
}
