import { windowsStore } from '../store/windowsStore';
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

export const AdWindow = ({ id }: { id: string }) => {
    const {
        adWindows,
        closeAdWindow,
        activeWindow,
        setActiveWindow
    } = windowsStore();

    const ad = adWindows.find(a => a.id === id);
    const windowRef = useRef<HTMLDivElement>(null!);
    const [position, setPosition] = useState(ad?.position ?? { x: 0, y: 0 });

    if (!ad) return null;

    useEffect(() => {
        if (!windowRef.current) return;

        const width = windowRef.current.offsetWidth;
        const height = windowRef.current.offsetHeight;
        const minOffset = 20;
        const minBottomOffset = 100;
        const maxX = Math.max(0, window.innerWidth - width - minOffset);
        const maxY = Math.max(0, window.innerHeight - height - minBottomOffset);

        const clampedX = Math.min(Math.max(ad.position.x, minOffset), minOffset + maxX);
        const clampedY = Math.min(Math.max(ad.position.y, minOffset), minOffset + maxY);

        if (clampedX !== position.x || clampedY !== position.y) {
            setPosition({ x: clampedX, y: clampedY });
        }
    }, [ad.position.x, ad.position.y, position.x, position.y]);

    return (
        <Draggable
            nodeRef={windowRef}
            handle=".title-bar"
            cancel=".title-bar-controls"
            bounds="parent"
            position={position}
            onStart={() => setActiveWindow(id)}
            onDrag={(_, data) => setPosition({ x: data.x, y: data.y })}
        >
            <div
                ref={windowRef}
                className={`window ${activeWindow === id ? 'active' : ''}`}
                style={{
                    zIndex: activeWindow === id ? 1000 : 999,
                }}
                onClick={() => setActiveWindow(id)}
            >
                <div className="title-bar">
                    <div className="title-bar-text">
                        <img
                            src={ad.icon}
                            alt=""
                            style={{ width: 16, height: 16, marginRight: 5 }}
                        />
                        {ad.title}
                    </div>
                    <div className="title-bar-controls">
                        <button
                            aria-label="Close"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeAdWindow(id);
                            }}
                        />
                    </div>
                </div>
                <div className="window-body">
                    {ad.content}
                </div>
            </div>
        </Draggable>
    );
};
