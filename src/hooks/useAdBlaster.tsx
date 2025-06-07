import { useEffect } from 'react';
import { windowsStore } from '../store/windowsStore';
import {DefaultAdContent} from "../components/ads/DefaultAdContent";
import {FakeAntivirus} from "../components/ads/FakeAntivirus.tsx";
const browserIcon = 'src/assets/icons-mini/browser-mini.ico'
const AD_TEMPLATES = [
    {
        content: <DefaultAdContent />,
        title: 'Срочное сообщение!',
        icon: browserIcon,
        size: {width: 30, height: 40}
    },
    {
        content: <FakeAntivirus />,
        title: 'Срочное сообщение ВИРУС!',
        icon: browserIcon,
        size: {width: 40, height: 30}
    },
];

export const useAdBlaster = (active: boolean, interval = 1500) => {
    const { openAdWindow, closeAllAds } = windowsStore();

    useEffect(() => {
        if (!active) return;

        const openRandomAd = () => {
            const adTemplate = AD_TEMPLATES[
                Math.floor(Math.random() * AD_TEMPLATES.length)
                ];

            openAdWindow({
                ...adTemplate,
                position: {
                    x: Math.random() * (window.innerWidth - 400),
                    y: Math.random() * (window.innerHeight - 300)
                }
            });
        };


        openRandomAd();

        const timer = setInterval(openRandomAd, interval);

        return () => {
            clearInterval(timer);
            closeAllAds();
        };
    }, [active, interval, openAdWindow, closeAllAds]);
};