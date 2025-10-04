import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { gsap, ScrollTrigger } from '../hooks/useGSAP';

export default function HelpSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const contactsRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation with split reveal
            const titleLines = titleRef.current?.children;
            if (titleLines) {
                gsap.fromTo(titleLines,
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 80%",
                            end: "bottom 20%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

            // Contact info animation
            const contactItems = contactsRef.current?.children;
            if (contactItems) {
                gsap.fromTo(contactItems,
                    { x: -50, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: contactsRef.current,
                            start: "top 85%",
                            end: "bottom 15%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

            // Buttons animation
            const buttons = buttonsRef.current?.children;
            if (buttons) {
                gsap.fromTo(buttons,
                    { scale: 0.8, opacity: 0, y: 20 },
                    {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.15,
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

            // Image animation with 3D effect
            gsap.fromTo(imageRef.current,
                {
                    x: 100,
                    opacity: 0,
                    rotateY: -15,
                    scale: 0.9
                },
                {
                    x: 0,
                    opacity: 1,
                    rotateY: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Floating animation for image
            gsap.to(imageRef.current, {
                y: "+=10",
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1
            });

            // Background gradient animation
            gsap.to(sectionRef.current, {
                backgroundPosition: "200% 200%",
                duration: 20,
                repeat: -1,
                ease: "none"
            });

            // Animate corner glows with subtle pulsing effect
            const cornerGlows = sectionRef.current?.querySelectorAll('.absolute.bg-green-500\\/15, .absolute.bg-green-400\\/12, .absolute.bg-emerald-500\\/18, .absolute.bg-green-600\\/10');
            if (cornerGlows) {
                cornerGlows.forEach((glow, index) => {
                    gsap.to(glow, {
                        opacity: 0.8 + (Math.sin(index) * 0.2),
                        scale: 1.05 + (index * 0.05),
                        duration: 3 + (index * 0.3),
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: index * 0.6
                    });
                });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 px-6 relative bg-gradient-to-br from-green-900/20 to-black" style={{ backgroundSize: "200% 200%" }}>
            {/* Additional Corner Green Glows */}
            <div className="absolute top-4 left-4 w-24 h-24 bg-green-500/15 rounded-full blur-2xl"></div>
            <div className="absolute top-8 right-8 w-32 h-32 bg-green-400/12 rounded-full blur-3xl"></div>
            <div className="absolute bottom-4 left-8 w-28 h-28 bg-emerald-500/18 rounded-full blur-2xl"></div>
            <div className="absolute bottom-8 right-4 w-36 h-36 bg-green-600/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Help content */}
                    <div className="text-white">
                        <h2 ref={titleRef} className="text-4xl md:text-5xl mb-8">
                            <div>HELP</div>
                            <div>US</div>
                            <div><span className="text-green-400">IMPROVE SR</span></div>
                        </h2>

                        <div ref={contactsRef} className="space-y-6 mb-8">
                            <div>
                                <h3 className="text-green-400 mb-2">GITHUB</h3>
                                <a
                                    href="https://github.com/Airstriker123"
                                    className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                                >
                                    https://github.com/Airstriker123
                                </a>
                            </div>

                            <div>
                                <h3 className="text-green-400 mb-2">EMAIL</h3>
                                <a
                                    href="https://mail.google.com/mail/u/1/#inbox?compose=CllgCJfscjvXqShNgJlTZthqPqLvBmbJBPFSxjrSxhLflQkfQHzfqPFMBKJSHhFBGXBbfwNmDpL"
                                    className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                                >
                                    amit.singh12@education.nsw.gov.au
                                </a>
                            </div>
                        </div>

                        <div ref={buttonsRef} className="flex flex-wrap gap-4">
                            <Button
                                className="bg-green-500 hover:bg-green-600 text-black px-6 py-2 rounded-full transition-all duration-300"
                            >
                                Contribute to this pwa!
                            </Button>

                            <Button
                                variant="outline"
                                className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-6 py-2 rounded-full transition-all duration-300"
                            >
                                give feedback
                            </Button>
                        </div>
                    </div>

                    {/* Right side - Illustration */}
                    <div ref={imageRef} className="relative perspective-1000">
                        <div className="bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-2xl p-8 backdrop-blur-sm transform-gpu">
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1637073849667-91120a924221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbSUyMGNvbGxhYm9yYXRpb24lMjBjb2Rpbmd8ZW58MXx8fHwxNzU5NDA5MDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="Software development team collaboration"
                                className="w-full rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}