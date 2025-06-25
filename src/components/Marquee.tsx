import React, {useEffect, useRef, useState} from 'react';

interface MarqueeProps {
    phrases: string[];
    backgroundColor?: string;
    textColor?: string;
    speed?: number;
    height?: number;
    fontSize?: number;
    blink?: boolean;
    separator?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
    phrases,
    backgroundColor = '#00a000',
    textColor = 'black',
    speed = 100,
    height = 30,
    fontSize = 18,
    blink = true,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);

    const continuousPhrases = [...phrases, ...phrases, ...phrases];

    useEffect(() => {
        if (contentRef.current) {
            setContentWidth(contentRef.current.scrollWidth);
        }
    }, [phrases]);

    const duration = contentWidth > 0
        ? (contentWidth / speed)
        : (phrases.join('').length * 10);

    return (
        <div
            ref={containerRef}
            className="marquee-container"
            style={{
                backgroundColor,
                height: `${height}px`,
                position: 'sticky',
                top: 0,
                left: 0,
                width: '100%',
                overflow: 'hidden',
                zIndex: 9998,
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                animation: blink ? 'pulse-bg 2s infinite' : 'none',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <div
                ref={contentRef}
                className="marquee-content"
                style={{
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    animation: `marquee ${duration}s linear infinite`,
                }}
            >
                {continuousPhrases.map((phrase, index) => (
                    <span
                        key={index}
                        className="marquee-item"
                        style={{
                            color: textColor,
                            fontSize: `${fontSize}px`,
                            fontWeight: 'bold',
                            display: 'inline-block',
                            verticalAlign: 'center',
                            lineHeight: '1.2',
                            marginRight: '50px',
                        }}
                    >
            {phrase}
          </span>
                ))}
            </div>
        </div>
    );
};