import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import HelpSection from './components/HelpSection';
import Footer from './components/Footer';
import PWAInstaller from './components/PWAInstaller';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ScrollProgress />
      <main>
        <Hero />
        <AboutSection />
        <HelpSection />
      </main>
      <Footer />
      <PWAInstaller />
    </div>
  );
}