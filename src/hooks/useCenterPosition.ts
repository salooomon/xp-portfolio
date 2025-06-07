import { useEffect, useState } from 'react';

export const useCenterPosition = (widthPercent: number, heightPercent: number) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const updatePosition = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const width = (screenWidth * widthPercent) / 100;
        const height = (screenHeight * heightPercent) / 100;

        const x = (screenWidth - width) / 2;
        const y = (screenHeight - height) / 2;

        setPosition({ x, y });
    };

    useEffect(() => {
        updatePosition();
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('resize', updatePosition);
        };
    }, [widthPercent, heightPercent]);

    return position;
};
