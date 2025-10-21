import { useEffect, useRef } from 'react';
import { gsap } from '../../hooks/useGSAP';

// Cursor Effect Component - Makes background reactive to mouse movement
export default function CursorEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    
    if (!container || !glow) return;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Update glow position smoothly
      gsap.to(glow, {
        x: clientX - 150, // Center the glow (300px width / 2)
        y: clientY - 150, // Center the glow (300px height / 2)
        duration: 0.3,
        ease: "power2.out"
      });

      // Create ripple effect on click
      if (e.type === 'click') {
        const ripple = document.createElement('div');
        ripple.className = 'absolute rounded-full border-2 border-green-400/30 pointer-events-none';
        ripple.style.left = clientX - 25 + 'px';
        ripple.style.top = clientY - 25 + 'px';
        ripple.style.width = '50px';
        ripple.style.height = '50px';
        
        container.appendChild(ripple);
        
        // Animate ripple
        gsap.fromTo(ripple, 
          { scale: 0, opacity: 1 },
          { 
            scale: 4, 
            opacity: 0, 
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => ripple.remove()
          }
        );
      }
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-5">
      {/* Main cursor glow effect */}
      <div
        ref={glowRef}
        className="absolute w-72 h-72 bg-green-400 rounded-full blur-3xl transition-opacity duration-300 hover:opacity-20"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Additional subtle background reactivity */}
      <div className="absolute inset-0 bg-gradient-radial from-green-500 via-transparent to-transparent opacity-25" />
    </div>
  );
}