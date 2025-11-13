import { useEffect, useRef } from 'react';
import { Button } from '@ui/button';
import
{
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@ui/card';
import
{
    Settings as SettingsIcon,
    LogOut,
    Shield,
} from 'lucide-react';
import { gsap } from '../../../hooks/useGSAP';

interface AccountSettingsProps
{
    handleLogout: () => void;
}
// Settings Section Component - Allows users to manage account (delete, logout)
export function SettingsSection({handleLogout,}: AccountSettingsProps)
{
    /*
    component for the settings section
    - uses tailwind for styling
    - uses useState for state management
    - uses useEffect for side effects
    - handles look of the settings section
    - stores the settings section component
    */
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    // GSAP Animations
    useEffect(() =>
    {
        const ctx = gsap.context(() =>
        {
            // Header animation
            gsap.fromTo(headerRef.current,
                {y: -50, opacity: 0},
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Cards animation with stagger
            const cards = cardsRef.current?.children;
            if (cards)
            {
                gsap.fromTo(cards,
                    {y: 40, opacity: 0, scale: 0.95},
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out",
                        delay: 0.3,
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 85%",
                            end: "bottom 15%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        }, sectionRef);

        return ():void => ctx.revert();
    }, []);

    // component typescript XML - stores markup for structure , style and text
    return (
        // render the settings seciton
        <section ref={sectionRef} className="py-20 px-6 bg-gradient-to-b from-gray-900/30 via-black to-gray-900/30">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <SettingsIcon className="w-8 h-8 text-green-400"/>
                        <h2 className="text-4xl md:text-6xl">
                            <span className="text-green-400">SETTINGS</span>
                        </h2>
                    </div>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Various Settings related to your account
                    </p>
                </div>
                {/* Settings Cards */}
                <div ref={cardsRef} className="grid lg:grid-cols-2 gap-6 mb-8">

                    {/*
                        Account Settings
                       - manage logout
                    */}
                    <Card className="bg-gray-800/50 border-gray-700">
                        {/* card header */}
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-green-400"/>
                                <CardTitle className="text-white">Account Settings</CardTitle>
                            </div>
                            <CardDescription>Manage your SR account</CardDescription>
                        </CardHeader>

                        {/* logout button */}
                        <CardContent className="space-y-4">
                            <div className="pt-2 space-y-2">
                                <Button
                                    variant="outline"
                                    className="w-full border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                                    onClick={handleLogout}>
                                    <LogOut className="w-4 h-4 mr-2"/>
                                    Logout
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </section>
    );
}
