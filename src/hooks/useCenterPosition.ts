import { useMemo } from 'react';

export const useCenterPosition = (windowWidth: number, windowHeight: number) => {
    return useMemo(() => {
        if (typeof window === 'undefined') {
            return { x: 100, y: 100 };
        }

        const x = (window.innerWidth - windowWidth) / 2;
        const y = (window.innerHeight - windowHeight) / 2;

        return {
            x: Math.max(0, x),
            y: Math.max(0, y)
        };
    }, [windowWidth, windowHeight]);
};