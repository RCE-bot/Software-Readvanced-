import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Configure ScrollTrigger for smoother performance
ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  ignoreMobileResize: true
});

// Set default scroll trigger settings for smoother animations
ScrollTrigger.defaults({
  toggleActions: "play pause resume reverse",
  scroller: window,
  refreshPriority: 0
});

export function useGSAP() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Context for scoped animations
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}

export { gsap, ScrollTrigger };
