import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Configure ScrollTrigger for smoother performance on devices
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

export { gsap, ScrollTrigger };
