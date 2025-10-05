import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { gsap, ScrollTrigger } from '../hooks/useGSAP';

interface AboutProps {
    onNavigateToResources?: () => void;
}

export default function AboutSection({ onNavigateToResources }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Code block animation
      gsap.fromTo(codeRef.current, 
        { x: -100, opacity: 0, rotateY: 15 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: codeRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate individual code lines with stagger
      const codeLines = codeRef.current?.querySelectorAll('div > div');
      if (codeLines) {
        gsap.fromTo(codeLines,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: codeRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Content section animations
      gsap.fromTo(titleRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(textRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(buttonRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: 0.4,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax effect for the entire section
      gsap.to(sectionRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Animate corner glows with subtle floating effect
      const cornerGlows = sectionRef.current?.querySelectorAll('.absolute.bg-green-500\\/10, .absolute.bg-green-400\\/8, .absolute.bg-emerald-500\\/12, .absolute.bg-green-600\\/15');
      if (cornerGlows) {
        cornerGlows.forEach((glow, index) => {
          gsap.to(glow, {
            scale: 1.1 + (index * 0.1),
            duration: 4 + (index * 0.5),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.8
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 relative bg-black">
      {/* Corner Green Glows */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-green-400/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-500/12 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-28 h-28 bg-green-600/15 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Code display */}
          <div ref={codeRef} className="relative">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 shadow-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              
              <div className="font-mono text-sm leading-relaxed">
                <div className="text-gray-400">01 | </div>
                <div className="text-blue-400">02 | def get_gpu(gpu):</div>
                <div className="text-yellow-400">03 |   gpuInfo.get_gpu(gpu)</div>
                <div className="text-orange-400">04 |   f.load = int(gpu.query_load() * 100)</div>
                <div className="text-green-400">05 |   f.gpu_clock = int(round(gpu.query_clock_memory()))</div>
                <div className="text-purple-400">06 |   f.gpu_memory_usage = round(gpu.query_memory_info())</div>
                <div className="text-blue-300">07 |   f.gpu_gtt_usage = round(gpu.query_gtt_usage())</div>
                <div className="text-pink-400">08 |   f.power = gpu.query_power()</div>
                <div className="text-cyan-400">09 |   f.voltage = round(gpu.query_voltage())</div>
                <div className="text-red-400">10 |   temp.value_in_fans_id(f)</div>
                <div className="text-gray-400">11 |   return self.fans()</div>
              </div>
            </div>
          </div>
          
          {/* Right side - About content */}
          <div ref={contentRef} className="text-white">
            <h2 ref={titleRef} className="text-4xl md:text-5xl mb-6">
              ABOUT
              <br />
              SOFTWARE
              <br />
              <span className="text-green-400">READVANCED</span>
            </h2>
            
            <p ref={textRef} className="text-gray-300 text-lg mb-8 leading-relaxed">
              A web application designed to help students learn the new nsc software engineering course, by providing useful learning resources to students for their studies.
            </p>
            
            <div ref={buttonRef}>
              <Button
                className="bg-green-500 hover:bg-green-600 text-black px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                onClick={onNavigateToResources}
              >
                Search resource
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}