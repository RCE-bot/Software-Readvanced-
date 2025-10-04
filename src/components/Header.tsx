import { useEffect, useRef } from 'react';
import { gsap } from '../hooks/useGSAP';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(navRef.current, { y: -50, opacity: 0 });

      // Entrance animation
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 1.2
      });

      // Individual nav items animation
      const navItems = navRef.current?.querySelectorAll('button');
      if (navItems) {
        gsap.fromTo(navItems,
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            delay: 1.5
          }
        );
      }

      // Hover animations for nav items
      navItems?.forEach(item => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={headerRef} className="absolute top-0 left-0 right-0 z-50 pt-8">
      <div className="container mx-auto px-6">
        <nav ref={navRef} className="flex items-center justify-center">
          <div className="flex items-center space-x-8">
            <button className="text-white hover:text-green-400 transition-colors">
              About SR
            </button>
            <button className="text-white hover:text-green-400 transition-colors">
              Resources
            </button>
            <button className="text-white hover:text-green-400 transition-colors">
              Settings
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}