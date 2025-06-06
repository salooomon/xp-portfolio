import { useState, useEffect } from 'react';
import  React  from 'react';
import 'xp.css/dist/XP.css';
import '../styles/taskbar.css';

import { windowsStore } from '../store/windowsStore.ts';

export const Taskbar: React.FC = () => {
    const {
        windows,
        restoreWindow,
        setActiveWindow
    } = windowsStore();
    console.log(windows)
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="taskbar">
            <button
                className="start-button"
            >
                <img
                    src="src/assets/icons/windows-logo-small.png"
                    alt="Windows Logo"
                    className="logo"
                />
                <span style={{marginRight: '5px'}}>ПУСК</span>
            </button>

            <div className="taskbar-windows">
                {windows.map((window) => (

                    <button
                        key={window.id}
                        className={`taskbar-button ${window.active ? 'active' : ''}`}
                        onClick={() => window.minimized ? restoreWindow(window.id) : setActiveWindow(window.id)}
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
                ))}
            </div>

            <div className="system-tray">
                <div className="tray-icons">
                    <img
                        src="src/assets/icons-mini/ethernet-mini.ico"
                        alt="ethernet"
                        style={{width: '16px', height: '16px'}}
                    />
                </div>

                <div className="clock">
                    {time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                </div>
            </div>

        </div>
    );
};