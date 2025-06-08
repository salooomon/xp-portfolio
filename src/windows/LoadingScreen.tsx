import  { useState, useEffect } from 'react';
import '../styles/loading-screen.css'

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsVisible(false);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + (Math.random() * 5 + 1);
            });
        }, 100);

        return () => clearInterval(interval);
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