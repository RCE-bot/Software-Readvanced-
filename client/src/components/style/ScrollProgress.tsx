import { useEffect, useRef } from 'react';
import { gsap} from '../../hooks/useGSAP';

export default function ScrollProgress()
{
    // scroll progress bar component
    // uses gsap for animations
    // uses tailwind for styling
    // uses useRef for reference to elements
    // uses useEffect for animations
    // handles look of the scroll progress bar
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() =>
  {
      //animation for the scroll progress bar
      // as user scrolls down, the progress bar scales up
    const ctx = gsap.context(() =>
    {
      gsap.to(progressRef.current,
      {
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

    return ():void => ctx.revert();
  }, []);

  // return scroll component for render
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
      <div 
        ref={progressRef}
        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 origin-left scale-x-0"
      />
    </div>
  );
}