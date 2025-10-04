import { useState } from 'react';
import { Button } from './ui/button';
import { Home, BookOpen, Settings as SettingsIcon } from 'lucide-react';

// Navigation Component - Handles switching between different sections
interface NavigationProps {
  currentSection: 'home' | 'resources' | 'settings';
  onSectionChange: (section: 'home' | 'resources' | 'settings') => void;
}

export default function Navigation({ currentSection, onSectionChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ] as const;

  return (
    <>
      {/* Desktop Navigation - Fixed sidebar */}
      <nav className="hidden md:block fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-2">
          <div className="flex flex-col space-y-2">
            {navigationItems.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={currentSection === id ? "default" : "ghost"}
                size="icon"
                onClick={() => onSectionChange(id)}
                className={`w-12 h-12 relative group ${
                  currentSection === id 
                    ? 'bg-green-500 text-black hover:bg-green-600' 
                    : 'text-white hover:text-green-400 hover:bg-green-400/20'
                }`}
                title={label}
              >
                <Icon className="w-5 h-5" />
                
                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {label}
                </div>
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom bar */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-40">
        <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-2">
          <div className="flex justify-around">
            {navigationItems.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={currentSection === id ? "default" : "ghost"}
                onClick={() => onSectionChange(id)}
                className={`flex-1 flex flex-col items-center py-2 px-3 ${
                  currentSection === id 
                    ? 'bg-green-500 text-black hover:bg-green-600' 
                    : 'text-white hover:text-green-400 hover:bg-green-400/20'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{label}</span>
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Navigation Indicator Dots */}
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
              }`}
              title={navigationItems.find(item => item.id === id)?.label}
            />
          ))}
        </div>
      </div>
    </>
  );
}