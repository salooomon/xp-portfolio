import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { windowsStore } from '../store/windowsStore.ts';

import { useCenterPosition } from '../hooks/useCenterPosition';

interface WindowWrapperProps {
    id: string;
    title: string;
    children: React.ReactNode;
    width?: number;
    height?: number;
}

export const WindowWrapper: React.FC<WindowWrapperProps> = ({
    id,
    title,
    children,
    width = 400,
    height = 300
}) => {
    const windowRef = useRef<HTMLDivElement>(null);
    const defaultPosition = useCenterPosition(width, height);
    const {
        windows,
        activeWindow,
        minimizeWindow,
        closeWindow,
        setActiveWindow
    } = windowsStore();

    const windowState = windows.find(w => w.id === id);

    if (!windowState || windowState.minimized) return null;

    return (
        <Draggable
            nodeRef={windowRef}
            handle=".title-bar"
            defaultPosition={defaultPosition}
            bounds="parent"
            onStart={() => setActiveWindow(id)}
        >
            <div
                ref={windowRef}
                className={`window ${activeWindow === id ? 'active' : ''}`}
                style={{
                    zIndex: activeWindow === id ? 1000 : 999,
                    position: 'absolute',
                    width: '200px',
                    height: '150px'
                }}
                onClick={() => setActiveWindow(id)}
            >
                <div className="title-bar">
                    <div className="title-bar-text">{title}</div>
                    <div className="title-bar-controls">
                        <button
                            aria-label="Minimize"
                            onClick={(e) => {
                                e.stopPropagation();
                                minimizeWindow(id);
                            }}
                        />
                        <button
                            aria-label="Close"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeWindow(id);
                            }}
                        />
                    </div>
                </div>
                <div className="window-body">
                    {children}
                </div>
            </div>
        </Draggable>
    );
};