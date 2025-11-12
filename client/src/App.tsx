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
import {toast} from "sonner";

export default function App()
{
    /*
    app components combines all child components into one parent component
    - which handles the logic of this single page pwa
    - handles what component to render under condition
    - if user is logged in
    - if user installed the app on device
    */
    // State to manage which section is currently active
    let [currentSection, setCurrentSection] = useState<'login' | 'signup' | 'home' | 'resources' | 'settings'>('login');
    const [shouldFocusSearch, setShouldFocusSearch] = useState(false);

    useEffect(() =>
    {
        // check if server is connected to client
        new Test();
    }, []);

    // Scroll to top when switching main sections
    useEffect(() =>
    {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentSection]);

    //  Check session on mount (check if client is logged in)
    useEffect(() =>
    {
        const auth:string|null = localStorage.getItem('auth');
        if (auth) //token exists in storage
        {
            setCurrentSection('home');
        }
        else //token not found in localstorage
        {
            setCurrentSection('login');
        }
    }, []);

    // Called when login succeeds
    const handleLoginSuccess = (userData: any):void =>
    {
        localStorage.setItem('auth', JSON.stringify(userData)); // store data in localStorage
        setCurrentSection('home');
        toast.success('Logged in!')
    };
    // called when register succeeds
    const handleRegisterSuccess = ():void =>
    {
        // redirect to home
        setCurrentSection("home");
        toast.success('Logged in!')
    };

    //  Logout (calls backend + clears localStorage)
    const handleLogout = async ():Promise<void> =>
    {
        // confirm to log out
        let prompt = window.confirm("are you sure you want to logout?")
        if (!prompt) return; //don't log-out if bool = false
        localStorage.removeItem('auth'); // remove token from storage
        setCurrentSection('login');
    };

    // swap current section to signup
    const handleNavigateToSignUp = ():void =>
    {
        setCurrentSection('signup');
    };
    // swap current section to login
    const handleNavigateToLogin = ():void =>
    {
        setCurrentSection('login');
    };

    // swap current section to resources
    const handleNavigateToResources = ():void =>
    {
        setShouldFocusSearch(true);
        setCurrentSection('resources');
    };

    // swap current section to settings
    const handleNavigateToSettings = ():void =>
    {
        setShouldFocusSearch(true);
        setCurrentSection('settings');
    };


    // redirect unauthenticated users trying to access other pages
    useEffect(():void =>
    {
        const auth = localStorage.getItem('auth');
        if (!auth && currentSection !== 'login' && currentSection !== 'signup')
        {
            setCurrentSection('login');
        }
    }, [currentSection]);

    // render current section based on functions above
    const renderCurrentSection = () =>
    {
        switch (currentSection) //switch render content based on current section
        {
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
                        <PWAInstaller/>
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
                return <>
                    <PWAInstaller/>
                    <SettingsSection
                        handleLogout={handleLogout}
                /></>;
            default:
                return null;
        }
    };
    // if not logged in render login/signup
    if (currentSection === 'login' || currentSection === 'signup')
    {
        return renderCurrentSection();
    }
    else if (currentSection === 'home')
    {
        // if logged in render home
       return (
           <div
               className="min-h-screen text-white overflow-x-hidden relative smooth-scroll
             bg-cover bg-center bg-no-repeat">
               {/* Background Effects - Applied to all sections */}
               <ScrollProgress/>
               <PWAInstaller/>

               {/* Navigation */}
               <Navigation
                   currentSection={currentSection}
                   onSectionChange={setCurrentSection}
               />

               {/* Main Content */}
               <main className="relative z-20 transform-gpu">
                   {renderCurrentSection()}
               </main>
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
    else
    {
        // if section is not home or login/sign render this to client
        return (
            <div
                className="min-h-screen text-white overflow-x-hidden relative smooth-scroll
             bg-cover bg-center bg-no-repeat">
                {/* Background Effects - scroll progress */}
                <ScrollProgress/>

                {/* Navigation component */}
                <Navigation
                    currentSection={currentSection}
                    onSectionChange={setCurrentSection}
                />

                {/* render Main Content */}
                <main className="relative z-20 transform-gpu">
                    {renderCurrentSection()}
                </main>
            </div>
        );
    }
}