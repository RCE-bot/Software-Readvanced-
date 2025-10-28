import { useEffect, useRef } from 'react';
import { Button } from '../../ui/button';
import GitHubLink from './GitHubLink';
import { gsap } from 'gsap';


interface HeroProps
{
  onNavigateToResources?: () => void;
}

export default function Hero({ onNavigateToResources }: HeroProps)
{
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const glowRef1 = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);
  const glowRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - hide elements
      gsap.set([titleRef.current, buttonRef.current], { opacity: 0, y: 50 });
      gsap.set([glowRef1.current, glowRef2.current, glowRef3.current], { scale: 0.8, opacity: 0 });

      // Create timeline for hero entrance
      const tl = gsap.timeline({ delay: 0.5 });
      
      // Animate glow effects first
      tl.to([glowRef1.current, glowRef2.current, glowRef3.current], {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out"
      })
      // Then animate title
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.8")
      // Finally animate button
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.4");

      // Floating animation for glow effects
      gsap.to(glowRef1.current, {
        y: "+=20",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(glowRef2.current, {
        y: "-=15",
        x: "+=10",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(glowRef3.current, {
        scale: 1.1,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Complex Gradient Background matching your webapp */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-emerald-950/40 to-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent"></div>
      </div>
      
      {/* Green Glow Effects */}
      <div ref={glowRef1} className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500/25 rounded-full blur-3xl"></div>
      <div ref={glowRef2} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl"></div>
      <div ref={glowRef3} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-3xl"></div>

      
      {/* GitHub Link - Only visible in Hero section */}
      <GitHubLink />
      
      <div className="relative z-10 text-center px-6">
        <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold text-white mb-8">
          Software
          <br />
          <span className="text-green-400">Readvanced</span>
        </h1>
        
        <div ref={buttonRef}>
          <Button 
            className="bg-green-500 hover:bg-green-600 text-black px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            onClick={onNavigateToResources}
          >
            Search resource
          </Button>
        </div>
      </div>
    </section>
  );
}