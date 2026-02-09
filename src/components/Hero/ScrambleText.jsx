import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * ScrambleText - The creative centerpiece.
 * Renders text with a "decoding" effect where each character
 * cycles through random characters before settling on the final letter.
 */
const ScrambleText = ({
    text,
    delay = 0,
    duration = 1.5,
    className = '',
    glowColor = 'rgba(255,255,255,0.3)',
    ...props
}) => {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const hasAnimated = useRef(false);

    // Characters to scramble through
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    useEffect(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const startDelay = delay * 1000;
        const totalDuration = duration * 1000;
        const textLength = text.length;
        const intervalPerChar = totalDuration / textLength;

        let currentIndex = 0;
        let scrambleInterval;

        // Start after delay
        const delayTimeout = setTimeout(() => {
            scrambleInterval = setInterval(() => {
                setDisplayText(prev => {
                    // Build the display string:
                    // - Characters up to currentIndex are final
                    // - Current character is scrambling
                    // - Rest are random
                    let result = text.slice(0, currentIndex);

                    for (let i = currentIndex; i < textLength; i++) {
                        if (text[i] === ' ') {
                            result += ' ';
                        } else if (i === currentIndex) {
                            // Currently revealing character - cycle through random
                            result += chars[Math.floor(Math.random() * chars.length)];
                        } else {
                            // Upcoming characters - random
                            result += chars[Math.floor(Math.random() * chars.length)];
                        }
                    }

                    return result;
                });

                currentIndex++;

                if (currentIndex > textLength) {
                    clearInterval(scrambleInterval);
                    setDisplayText(text);
                    setIsComplete(true);
                }
            }, intervalPerChar);
        }, startDelay);

        return () => {
            clearTimeout(delayTimeout);
            clearInterval(scrambleInterval);
        };
    }, [text, delay, duration]);

    return (
        <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.16, 1, 0.3, 1]
            }}
            className={className}
            style={{
                display: 'inline-block',
                willChange: 'transform, opacity',
                textShadow: isComplete ? `0 0 40px ${glowColor}` : 'none',
                transition: 'text-shadow 0.5s ease'
            }}
            {...props}
        >
            {displayText || text.split('').map(() => '\u00A0').join('')}
        </motion.span>
    );
};

export default ScrambleText;
