import { useState, useEffect } from 'react';
import '../styles/CRT-effect.css';

export const CRTEffect = () => {
    const [enabled, setEnabled] = useState(true);

    useEffect(() => {
        if (enabled) {
            document.body.classList.add('crt-enabled');
        } else {
            document.body.classList.remove('crt-enabled');
        }
    }, [enabled]);

    return (
        <>
            {enabled && <div className="crt-effect" />}
            <button
                className="crt-switch"
                onClick={() => setEnabled(!enabled)}
            >
                CRT: {enabled ? 'ON' : 'OFF'}
            </button>
        </>
    );
};