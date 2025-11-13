import { useState, useRef, useEffect } from 'react';
import { Button } from '@ui/button';
import { Home, BookOpen, Settings as SettingsIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';

export interface NavigationProps
{
    currentSection: 'home' | 'resources' | 'settings';
    onSectionChange: (section: 'home' | 'resources' | 'settings') => void;
}

export default function Navigation({ currentSection, onSectionChange }: NavigationProps)
{
    let [isMinimized, setIsMinimized] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    // check if device is mobile to hide side nav
    const isMobile:boolean = window.matchMedia("(max-width: 768px)").matches;
    const navigationItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'resources', label: 'Resources', icon: BookOpen },
        { id: 'settings', label: 'Settings', icon: SettingsIcon },
    ] as const;

    // side bar navigation animation for smooth transition
    useEffect(():void =>
    {
        if (!navRef.current) return;

        if (isMinimized)
        {
            gsap.to(navRef.current, {
                x: -150,
                opacity: 0,
                scale: 0.9,
                duration: 0.4,
                ease: 'power2.inOut',
                onComplete: () =>
                {
                    navRef.current!.style.display = 'none';
                },
            });
        }
        else
        {
            navRef.current.style.display = 'block';
            gsap.fromTo(
                navRef.current,
                { x: -150, opacity: 0, scale: 0.9 },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.45,
                    ease: 'power2.out',
                }
            );
        }
    }, [isMinimized]);
    if (isMobile)
    {
        // remove side bar from render if device is mobile
        isMinimized = true; // set to minimize bar to stop render of it in mobile screens
        console.log('mobile detected'); // for debugging
    }
    return (
        <>
            {/* Expand Button - Desktop only */}
            {isMinimized && (
                <div className="hidden md:block fixed top-4 left-4 z-50">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMinimized(false)}
                        className="w-10 h-10 text-gray-400 hover:text-green-400 hover:bg-green-400/20 transition-all duration-300 rounded-full shadow-md"
                        title="Expand Navigation"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>
            )}

            {/* Desktop Navigation - GSAP morph animation */}
            <nav
                ref={navRef}
                className="hidden md:block fixed left-4 top-1/2 transform -translate-y-1/2 z-40"
            >
                <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-2 transition-all duration-300">
                    {/* Minimize Button */}
                    <div className="flex justify-center mb-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMinimized(true)}
                            className="w-8 h-8 text-gray-400 hover:text-green-400 hover:bg-green-400/20 transition-all duration-300"
                            title="Minimize Navigation"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Navigation Items */}
                    <div className="flex flex-col space-y-2">
                        {navigationItems.map(({ id, label, icon: Icon }) => (
                            <Button
                                key={id}
                                variant={currentSection === id ? 'default' : 'ghost'}
                                size="icon"
                                onClick={() => onSectionChange(id)}
                                className={`w-12 h-12 relative group transition-all duration-300 ${
                                    currentSection === id
                                        ? 'bg-green-500 text-black hover:bg-green-600'
                                        : 'text-white hover:text-green-400 hover:bg-green-400/20'
                                }`}
                                title={label}
                            >
                                <Icon className="w-5 h-5" />
                            </Button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation - Bottom bar only */}
            <nav className="md:hidden fixed bottom-4 left-4 right-4 z-40">
                <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-2">
                    <div className="flex justify-around">
                        {navigationItems.map(({ id, label, icon: Icon }) => (
                            <Button
                                key={id}
                                variant={currentSection === id ? 'default' : 'ghost'}
                                onClick={() => onSectionChange(id)}
                                className={`flex-1 flex flex-col items-center py-2 px-3 ${
                                    currentSection === id
                                        ? 'bg-green-500 text-black hover:bg-green-600'
                                        : 'text-white hover:text-green-400 hover:bg-green-400/20'
                                }`
                            }
                            >
                                <Icon className="w-5 h-5 mb-1" />
                                <span className="text-xs">{label}</span>
                            </Button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Navigation Indicator Dots - Desktop only */}
            <div className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
                <div className="flex flex-col space-y-3">
                    {navigationItems.map(({ id }) => (
                        <button
                            key={id}
                            onClick={() => onSectionChange(id)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                currentSection === id
                                    ? 'bg-green-500 scale-125'
                                    : 'bg-gray-600 hover:bg-green-400/50'
                            }`
                        }
                            title={navigationItems.find(item => item.id === id)?.label}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
