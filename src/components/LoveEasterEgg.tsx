import React, { useState, useEffect } from 'react';
import '../styles/easter-egg.css'
export const LoveEasterEgg = () => {
    const [showAd, setShowAd] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isCtrlAltL = e.ctrlKey && (e.altKey || e.metaKey) && e.key.toLowerCase() === 'l';
            if (isCtrlAltL) {
                e.preventDefault();
                setShowAd(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleClose = () => {
        setShowAd(false);
    };

    return (
        <>

            {showAd && (
                <div className="valentine-ad-overlay">
                    <div className="valentine-ad-window">
                        <h2 className="valentine-ad-title">Ты моё солнышко! ☀️</h2>
                        <p className="valentine-ad-message">
                            ❤️ Спасибо, что делаешь мою жизнь ярче! ❤️
                        </p>
                        <button className="valentine-ad-close" onClick={handleClose}>Чмок!</button>
                    </div>
                </div>
            )}
        </>
    );
};
