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
import ResourcesSection from './components/routes/Resources/ResourcesSection';
import { SettingsSection } from './components/routes/Settings/SettingsSection';
import Navigation from './components/Navigation';
import { Toaster } from '@ui/sonner';
import {toast} from "sonner";
import LoginForm from './components/routes/Login/LoginForm';
import Test from './api/test';
import SignUpForm from './components/routes/Login/SignUpForm';

export function App() {
    useEffect(() => {
        new Test();
    }, []);
    // State to manage which section is currently active
    const [currentSection, setCurrentSection] = useState<'signup' | 'login' | 'home' | 'resources' | 'settings'>('login');
    const [shouldFocusSearch, setShouldFocusSearch] = useState(false);
    // Scroll to top when switching main sections
    useEffect(() => {
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
    // Logout function
    const handleLogout = () => {
        const logout = window.confirm(
            "Are you sure you want to logout? (type yes to confirm)"
        );
        if (logout) {
            // notify user of logout
            toast.success('logout success!')
            // (backend logic) remvoe oauth token, etc
            console.log('User logged out');
            setShouldFocusSearch(true);
            setCurrentSection('login')
        }
    };

    // Delete account function
    const handleDeleteAccount = () => {
        // In a real app, this would show a confirmation dialog
        const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.');
        if (confirmed) {
            const finalConfirm = window.prompt('enter "delete" to delete account.');
            //@ts-ignore ignore error from if statement
            if ("delete" == finalConfirm.toLowerCase()) {
                toast.success('delete success!');
                // logic to delete account (backend bs)
                setShouldFocusSearch(true);
                setCurrentSection('login')
            }
        }
    };

    const handleNavigateToSignUp = () => {
        setCurrentSection('signup');
        console.log("swapped to signup")
    }

    // Render different sections based on current selection
    const renderCurrentSection = () => {
        switch (currentSection) {
            case 'signup':
                return <SignUpForm/>
            case 'login':
                return <LoginForm handleAccountSignUp={handleNavigateToSignUp}/>
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
    }
    /*
    IF user auth = true display home section
    ELSE display login section
    return TYPESCRIPT XML based on currentSection value (login,signup, home)
     */
    if (currentSection == 'login') {
        return (
            <div>
                <LoginForm handleAccountSignUp={handleNavigateToSignUp}/>
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
        )
    }
    else if (currentSection == 'signup') {
        return (
            <div>
                <SignUpForm/>
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
        )
    }
    else {
        return (
            <div
                className="min-h-screen  text-white overflow-x-hidden relative smooth-scroll
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
