import React, { useRef, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { windowsStore } from '../store/windowsStore';
import { useDynamicCenterPosition } from '../hooks/useDynamicCenterPosition';

interface WindowWrapperProps {
    id: string;
    title: string;
    icon: string;
    children: React.ReactNode;
}

export const WindowWrapper: React.FC<WindowWrapperProps> = ({
    id,
    title,
    children,
    icon,
}) => {
    const windowRef = useRef<HTMLDivElement>(null!);
    const { position, updatePosition, handleDrag} = useDynamicCenterPosition();
    const [isPositionCalculated, setIsPositionCalculated] = useState(false);

    const {
        windows,
        activeWindow,
        minimizeWindow,
        closeWindow,
        setActiveWindow
    } = windowsStore();

    const windowState = windows.find(w => w.id === id);

    useEffect(() => {
        if (windowRef.current && !isPositionCalculated) {
            const width = windowRef.current.offsetWidth;
            const height = windowRef.current.offsetHeight;
            updatePosition(width, height);
            setIsPositionCalculated(true);
        }
    }, [windowState?.minimized]);

    if (!windowState || windowState.minimized) return null;

    return (
        <Draggable
            nodeRef={windowRef}
            handle=".title-bar"
            cancel=".title-bar-controls"
            position={position}
            bounds="parent"
            onStart={() => setActiveWindow(id)}
            onDrag={handleDrag}
        >
            <div
                ref={windowRef}
                className={`window ${activeWindow === id ? 'active' : ''}`}
                style={{
                    zIndex: activeWindow === id ? 1000 : 999,
                    visibility: isPositionCalculated ? 'visible' : 'hidden'
                }}
                onClick={() => setActiveWindow(id)}
            >
                <div className="title-bar">
                    <div className="title-bar-text">
                        <div className="title-bar-content">
                            <img
                                className="title-bar-icon"
                                src={icon}
                                alt=""
                                style={{width: 16, height: 16, marginRight: 5}}
                            />
                            <span>{title}</span>
                        </div>
                    </div>
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