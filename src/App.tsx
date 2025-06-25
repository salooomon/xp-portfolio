import './styles/globals.css'
import './styles/ad.css'
import 'xp.css'
import {useEffect, useState} from "react";
import { Taskbar } from "./components/Taskbar.tsx";
import { Marquee } from './components/Marquee';
import { AdWindow } from './components/AdWindow.tsx';
import { CRTEffect } from "./components/CRTEffect.tsx";
import { LoveEasterEgg } from "./components/LoveEasterEgg.tsx";
import { Desktop } from "./desctop/Desktop.tsx";
import { LoadingScreen } from "./windows/LoadingScreen.tsx";
import { MyComputer } from "./windows/MyComputerWindow.tsx";
import { MyDocuments } from "./windows/MyDocumentsWindow.tsx";
import { RecycleBin } from "./windows/RecycleBinWindow.tsx";
import { useAdBlaster } from './hooks/useAdBlaster.tsx';
import { windowsStore } from './store/windowsStore';

export default function App() {
    const { adWindows } = windowsStore();
    const [virusActive, setVirusActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // Интервал появления рекламы (45000 мс = 0.75 м)
    useAdBlaster(virusActive, 45000);

    const phrases = [
        "🔥 СРОЧНО! НЕ УПУСТИ СУПЕР-РАЗРАБОТЧИКА! ПИШИ ПРЯМО СЕЙЧАС! 🔥",
        "💻 ТОПОВЫЙ РАЗРАБОТЧИК В ДОСТУПНОСТИ! ХВАТАЙ ПРЕЖДЕ ЧЕМ УСПЕЕТ УБЕЖАТЬ! 💻",
        "⚠️ ВНИМАНИЕ! РАЗРАБОТЧИК ЭКСТРА-КЛАССА ИЩЕТ РАБОТУ! НЕ СПИ - ПИШИ! ⚠️",
        "🎯 ПОПАЛ В ЯБЛОЧКО? ЭТО Я! ТВОЙ ИДЕАЛЬНЫЙ РАЗРАБОТЧИК! ОТПИШИСЬ СРОЧНО! 🎯",
        "!!! ТОЛЬКО СЕГОДНЯ !!! РАЗРАБОТЧИК 80 lvl ЗА ПОЛЦЕНЫ! ЗВОНИТЕ: TG @kirillpopoooov",
        "⚡ ЭКСКЛЮЗИВ! УНИКАЛЬНЫЙ РАЗРАБОТЧИК! НЕ ДОРОГО! ТОРОПИТЕСЬ - ПРЕДЛОЖЕНИЕ ОГРАНИЧЕНО!"
    ];

    useEffect(() => {
        setVirusActive(true);
    }, []);


    return (
        <>
            <CRTEffect/>
            {isLoading ? (
                <LoadingScreen onComplete={() => setIsLoading(false)} />
            ) : (
                <>
                    <Marquee
                        phrases={phrases}
                        backgroundColor="#00a000"
                        textColor="black"
                        speed={100}
                        height={15}
                        fontSize={15}
                    />

                    <Desktop/>
                    <Taskbar/>

                    <MyComputer />
                    <MyDocuments />
                    <RecycleBin />
                    <LoveEasterEgg/>

                    {adWindows.map(ad => (
                        <AdWindow key={ad.id} id={ad.id} />
                    ))}

                    {/*<button*/}
                    {/*    style={{*/}
                    {/*        position: 'fixed',*/}
                    {/*        bottom: '60px',*/}
                    {/*        right: '10px',*/}
                    {/*        zIndex: 2000,*/}
                    {/*        padding: '5px 10px'*/}
                    {/*    }}*/}
                    {/*    onClick={() => setVirusActive(!virusActive)}*/}
                    {/*>*/}
                    {/*    {virusActive ? 'Остановить вирус' : 'Запустить вирус'}*/}
                    {/*</button>*/}
                </>
            )}
        </>
    );
}
