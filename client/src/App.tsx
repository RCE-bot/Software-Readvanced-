/*
app.tsx:
- main app component
- assembles (imports) different react components.
- contains global variables and code which applies for all the app
*/
// ui components
import { useState, useEffect } from 'react';
// landing components
import Hero from './components/routes/Homepage/Hero';
import AboutSection from './components/routes/Homepage/AboutSection';
import HelpSection from './components/routes/Homepage/HelpSection';
import PWAInstaller from './components/PWAInstaller';
import ScrollProgress from './components/style/ScrollProgress';
import ResourcesSection from './components/routes/Resources/ResourcesSection';
import { SettingsSection } from './components/routes/Settings/SettingsSection';
import Navigation from './components/Navigation';
import { Toaster } from '@ui/sonner';
// login components
import Test from "@/api/test"
import SignUpForm from "@/components/routes/Auth/SignUpForm";
import LoginForm from "@/components/routes/Auth/LoginForm";
import { logoutUser } from "@/api/auth";
import {toast} from "sonner";

export function App() {
    // State to manage which section is currently active
    let [currentSection, setCurrentSection] = useState<'login' | 'signup' | 'home' | 'resources' | 'settings'>('login');
    const [shouldFocusSearch, setShouldFocusSearch] = useState(false);

    useEffect(() => {
        // check if server is connected to client
        new Test();
    }, []);
    // Scroll to top when switching main sections
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentSection]);

    //  Check session on mount
    useEffect(() => {
        const auth = localStorage.getItem('auth');
        if (auth) {
            setCurrentSection('home');
        } else {
            setCurrentSection('login');
        }
    }, []);

    // Called when login succeeds
    const handleLoginSuccess = (userData: any) => {
        localStorage.setItem('auth', JSON.stringify(userData));
        setCurrentSection('home');
    };

    const handleRegisterSuccess = () => {
        toast.success("Account created successfully! Please log in.");
        setCurrentSection("login");
    };

    //  Logout (calls backend + clears localStorage)
    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (err) {
            console.warn("Logout request failed (maybe user not logged in).");
        }
        localStorage.removeItem('auth'); // remove token from storage
        setCurrentSection('login');
    };

    const handleNavigateToSignUp = () => {
        setCurrentSection('signup');
    };

    const handleNavigateToLogin = () => {
        setCurrentSection('login');
    };

    // Navigation handlers
    const handleNavigateToResources = () => {
        setShouldFocusSearch(true);
        setCurrentSection('resources');
    };

    const handleNavigateToSettings = () => {
        setShouldFocusSearch(true);
        setCurrentSection('settings');
    };

    const handleDeleteAccount = () => {
        setCurrentSection('login');
        // TODO: complete backend logic for this function
    };

    // ✅ (optional) redirect unauthenticated users trying to access other pages
    useEffect(() => {
        const auth = localStorage.getItem('auth');
        if (!auth && currentSection !== 'login' && currentSection !== 'signup') {
            setCurrentSection('login');
        }
    }, [currentSection]);

    const renderCurrentSection = () => {
        switch (currentSection) {
            case 'login':
                return (
                    <div>
                        <LoginForm
                            setUser={handleLoginSuccess}
                            onNavigateToSignUp={handleNavigateToSignUp}
                        />
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
            case 'signup':
                return (
                    <SignUpForm
                        onRegister={handleRegisterSuccess}
                        onNavigateToLogin={handleNavigateToLogin}
                    />
                );
            case 'home':
                return (
                    <>
                        <Hero onNavigateToResources={handleNavigateToResources}/>
                        <AboutSection onNavigateToResources={handleNavigateToResources}/>
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
                return <SettingsSection
                        handleLogout={handleLogout}
                        handleDeleteAccount={handleDeleteAccount}
                />;
            default:
                return null;
        }
    };
    // if not logged in render login/signup
    if (currentSection === 'login' || currentSection === 'signup') {
        return renderCurrentSection();
    } else {
        return (
            <div
                className="min-h-screen text-white overflow-x-hidden relative smooth-scroll
             bg-cover bg-center bg-no-repeat">
                {/* Background Effects - Applied to all sections */}
                <ScrollProgress/>

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
                <PWAInstaller/>

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
}
