import  { useState, useEffect } from 'react';
import '../styles/loading-screen.css'

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const minDuration = 1500;
        const maxDuration = 3000;
        const duration = Math.random() * (maxDuration - minDuration) + minDuration;

        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500);
        }, duration);

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div className="windows-xp-loading-screen">
            <div className="loading-container">

                <div className="loading-text">
                    <div className="windows-title">KP® Portfolio™ <span>XP</span> Professional</div>
                </div>

                <div className="container">
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                </div>
            </div>
        </div>
    );
};