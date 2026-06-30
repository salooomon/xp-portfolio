import { useState, useEffect, useRef } from 'react';
import React from 'react';
import 'xp.css/dist/XP.css';
import '../styles/taskbar.css';
import { windowsStore, TASKBAR_WINDOW_LIMIT } from '../store/windowsStore';

interface TaskbarProps {
    onShutdown: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({ onShutdown }) => {
    const {
        windows,
        adWindows,
        restoreWindow,
        setActiveWindow,
        activeWindow,
        openWindow,
        focusOrCenterWindow,
        centerWindow
    } = windowsStore();
    const [time, setTime] = useState(new Date());
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    const startMenuRef = useRef<HTMLDivElement | null>(null);

    const startMenuItems = [
        { id: 'my-computer', title: 'Мой компьютер', icon: '/assets/icons-mini/my-computer-mini.ico' },
        { id: 'my-documents', title: 'Мои документы', icon: '/assets/icons-mini/my-documents-mini.ico' },
        { id: 'telegram', title: 'Телеграм', icon: '/assets/icons/telegram-48.png' }
    ] as const;

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (!startMenuRef.current) {
                return;
            }

            if (!startMenuRef.current.contains(event.target as Node)) {
                setIsStartMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsStartMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const openDesktopWindow = (id: string, title: string, icon: string) => {
        const windowState = windows.find(w => w.id === id);

        if (windowState) {
            if (windowState.minimized) {
                focusOrCenterWindow(id);
            } else {
                centerWindow(id);
            }
            return;
        }

        openWindow(id, title, icon);
    };

    const handleStartMenuItemClick = (id: (typeof startMenuItems)[number]['id']) => {
        if (id === 'telegram') {
            window.open('https://t.me/kpovv', '_blank');
            setIsStartMenuOpen(false);
            return;
        }

        const item = startMenuItems.find(menuItem => menuItem.id === id);
        if (item) {
            openDesktopWindow(item.id, item.title, item.icon);
        }

        setIsStartMenuOpen(false);
    };

    const handleShutdownClick = () => {
        setIsStartMenuOpen(false);
        onShutdown();
    };

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
    const visibleWindows = allWindows.slice(0, TASKBAR_WINDOW_LIMIT);

    return (
        <div className="taskbar">
            <div className="start-menu-wrapper" ref={startMenuRef}>
                <button
                    className={`start-button ${isStartMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsStartMenuOpen((prev) => !prev)}
                    aria-expanded={isStartMenuOpen}
                    aria-haspopup="menu"
                    aria-label="Открыть меню Пуск"
                >
                    <img
                        src="/assets/icons/windows-logo-small.png"
                        alt="Windows Logo"
                        className="logo"
                    />
                    <span style={{ marginRight: '5px' }}>ПУСК</span>
                </button>

                {isStartMenuOpen && (
                    <div className="start-menu" role="menu" aria-label="Меню Пуск">
                        {startMenuItems.map((item) => (
                            <button
                                key={item.id}
                                className="start-menu-item"
                                role="menuitem"
                                onClick={() => handleStartMenuItemClick(item.id)}
                            >
                                <img
                                    src={item.icon}
                                    alt=""
                                    className="start-menu-item-icon"
                                    width={20}
                                    height={20}
                                />
                                <span>{item.title}</span>
                            </button>
                        ))}

                        <div className="start-menu-separator" aria-hidden="true" />

                        <button
                            className="start-menu-item start-menu-shutdown"
                            role="menuitem"
                            onClick={handleShutdownClick}
                            aria-label="Выключить компьютер"
                        >
                            <img
                                src="/assets/icons-mini/error.ico"
                                alt=""
                                className="start-menu-item-icon"
                                width={20}
                                height={20}
                            />
                            <span>Выключить компьютер</span>
                        </button>
                    </div>
                )}
            </div>

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
