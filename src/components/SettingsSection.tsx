import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Monitor, 
  LogOut, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Save,
  RotateCcw,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { gsap, ScrollTrigger } from '../hooks/useGSAP';
import { toast } from 'sonner@2.0.3';

// Settings Section Component - Allows users to customize their experience
export default function SettingsSection() {
  // Theme settings
  const [theme, setTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('green');
  const [fontSize, setFontSize] = useState('medium');
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  
  // Privacy settings
  const [dataCollection, setDataCollection] = useState(false);
  const [analyticsTracking, setAnalyticsTracking] = useState(true);
  
  // User preferences
  const [autoSave, setAutoSave] = useState(true);
  const [defaultView, setDefaultView] = useState('grid');
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: -50, opacity: 0 },
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
      if (cards) {
        gsap.fromTo(cards,
          { y: 40, opacity: 0, scale: 0.95 },
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

    return () => ctx.revert();
  }, []);

  // Save settings function
  const saveSettings = () => {
    // In a real app, this would save to backend/localStorage
    const settings = {
      theme,
      accentColor,
      fontSize,
      emailNotifications,
      pushNotifications,
      weeklyDigest,
      dataCollection,
      analyticsTracking,
      autoSave,
      defaultView
    };
    
    console.log('Saving settings:', settings);
    toast.success('Settings saved successfully!');
  };

  // Reset settings function
  const resetSettings = () => {
    setTheme('dark');
    setAccentColor('green');
    setFontSize('medium');
    setEmailNotifications(true);
    setPushNotifications(false);
    setWeeklyDigest(true);
    setDataCollection(false);
    setAnalyticsTracking(true);
    setAutoSave(true);
    setDefaultView('grid');
    
    toast.success('Settings reset to defaults!');
  };

  // Logout function
  const handleLogout = () => {
    // In a real app, this would clear auth tokens and redirect
    toast.success('Logged out successfully!');
    console.log('User logged out');
  };

  // Delete account function
  const handleDeleteAccount = () => {
    // In a real app, this would show a confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.'
    );
    
    if (confirmed) {
      toast.error('Account deletion initiated. Please check your email for confirmation.');
      console.log('Account deletion requested');
    }
  };

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-gradient-to-b from-gray-900/30 via-black to-gray-900/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <SettingsIcon className="w-8 h-8 text-green-400" />
            <h2 className="text-4xl md:text-6xl">
              <span className="text-green-400">SETTINGS</span>
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Customize your Software Readvanced experience. Personalize themes, notifications, 
            and privacy settings to match your preferences.
          </p>
        </div>

        {/* Settings Cards */}
        <div ref={cardsRef} className="grid lg:grid-cols-2 gap-6 mb-8">
          
          {/* Appearance Settings */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-green-400" />
                <CardTitle className="text-white">Appearance</CardTitle>
              </div>
              <CardDescription>Customize the look and feel of your interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Theme Selection */}
              <div className="space-y-2">
                <Label htmlFor="theme" className="text-white">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="light" className="flex items-center gap-2">
                      <Sun className="w-4 h-4" /> Light
                    </SelectItem>
                    <SelectItem value="dark" className="flex items-center gap-2">
                      <Moon className="w-4 h-4" /> Dark
                    </SelectItem>
                    <SelectItem value="system" className="flex items-center gap-2">
                      <Monitor className="w-4 h-4" /> System
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Accent Color */}
              <div className="space-y-2">
                <Label className="text-white">Accent Color</Label>
                <div className="flex gap-2">
                  {['green', 'blue', 'purple', 'orange'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setAccentColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        accentColor === color ? 'border-white scale-110' : 'border-gray-600'
                      }`}
                      style={{
                        backgroundColor: color === 'green' ? '#22c55e' : 
                                       color === 'blue' ? '#3b82f6' : 
                                       color === 'purple' ? '#a855f7' : '#f97316'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="space-y-2">
                <Label className="text-white">Font Size</Label>
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Settings */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-green-400" />
                <CardTitle className="text-white">Notifications</CardTitle>
              </div>
              <CardDescription>Manage how you receive updates and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Email Notifications</Label>
                  <p className="text-sm text-gray-400">Receive updates via email</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Push Notifications</Label>
                  <p className="text-sm text-gray-400">Browser push notifications</p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Weekly Digest</Label>
                  <p className="text-sm text-gray-400">Summary of new resources</p>
                </div>
                <Switch checked={weeklyDigest} onCheckedChange={setWeeklyDigest} />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <CardTitle className="text-white">Privacy & Security</CardTitle>
              </div>
              <CardDescription>Control your data and privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Data Collection</Label>
                  <p className="text-sm text-gray-400">Allow anonymous usage data</p>
                </div>
                <Switch checked={dataCollection} onCheckedChange={setDataCollection} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Analytics Tracking</Label>
                  <p className="text-sm text-gray-400">Help improve the app</p>
                </div>
                <Switch checked={analyticsTracking} onCheckedChange={setAnalyticsTracking} />
              </div>

              <Separator className="bg-gray-600" />
              
              <div className="pt-2 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-red-600 text-red-500 hover:bg-red-600 hover:text-white"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* User Preferences */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-green-400" />
                <CardTitle className="text-white">Preferences</CardTitle>
              </div>
              <CardDescription>Customize your learning experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Auto-save Progress</Label>
                  <p className="text-sm text-gray-400">Automatically save your progress</p>
                </div>
                <Switch checked={autoSave} onCheckedChange={setAutoSave} />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Default View</Label>
                <Select value={defaultView} onValueChange={setDefaultView}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="grid">Grid View</SelectItem>
                    <SelectItem value="list">List View</SelectItem>
                    <SelectItem value="card">Card View</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                  <User className="w-3 h-3 mr-1" />
                  Premium User
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={saveSettings}
            className="bg-green-500 hover:bg-green-600 text-black px-8"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
          
          <Button 
            variant="outline" 
            onClick={resetSettings}
            className="border-gray-600 text-gray-300 hover:bg-gray-700 px-8"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
        </div>
      </div>
    </section>
  );
}