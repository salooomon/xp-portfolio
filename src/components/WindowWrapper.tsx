import React, { useRef, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { windowsStore } from '../store/windowsStore';

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
    const [isPositionCalculated, setIsPositionCalculated] = useState(false);

    const {
        windows,
        activeWindow,
        minimizeWindow,
        closeWindow,
        setActiveWindow,
        setWindowPosition,
        setWindowSize,
        centerWindow
    } = windowsStore();

    const windowState = windows.find(w => w.id === id);

    useEffect(() => {
        if (windowRef.current && windowState) {
            const width = windowRef.current.offsetWidth;
            const height = windowRef.current.offsetHeight;
            const sizeChanged = !windowState.size
                || windowState.size.width !== width
                || windowState.size.height !== height;

            if (sizeChanged) {
                setWindowSize(id, { width, height });
                if (!windowState.hasBeenDragged) {
                    centerWindow(id);
                }
            }

            if (!isPositionCalculated) {
                setIsPositionCalculated(true);
            }
        }
    }, [id, windowState, isPositionCalculated, setWindowSize, centerWindow]);

    if (!windowState || windowState.minimized) return null;
    return (
        <Draggable
            nodeRef={windowRef}
            handle=".title-bar"
            cancel=".title-bar-controls"
            position={windowState.position}
            bounds="parent"
            onStart={() => setActiveWindow(id)}
            onDrag={(_, data) => setWindowPosition(id, { x: data.x, y: data.y })}
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
                <div className={`window-body ${id}`}>
                    {children}
                </div>
            </div>
        </Draggable>
    );
};
