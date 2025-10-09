/*
app.tsx:
- main app component
- assembles (imports) different react components.
- contains global variables and code which applies for all the app

more information about react default structure:
https://medium.com/@mazeenacader/demystifying-the-file-structure-of-a-react-app-a-beginners-guide-to-what-goes-where-523d67518a3d
*/
import { useState } from 'react';
import Hero from './components/routes/Homepage/Hero';
import AboutSection from './components/routes/Homepage/AboutSection';
import HelpSection from './components/routes/Homepage/HelpSection';
import Footer from './components/routes/Homepage/Footer';
import PWAInstaller from './components/PWAInstaller';
import ScrollProgress from './components/style/ScrollProgress';
import MatrixEffect from './components/style/MatrixEffect';
import CursorEffect from './components/style/CursorEffect';
import ResourcesSection from './components/routes/Resources/ResourcesSection';
import {SettingsSection} from './components/routes/Settings/SettingsSection';
import Navigation from './components/style/Navigation';
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