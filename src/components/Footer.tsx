import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { gsap, ScrollTrigger } from '../hooks/useGSAP';

interface FooterProps
{
    onNavigateToResources?: () => void;
    OnNavigatetoSettings?: () => void;
}

export default function Footer({onNavigateToResources,
                                OnNavigatetoSettings}: FooterProps)
{
  const footerRef = useRef<HTMLElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Buttons animation
      const buttons = buttonsRef.current?.children;
      if (buttons) {
        gsap.fromTo(buttons,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: buttonsRef.current,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Copyright text animation
      gsap.fromTo(textRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 95%",
            end: "bottom 5%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Subtle border animation
      gsap.fromTo(footerRef.current,
        { borderTopColor: "rgba(255, 255, 255, 0)" },
        {
          borderTopColor: "rgba(255, 255, 255, 0.1)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            end: "bottom 5%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="py-12 px-6 bg-black/50 border-t border-transparent">
      <div className="container mx-auto max-w-4xl">
        <div ref={buttonsRef} className="flex flex-wrap gap-4 justify-center items-center">
          <Button
            onClick={onNavigateToResources}
            className="bg-green-500 hover:bg-green-600 text-black px-6 py-2 rounded-full transition-all duration-300"
          >
            search for resource
          </Button>
          
          <Button
            onClick={onNavigateToSettings}
            variant="outline" 
            className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-6 py-2 rounded-full transition-all duration-300"
          >
            settings
          </Button>
        </div>
        
        <div ref={textRef} className="text-center mt-8 text-gray-400 text-sm">
          <p>&copy; 2024 Software Readvanced. Empowering the next generation of software engineers.</p>
        </div>
      </div>
    </footer>
  );
}