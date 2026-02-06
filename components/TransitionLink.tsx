'use client';

import Link, { LinkProps } from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from '@/context/TransitionContext';

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function TransitionLink({
  children,
  href,
  className,
  onClick,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsTransitioning } = useTransition();

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (onClick) {
      onClick(e);
    }

    // Don't transition if clicking the same link
    if (pathname === href) return;

    // Start Transition
    setIsTransitioning(true);

    // Wait for animation (matched with PageTransition duration)
    // We'll effectively wait for the "Cover" animation to complete (approx 1s)
    // But exact timing depends on the GSAP animation in PageTransition.
    // For safety, we can wait a bit or let logic handle it.
    // Ideally, PageTransition watches `isTransitioning`.
    // We just need to wait long enough for the "Slide Down" to finish.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    router.push(href.toString());
    
    // Reset handled in PageTransition useEffect or layout
    // But ensuring we reset logic if needed, usually PageTransition resets it after "Enter"
  };

  return (
    <Link {...props} href={href} className={className} onClick={handleTransition}>
      {children}
    </Link>
  );
}
