import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGSAP';

// Matrix Effect Component - Creates falling green code lines that follow scroll
export default function MatrixEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create matrix lines
      const numberOfLines = 15; // Spread out lines across the screen
      const lines: HTMLDivElement[] = [];

      // Generate matrix lines
      for (let i = 0; i < numberOfLines; i++) {
        const line = document.createElement('div');
        line.className = 'matrix-line fixed pointer-events-none z-10';
        line.style.left = `${(i * 100) / numberOfLines + Math.random() * 10}%`;
        line.style.top = '-100px';
        line.style.width = '2px';
        line.style.height = '100px';
        line.style.background = 'linear-gradient(180deg, transparent, #22c55e, transparent)';
        line.style.opacity = '0.6';
        line.style.filter = 'blur(0.5px)';
        
        // Add some matrix-style characters
        const chars = '01';
        let content = '';
        for (let j = 0; j < 8; j++) {
          content += chars[Math.floor(Math.random() * chars.length)] + '<br>';
        }
        line.innerHTML = `<div style="font-family: monospace; font-size: 12px; color: #22c55e; text-align: center; line-height: 1.2;">${content}</div>`;
        
        containerRef.current?.appendChild(line);
        lines.push(line);
      }

      linesRef.current = lines;

      // Animate lines based on scroll
      lines.forEach((line, index) => {
        // Initial animation - lines falling down
        gsap.set(line, { y: -200, opacity: 0 });
        
        // Scroll-triggered animation with optimized performance
        gsap.to(line, {
          y: window.innerHeight + 200,
          opacity: 0.8,
          duration: 3 + Math.random() * 2, // Randomize speed
          repeat: -1,
          delay: index * 0.3, // Stagger the start
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1, // Smoother scrub value
            refreshPriority: -1, // Lower priority for performance
            onUpdate: (self) => {
              // Throttled opacity updates for smoother performance
              if (Math.random() > 0.7) { // Only update 30% of the time
                gsap.to(line, {
                  opacity: 0.3 + (self.progress * 0.5),
                  duration: 0.2,
                  ease: "power1.out"
                });
              }
            }
          }
        });

        // Floating animation
        gsap.to(line, {
          x: "+=20",
          duration: 4 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

    }, containerRef);

    return () => {
      ctx.revert();
      // Clean up created elements
      linesRef.current.forEach(line => {
        line.remove();
      });
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10" />;
}