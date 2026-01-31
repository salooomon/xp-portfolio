import { useState, useEffect } from 'react';
import React from 'react';
import 'xp.css/dist/XP.css';
import '../styles/taskbar.css';
import { windowsStore } from '../store/windowsStore';

export const Taskbar: React.FC = () => {
    const { windows, adWindows, restoreWindow, setActiveWindow, activeWindow } = windowsStore();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const allWindows = [
        ...windows,
        ...adWindows.map(ad => ({
            id: ad.id,
            title: ad.title,
            icon: ad.icon,
            minimized: false,
            active: false
        }))
    ];
    const visibleWindows = allWindows.slice(0, 5);
    return (
        <div className="taskbar">
            <button className="start-button">
                <img
                    src="/assets/icons/windows-logo-small.png"
                    alt="Windows Logo"
                    className="logo"
                />
                <span style={{ marginRight: '5px' }}>ПУСК</span>
            </button>

            <div className="taskbar-windows">
                {visibleWindows.map((window) => {
                    const isActive = activeWindow === window.id;
                    return (
                        <button
                            key={window.id}
                            className={`taskbar-button ${isActive ? 'active' : ''}`}
                            onClick={() => {
                                if ('minimized' in window && window.minimized) {
                                    restoreWindow(window.id);
                                } else {
                                    setActiveWindow(window.id);
                                }
                            }}
                            aria-label={`Окно ${window.title}`}
                        >
                            <div className="taskbar-button-content">
                                <img
                                    className="taskbar-button-icon"
                                    src={window.icon}
                                    alt=""
                                    width={16}
                                    height={16}
                                    loading="lazy"
                                />
                                <span className="taskbar-button-text">{window.title}</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="system-tray">
                <div className="tray-icons">
                    <img
                        src="/assets/icons-mini/ethernet-mini.ico"
                        alt="ethernet"
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
