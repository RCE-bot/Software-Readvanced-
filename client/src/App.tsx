/*
app.tsx:
- main app component
- assembles (imports) different react components.
- contains global variables and code which applies for all the app
*/

import { useState, useEffect} from 'react';
import Hero from './components/routes/Homepage/Hero';
import AboutSection from './components/routes/Homepage/AboutSection';
import HelpSection from './components/routes/Homepage/HelpSection';
import PWAInstaller from './components/PWAInstaller';
import ScrollProgress from './components/style/ScrollProgress';
import CursorEffect from './components/style/CursorEffect';
import ResourcesSection from './components/routes/Resources/ResourcesSection';
import { SettingsSection } from './components/routes/Settings/SettingsSection';
import Navigation from './components/Navigation';
import { Toaster } from '@ui/sonner';
import {toast} from "sonner";


export default function App()
{
      useEffect(() =>
      {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ React frontend connected to Flask backend!");
        console.log("Backend message:", data.message);
        toast.success("Server connected to client!");
      })
      .catch((err) => {
        console.error("❌ Could not connect to backend", err);
        toast.error("Failed to connected server to client -_-");
      });
  });

    // State to manage which section is currently active
    const [currentSection, setCurrentSection] = useState<'home' | 'resources' | 'settings'>('home');
    const [shouldFocusSearch, setShouldFocusSearch] = useState(false);
    // Scroll to top when switching main sections
    useEffect(() =>
    {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentSection]);

    // Navigation handlers
    const handleNavigateToResources = () => {
        setShouldFocusSearch(true);
        setCurrentSection('resources');
    };

    const handleNavigateToSettings = () => {
        setShouldFocusSearch(true);
        setCurrentSection('settings');
    };

    // Render different sections based on current selection
    const renderCurrentSection = () => {
        switch (currentSection) {
            case 'home':
                return (
                    <>
                        <Hero onNavigateToResources={handleNavigateToResources} />
                        <AboutSection onNavigateToResources={handleNavigateToResources} />
                       <HelpSection
                            onNavigateToResources={handleNavigateToResources}
                            onNavigateToSettings={handleNavigateToSettings}
                        />
                    </>
                );
            case 'resources':
                return (
                    <ResourcesSection
                        shouldFocusSearch={shouldFocusSearch}
                        onSearchFocused={() => setShouldFocusSearch(false)}
                    />
                );
            case 'settings':
                return <SettingsSection />;
            default:
                return null;
        }
    };

    return (
        <div
            className="min-h-screen bg-black text-white overflow-x-hidden relative smooth-scroll
             bg-cover bg-center bg-no-repeat">
            {/* Background Effects - Applied to all sections */}
            <CursorEffect />
            <ScrollProgress />

            {/* Navigation */}
            <Navigation
                currentSection={currentSection}
                onSectionChange={setCurrentSection}
            />

            {/* Main Content */}
            <main className="relative z-20 transform-gpu">
                {renderCurrentSection()}
            </main>

            {/* Global Components */}
            <PWAInstaller />

            {/* Toast Notifications */}
            <Toaster
                theme="dark"
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#1f2937',
                        border: '1px solid #374151',
                        color: '#f9fafb',
                    },
                }}
            />
        </div>
    );
}
