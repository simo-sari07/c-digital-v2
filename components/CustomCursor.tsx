'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const cursor = cursorRef.current;
        if (!cursor) return;

        const onMouseMove = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: 'power3.out',
            });
        };

        window.addEventListener('mousemove', onMouseMove);

        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"]');

        const onMouseEnter = () => {
            gsap.to(cursor, {
                scale: 2,
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                borderColor: 'rgba(167, 139, 250, 1)',
                duration: 0.3,
            });
        };

        const onMouseLeave = () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: 'rgba(167, 139, 250, 0.5)',
                duration: 0.3,
            });
        };

        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', onMouseEnter);
            el.addEventListener('mouseleave', onMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
        };
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-5 h-5 rounded-full border border-violet-400/50 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
