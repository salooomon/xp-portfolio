import {useEffect, useRef, useState} from 'react';
import { PixelDeathEffect } from './PixelDeathEffect';
import '../styles/blue-screen.css';

const blueScreenText = `A problem has been detected and Windows has been shut down to prevent damage
to your computer.

The problem seems to be caused by the following file: SPCMDCON.SYS

PAGE_FAULT_IN_NONPAGED_AREA

If this is the first time you've seen this stop error screen,
restart your computer. If this screen appears again, follow
these steps:

Check to make sure any new hardware or software is properly installed.
If this is a new installation, ask your hardware or software manufacturer
for any Windows updates you might need.

If problems continue, disable or remove any newly installed hardware
or software. Disable BIOS memory options such as caching or shadowing.
If you need to use Safe Mode to remove or disable components, restart
your computer, press F8 to select Advanced Startup Options, and then
select Safe Mode.

Technical information:

*** STOP: 0x00000050 (0xFD3094C2,0x00000001,0xFBFE7617,0x00000000)


*** SPCMDCON.SYS - Address FBFE7617 base at FBFE5000, Datestamp 3d6dd67c`;

export const BlueScreen = () => {
    const screenRef = useRef<HTMLDivElement>(null);
    const [onViewPixelDeathEffect, setViewPixelDeathEffect] = useState(false)
    const [shouldReload, setShouldReload] = useState(false)

    useEffect(() => {
        const timerOnReload = setInterval(() => {
            window.location.reload();
        }, 3000)
        return () => clearInterval(timerOnReload)

    }, [shouldReload]);

    useEffect(() => {
        const timer = setInterval(() => {
            setViewPixelDeathEffect(true);
            setShouldReload(true)
        }, 2000)
        return () => clearInterval(timer)
    },[])

    return (
        <div
            ref={screenRef}
            className="blue-screen"
            role="alert"
            aria-label="Windows stop error screen"
            tabIndex={-1}
        >
            <pre className="blue-screen__text">{blueScreenText}</pre>
            {onViewPixelDeathEffect && <PixelDeathEffect/>}
        </div>
    );
};
