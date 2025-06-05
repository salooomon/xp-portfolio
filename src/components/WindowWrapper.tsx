import { useState, useRef, useCallback } from "react";
import Draggable from "react-draggable";
import "xp.css/dist/XP.css";

type WindowWrapperProps = {
    title: string;
    children: React.ReactNode;
    defaultPosition?: { x: number; y: number };
    defaultSize?: { width: number; height: number };
    onClose?: () => void;
    className?: string;
};

export const WindowWrapper = ({
  title,
  children,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 400, height: 300 },
  onClose,
  className = "",
}: WindowWrapperProps) => {
    const windowRef = useRef<HTMLDivElement>(null);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [position, setPosition] = useState(defaultPosition);
    const [size, setSize] = useState(defaultSize);
    const [originalSize, setOriginalSize] = useState(defaultSize);
    const [originalPosition, setOriginalPosition] = useState(defaultPosition);

    const handleMaximize = useCallback(() => {
        if (!isMaximized) {
            // Сохраняем оригинальные размеры перед максимизацией
            setOriginalSize(size);
            setOriginalPosition(position);

            // Устанавливаем размеры на весь экран
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });

            // Позиционируем в верхний левый угол
            setPosition({ x: 0, y: 0 });
        } else {
            // Восстанавливаем оригинальные размеры
            setSize(originalSize);
            setPosition(originalPosition);
        }

        setIsMaximized(!isMaximized);
    }, [isMaximized, size, position, originalSize, originalPosition]);

    const handleDrag = useCallback((e: any, data: { x: number; y: number }) => {
        if (!isMaximized) {
            setPosition({ x: data.x, y: data.y });
        }
    }, [isMaximized]);

    const handleClose = useCallback(() => {
        onClose?.();
    }, [onClose]);

    if (isMinimized) {
        return (
            <div className="taskbar-window" onClick={() => setIsMinimized(false)}>
                {title}
            </div>
        );
    }

    return (
        <Draggable
            nodeRef={windowRef}
            handle=".title-bar"
            position={position}
            onDrag={handleDrag}
            bounds={isMaximized ? { top: 0, left: 0 } : "parent"}
            cancel=".title-bar-controls"
        >
            <div
                ref={windowRef}
                className={`window ${isMaximized ? "maximized" : ""} ${className}`}
                style={{
                    width: `${size.width}px`,
                    height: `${size.height}px`,
                    position: "absolute",
                    zIndex: 1000,
                    maxWidth: isMaximized ? "100vw" : undefined,
                    maxHeight: isMaximized ? "100vh" : undefined,
                }}
            >
                <div className="title-bar">
                    <div className="title-bar-text">{title}</div>
                    <div className="title-bar-controls">
                        <button
                            aria-label="Minimize"
                            onClick={() => setIsMinimized(true)}
                        />
                        <button
                            aria-label="Maximize"
                            onClick={handleMaximize}
                        />
                        <button aria-label="Close" onClick={handleClose} />
                    </div>
                </div>
                <div className="window-body">
                    {children}
                </div>
            </div>
        </Draggable>
    );
};