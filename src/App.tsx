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
import { BlueScreen } from "./windows/BlueScreen.tsx";
import { MyComputer } from "./windows/MyComputerWindow.tsx";
import { MyDocuments } from "./windows/MyDocumentsWindow.tsx";
import { RecycleBin } from "./windows/RecycleBinWindow.tsx";
import { useAdBlaster } from './hooks/useAdBlaster.tsx';
import { windowsStore } from './store/windowsStore';

export default function App() {
    const { adWindows, sessionId, crash, reboot, powerState } = windowsStore();

    const [virusActive, setVirusActive] = useState(false);
    // Интервал появления рекламы (45000 мс = 0.75 м)
    useAdBlaster(virusActive, 45000);

    const phrases = [
        "🔥 СРОЧНО! НЕ УПУСТИ СУПЕР РАЗРАБОТЧИКА! ПИШИ TG @kpovv ПРЯМО СЕЙЧАС! 🔥",
        "💻 ТОПОВЫЙ РАЗРАБОТЧИК! ХВАТАЙ ПРЕЖДЕ, ЧЕМ УСПЕЕТ УБЕЖАТЬ ! TG @kpovv 💻",
        "⚠️ ВНИМАНИЕ! РАЗРАБОТЧИК ЭКСТРА-КЛАССА ИЩЕТ РАБОТУ! НЕ СПИ - ПИШИ: TG @kpovv! ⚠️",
        "🎯 ПОПАЛ В ЯБЛОЧКО? ЭТО Я! ТВОЙ ИДЕАЛЬНЫЙ РАЗРАБОТЧИК! ОТПИШИСЬ: TG @kpovv СРОЧНО! 🎯",
        "!!! ТОЛЬКО СЕГОДНЯ !!! РАЗРАБОТЧИК 80 lvl ! ЗВОНИТЕ: TG @kpovv",
    ];

    useEffect(() => {
        reboot()
        setVirusActive(true);
    }, []);

    const handleShutdown = () => {
        crash()
    };
    
    function DesktopSession() {
        return (
            <>
                <CRTEffect/>
                    <>
                        <Marquee
                            phrases={phrases}
                            backgroundColor="#00a000"
                            textColor="black"
                            speed={100}
                            height={16}
                            fontSize={13}
                        />

                        <Desktop />
                        <Taskbar onShutdown={handleShutdown}/>

                        <MyComputer />
                        <MyDocuments />
                        <RecycleBin />
                        <LoveEasterEgg/>

                        {adWindows.map(ad => (
                            <AdWindow key={ad.id} id={ad.id} />
                        ))}
                    </>
            </>
        )
    }

    if (powerState === "bsod") {
        return <BlueScreen />;
    }

    if (powerState === "booting") {
        return <LoadingScreen />;
    }


    return <DesktopSession key={sessionId} />
}
