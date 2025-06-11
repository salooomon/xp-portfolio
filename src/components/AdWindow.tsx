import { windowsStore } from '../store/windowsStore';
import { useRef } from "react";
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

    if (!ad) return null;

    return (
        <Draggable
            nodeRef={windowRef}
            handle=".title-bar"
            cancel=".title-bar-controls"
            bounds="parent"
            defaultPosition={ad.position}
            onStart={() => setActiveWindow(id)}
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