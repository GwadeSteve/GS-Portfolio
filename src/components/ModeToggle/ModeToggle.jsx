import React from 'react';
import { useMode } from '../../context/ModeContext';
import { FaBrain, FaLayerGroup } from 'react-icons/fa';
import './ModeToggle.css';

const ModeToggle = () => {
    const { mode, toggleMode } = useMode();

    return (
        <button
            className={`mode-toggle ${mode}`}
            onClick={toggleMode}
            aria-label={`Switch to ${mode === 'ml' ? 'Full Stack' : 'ML'} mode`}
        >
            <div className="toggle-track">
                <div className="toggle-thumb">
                    {mode === 'ml' ? <FaBrain /> : <FaLayerGroup />}
                </div>
            </div>
            <span className="toggle-label">
                {mode === 'ml' ? 'ML ENG' : 'FULL STACK'}
            </span>
        </button>
    );
};

export default ModeToggle;
