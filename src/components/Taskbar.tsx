import { useState, useEffect } from 'react';
import 'xp.css/dist/XP.css';
import '../styles/taskbar.css';

export const Taskbar = () => {
    const [time, setTime] = useState(new Date());
    const [startMenuOpen, setStartMenuOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="taskbar">
            <button
                className="start-button"
                onClick={() => setStartMenuOpen(!startMenuOpen)}
            >
                <img
                    src="public/windows-logo-small.png"
                    alt="Windows Logo"
                    className="logo"
                />
                <span style={{marginRight: '5px'}}>ПУСК</span>
            </button>

            {/* Область открытых окон */}
            <div className="taskbar-windows">
                {/* Здесь будут отображаться открытые окна */}
            </div>

            <div className="system-tray">
                <div className="tray-icons">
                    <img
                        src="https://win98icons.alexmeub.com/icons/png/volume-3.png"
                        alt="Volume"
                        style={{ width: '16px', height: '16px' }}
                    />
                    <img
                        src="https://win98icons.alexmeub.com/icons/png/network_normal_two-0.png"
                        alt="Network"
                        style={{ width: '16px', height: '16px' }}
                    />
                </div>

                <div className="clock">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>

        </div>
    );
};