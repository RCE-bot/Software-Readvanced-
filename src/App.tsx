import { useState } from 'react';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import HelpSection from './components/HelpSection';
import Footer from './components/Footer';
import PWAInstaller from './components/PWAInstaller';
import ScrollProgress from './components/ScrollProgress';
import MatrixEffect from './components/MatrixEffect';
import CursorEffect from './components/CursorEffect';
import ResourcesSection from './components/ResourcesSection';
import {SettingsSection} from './components/SettingsSection';
import Navigation from './components/Navigation';

import { Toaster } from './components/ui/sonner';

export default function App() {
  // State to manage which section is currently active
  const [currentSection, setCurrentSection] = useState<'home' | 'resources' | 'settings'>('home');
  // State to track if user navigated to resources via search button
  const [shouldFocusSearch, setShouldFocusSearch] = useState(false);

  // Handle navigation to resources from search button
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
            <HelpSection />
            <Footer
              onNavigateToResources={handleNavigateToResources}
              onNavigateToSettings={handleNavigateToSettings}/>
          </>
        );
      case 'resources':
        return <ResourcesSection shouldFocusSearch={shouldFocusSearch} onSearchFocused={() => setShouldFocusSearch(false)} />;
      case 'settings':
        return <SettingsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative smooth-scroll">
      {/* Background Effects - Applied to all sections */}
      <CursorEffect />
      <MatrixEffect />
      <ScrollProgress />
      
      {/* Navigation */}
      <Navigation 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection}
      />
      
      {/* Main Content with optimized scrolling */}
      <main className="relative z-20 transform-gpu">
        {renderCurrentSection()}
      </main>
      
      {/* Global Components */}
      <PWAInstaller />
      
      {/* Toast Notifications when clicking on buttons push to browser
       - defines style through attributes theme, position, css
       */}
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