import { useEffect, useRef } from 'react';
import { Github } from 'lucide-react';
import { gsap } from '../../../hooks/useGSAP';

// GitHub Link Component - Fixed position link in top right corner
export default function GitHubLink() {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation - slide in from top right
      gsap.fromTo(linkRef.current,
        { 
          x: 50, 
          y: -50, 
          opacity: 0, 
          scale: 0.8 
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "back.out(1.7)"
        }
      );

      // Hover animation
      const link = linkRef.current;
      if (link) {
        link.addEventListener('mouseenter', () => {
          gsap.to(link, {
            scale: 1.1,
            rotation: 5,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        link.addEventListener('mouseleave', () => {
          gsap.to(link, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    }, linkRef);

    return () => ctx.revert();
  }, []);

  return (
    <a
      ref={linkRef}
      href="https://github.com/Airstriker123/Software-Readvanced" // Replace with your actual GitHub repo
      target="_blank"
      rel="noopener noreferrer"
      className="absolute top-6 right-6 z-50 group"
      aria-label="View on GitHub"
    >
      <div className="relative">
        {/* Glow effect background */}
        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Main button */}
        <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:border-green-500/50 rounded-full p-3 transition-all duration-300 hover:bg-gray-700/80">
          <Github className="w-6 h-6 text-white group-hover:text-green-400 transition-colors duration-300" />
        </div>
        
        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full border-2 border-green-400/30 scale-100 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300" />
      </div>
      
      {/* Tooltip */}
      <div className="absolute top-full right-0 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        View on GitHub
        <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-800 transform rotate-45" />
      </div>
    </a>
  );
}