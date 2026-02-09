import React, { createContext, useState, useContext, useEffect } from 'react';

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
    // Initialize from localStorage or default to 'ml'
    const [mode, setMode] = useState(() => {
        const savedMode = localStorage.getItem('portfolioMode');
        return savedMode || 'ml';
    });

    const toggleMode = () => {
        setMode((prev) => {
            const newMode = prev === 'ml' ? 'fullstack' : 'ml';
            localStorage.setItem('portfolioMode', newMode);
            return newMode;
        });
    };

    // Sync mode with data attribute for CSS styling
    useEffect(() => {
        document.documentElement.setAttribute('data-mode', mode);
        localStorage.setItem('portfolioMode', mode);
    }, [mode]);

    return (
        <ModeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </ModeContext.Provider>
    );
};

export const useMode = () => {
    const context = useContext(ModeContext);
    if (!context) {
        throw new Error('useMode must be used within a ModeProvider');
    }
    return context;
};
