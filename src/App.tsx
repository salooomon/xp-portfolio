import './styles/globals.css'
import './styles/ad.css'
import 'xp.css'
import {useEffect, useState} from "react";

import { Taskbar } from "./components/Taskbar.tsx";
import {Desktop} from "./desctop/Desktop.tsx";
import {MyComputer} from "./windows/MyComputerWindow.tsx";
import {MyDocuments} from "./windows/MyDocumentsWindow.tsx";
import {RecycleBin} from "./windows/RecycleBinWindow.tsx";
import { windowsStore } from './store/windowsStore';
import { AdWindow } from './components/AdWindow.tsx';
import { useAdBlaster } from './hooks/useAdBlaster.tsx';
import { LoadingScreen } from "./windows/LoadingScreen.tsx";
import {CRTEffect} from "./components/CRTEffect.tsx";
import {LoveEasterEgg} from "./components/LoveEasterEgg.tsx";

export default function App() {
    const { adWindows } = windowsStore();
    const [virusActive, setVirusActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // Интервал появления рекламы (25000 мс = 25 секунд)
    useAdBlaster(virusActive, 250000);

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
                    <Desktop/>
                    <Taskbar/>

                    <MyComputer />
                    <MyDocuments />
                    <RecycleBin />
                    <LoveEasterEgg/>
                    {adWindows.map(ad => (
                        <AdWindow key={ad.id} id={ad.id} />
                    ))}

                    <button
                        style={{
                            position: 'fixed',
                            bottom: '60px',
                            right: '10px',
                            zIndex: 2000,
                            padding: '5px 10px'
                        }}
                        onClick={() => setVirusActive(!virusActive)}
                    >
                        {virusActive ? 'Остановить вирус' : 'Запустить вирус'}
                    </button>
                </>
            )}
        </>
    );
}
