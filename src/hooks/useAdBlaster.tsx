import { useEffect } from 'react';
import { windowsStore } from '../store/windowsStore';
import {DefaultAdContent} from "../components/ads/DefaultAdContent";
import {FakeAntivirus} from "../components/ads/FakeAntivirus.tsx";
import {SaulGoodmanAd} from "../components/ads/SaulGoodmanAd.tsx";
import {SatrialeAd} from "../components/ads/SatrialeAd.tsx";
const browserIcon = 'src/assets/icons-mini/browser-mini.ico'
const AD_TEMPLATES = [
    {
        content: <DefaultAdContent />,
        title: 'Срочное сообщение!',
        icon: browserIcon,
    },
    {
        content: <FakeAntivirus />,
        title: 'Срочное сообщение ВИРУС!',
        icon: browserIcon,
    },
    {
        content: <SaulGoodmanAd />,
        title: 'У вас проблемы с законом?',
        icon: browserIcon,
    },
    {
        content: <SatrialeAd />,
        title: 'Мясная продукция только у нас!',
        icon: browserIcon,
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