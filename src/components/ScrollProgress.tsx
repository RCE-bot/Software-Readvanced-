import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGSAP';

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3
        }
      });
    }, progressRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
      <div 
        ref={progressRef}
        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 origin-left scale-x-0"
      />
    </div>
  );
}