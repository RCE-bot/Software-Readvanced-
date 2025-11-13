import { useState, useEffect } from 'react';
import { Button } from '@ui/button';
import { Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event
{
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstaller()
{
    /*
    component handles installing the application on device
    - renders button on screen for homepage
    - prompts user to install app
    - handles installation process
     */
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showInstall, setShowInstall] = useState(false);

    useEffect(() =>
    {
        // handle install prompt
        const handler: (e: Event) => void = (e: Event) =>
        {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setShowInstall(true);
        };
        // listen for client install prompt
        window.addEventListener('beforeinstallprompt', handler);

        return ():void =>
        {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick: () => Promise<void> = async ():Promise<void> =>
    {
        // handle client install click
        if (!deferredPrompt) return;
        deferredPrompt.prompt(); //prompt user to install
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted')
        {
            setDeferredPrompt(null);
            setShowInstall(false);
        }
    };
    // conditon to return null or XML
    if (!showInstall) return null;
    return (
        <>
        {/* button to install app */}
        <div className="fixed bottom-6 right-6 z-50">
            <Button
                onClick={handleInstallClick}
                className="bg-green-500 hover:bg-green-600 text-black shadow-lg px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300"
            >
                <Download className="h-4 w-4" />
                Install App
            </Button>
        </div>
        </>
    );
}