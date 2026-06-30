import { useEffect, useRef } from 'react';

const EFFECT_DURATION_MS = 3000;
const FLICKER_DURATION_MS = 70;
const DENSITY_EXPONENT = 2.65;
const MIN_PIXEL_SIZE = 15;
const MAX_PIXEL_SIZE = 30;
const CLUSTER_CHANCE = 0.34;
const MAX_DEVICE_PIXEL_RATIO = 2;

interface ViewportSize {
    width: number;
    height: number;
    pixelRatio: number;
}

interface BrokenPixel {
    xRatio: number;
    yRatio: number;
    size: number;
}

interface PendingPixel {
    pixel: BrokenPixel;
    turnBlackAt: number;
    flickerColor: string;
}

const getRandomPixelSize = () => (
    MIN_PIXEL_SIZE + Math.random() * (MAX_PIXEL_SIZE - MIN_PIXEL_SIZE)
);

const getFlickerColor = () => {
    const colors = [
        'rgba(255, 255, 255, 0.34)',
        'rgba(155, 184, 255, 0.28)',
        'rgba(76, 112, 210, 0.32)',
        'rgba(12, 18, 42, 0.42)',
    ];

    return colors[Math.floor(Math.random() * colors.length)];
};

const clamp = (value: number, min: number, max: number) => (
    Math.min(Math.max(value, min), max)
);

const createBrokenPixel = (x: number, y: number, size: number, viewport: ViewportSize): BrokenPixel => ({
    xRatio: clamp(x, 0, viewport.width) / viewport.width,
    yRatio: clamp(y, 0, viewport.height) / viewport.height,
    size,
});

const createPixelBurst = (viewport: ViewportSize): BrokenPixel[] => {
    const baseX = Math.random() * viewport.width;
    const baseY = Math.random() * viewport.height;
    const pixels = [
        createBrokenPixel(baseX, baseY, getRandomPixelSize(), viewport),
    ];

    if (Math.random() > CLUSTER_CHANCE) {
        return pixels;
    }

    const clusterSize = 2 + Math.floor(Math.random() * 6);
    const clusterRadius = 5 + Math.random() * 18;

    for (let index = 0; index < clusterSize; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * clusterRadius;
        const x = baseX + Math.cos(angle) * distance;
        const y = baseY + Math.sin(angle) * distance;

        pixels.push(createBrokenPixel(x, y, getRandomPixelSize(), viewport));
    }

    return pixels;
};

const drawPixel = (
    context: CanvasRenderingContext2D,
    pixel: BrokenPixel,
    viewport: ViewportSize,
    color: string,
) => {
    const x = pixel.xRatio * viewport.width;
    const y = pixel.yRatio * viewport.height;

    context.fillStyle = color;
    context.fillRect(x, y, pixel.size, pixel.size);
};

interface PixelDeathEffectProps {
    className?: string;
}

export const PixelDeathEffect = ({ className = '' }: PixelDeathEffectProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const viewportRef = useRef<ViewportSize>({
        width: 1,
        height: 1,
        pixelRatio: 1,
    });
    const committedAreaRef = useRef(0);
    const deadPixelsRef = useRef<BrokenPixel[]>([]);
    const pendingPixelsRef = useRef<PendingPixel[]>([]);
    const completedRef = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return undefined;
        }

        const context = canvas.getContext('2d');
        if (!context) {
            return undefined;
        }

        const resizeCanvas = () => {
            const width = Math.max(window.innerWidth, 1);
            const height = Math.max(window.innerHeight, 1);
            const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);

            viewportRef.current = { width, height, pixelRatio };
            canvas.width = Math.round(width * pixelRatio);
            canvas.height = Math.round(height * pixelRatio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            context.clearRect(0, 0, width, height);

            if (completedRef.current) {
                context.fillStyle = '#000000';
                context.fillRect(0, 0, width, height);
                return;
            }

            deadPixelsRef.current.forEach((pixel) => drawPixel(context, pixel, viewportRef.current, '#000000'));
            pendingPixelsRef.current.forEach(({ pixel, flickerColor }) => {
                drawPixel(context, pixel, viewportRef.current, flickerColor);
            });
        };

        const blackenPendingPixels = (now: number) => {
            const remainingPixels: PendingPixel[] = [];

            pendingPixelsRef.current.forEach((pendingPixel) => {
                if (pendingPixel.turnBlackAt <= now) {
                    deadPixelsRef.current.push(pendingPixel.pixel);
                    drawPixel(context, pendingPixel.pixel, viewportRef.current, '#000000');
                    return;
                }

                remainingPixels.push(pendingPixel);
            });

            pendingPixelsRef.current = remainingPixels;
        };

        const scheduleNewPixels = (now: number, progress: number) => {
            const viewport = viewportRef.current;
            const targetArea = viewport.width * viewport.height * Math.pow(progress, DENSITY_EXPONENT);
            let guard = 0;

            while (committedAreaRef.current < targetArea && guard < 900) {
                const burst = createPixelBurst(viewport);

                burst.forEach((pixel) => {
                    const pendingPixel: PendingPixel = {
                        pixel,
                        turnBlackAt: now + FLICKER_DURATION_MS + Math.random() * 80,
                        flickerColor: getFlickerColor(),
                    };

                    committedAreaRef.current += pixel.size * pixel.size;
                    pendingPixelsRef.current.push(pendingPixel);
                    drawPixel(context, pixel, viewport, pendingPixel.flickerColor);
                });

                guard += 1;
            }
        };

        const renderFrame = (now: number) => {
            if (startTimeRef.current === null) {
                startTimeRef.current = now;
            }

            const elapsed = now - startTimeRef.current;
            const progress = clamp(elapsed / EFFECT_DURATION_MS, 0, 1);

            blackenPendingPixels(now);
            scheduleNewPixels(now, progress);

            if (progress >= 1) {
                const { width, height } = viewportRef.current;

                completedRef.current = true;
                context.fillStyle = '#000000';
                context.fillRect(0, 0, width, height);
                animationFrameRef.current = null;
                return;
            }

            animationFrameRef.current = window.requestAnimationFrame(renderFrame);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        animationFrameRef.current = window.requestAnimationFrame(renderFrame);

        return () => {
            window.removeEventListener('resize', resizeCanvas);

            if (animationFrameRef.current !== null) {
                window.cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`pixel-death-canvas ${className}`.trim()}
            aria-hidden="true"
        />
    );
};
