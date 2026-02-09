import { useEffect } from 'react';
import { useMode } from '../context/ModeContext';

const useDynamicFavicon = () => {
    const { mode } = useMode();

    useEffect(() => {
        // Mode-specific accent color
        const accentColor = mode === 'ml' ? '#22d3ee' : '#f97316';

        // Render SVG for the logo: GS.
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <rect width="32" height="32" rx="6" fill="#030303"/>
                <text x="50%" y="20" 
                    dominant-baseline="middle" 
                    text-anchor="middle" 
                    fill="#ffffff" 
                    font-family="system-ui, -apple-system, sans-serif" 
                    font-weight="900" 
                    font-size="16"
                    letter-spacing="-1"
                >
                    GS<tspan fill="${accentColor}">.</tspan>
                </text>
            </svg>
        `.trim();

        const encodedSvg = encodeURIComponent(svg);
        const faviconUrl = `data:image/svg+xml,${encodedSvg}`;

        // Helper to update link tags
        const updateLink = (rel) => {
            let link = document.querySelector(`link[rel*='${rel}']`);
            if (!link) {
                link = document.createElement('link');
                link.rel = rel;
                document.head.appendChild(link);
            }
            link.href = faviconUrl;
        };

        updateLink('icon');
        updateLink('apple-touch-icon');

    }, [mode]);
};

export default useDynamicFavicon;
