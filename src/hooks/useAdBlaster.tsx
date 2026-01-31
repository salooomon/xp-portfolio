import { useEffect } from 'react';
import { windowsStore } from '../store/windowsStore';
import {DefaultAdContent} from "../components/ads/DefaultAdContent";
import {SaulGoodmanAd} from "../components/ads/SaulGoodmanAd.tsx";
import {SatrialeAd} from "../components/ads/SatrialeAd.tsx";
import {GarageAd} from "../components/ads/GarageAd.tsx";
const browserIcon = '/assets/icons-mini/browser-mini.ico'
const AD_TEMPLATES = [
    {
        content: <DefaultAdContent />,
        title: 'Срочное сообщение!',
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
    {
        content: <GarageAd />,
        title: 'Продам гараж...',
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

            const windowWidth = 400; // ожидаемая ширина окна
            const windowHeight = 300; // ожидаемая высота окна

            const minOffset = 20;          // отступ сверху, слева, справа
            const minBottomOffset = 100;   // отступ снизу

            const maxX = Math.max(0, window.innerWidth - windowWidth - minOffset);
            const maxY = Math.max(0, window.innerHeight - windowHeight - minBottomOffset);

            const position = {
                x: minOffset + Math.random() * maxX,
                y: minOffset + Math.random() * maxY
            };

            openAdWindow({
                ...adTemplate,
                position
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
