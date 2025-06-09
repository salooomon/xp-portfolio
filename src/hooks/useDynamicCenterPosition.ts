import React, { useState, useEffect } from 'react';

export const useDynamicCenterPosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const updatePosition = (width: number, height: number) => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const x = (screenWidth - width) / 2;
        const y = (screenHeight - height) / 2;
        setPosition({ x, y });
        setDimensions({ width, height });
    };

    const handleDrag = (
        _: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
        data: { x: number; y: number }
    ) => {
        setPosition({ x: data.x, y: data.y });
    };
    useEffect(() => {
        const handleResize = () => {
            if (dimensions.width > 0 && dimensions.height > 0) {
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;
                const x = (screenWidth - dimensions.width) / 2;
                const y = (screenHeight - dimensions.height) / 2;
                setPosition({ x, y });
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [dimensions]);

    return { position, updatePosition, handleDrag };
};