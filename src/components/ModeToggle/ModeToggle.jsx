import React from 'react';
import { useMode } from '../../context/ModeContext';
import { FaBrain, FaLayerGroup } from 'react-icons/fa';
import './ModeToggle.css';

const ModeToggle = () => {
    const { mode, toggleMode } = useMode();


    const handleToggle = () => {
        toggleMode();
        // User requested explicit scroll to top on toggle
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const isML = mode === 'ml';

    return (
        <button
            className={`mode-toggle ${mode}`}
            onClick={handleToggle}
            aria-label={`Switch to ${isML ? 'Full Stack' : 'ML'} mode`}
        >
            {/* Animated gradient border */}
            <span className="toggle-border-glow"></span>

            {/* Glass surface */}
            <span className="toggle-glass">
                {/* Active mode indicator */}
                <span className="toggle-active-side">
                    <span className="toggle-icon">
                        {isML ? <FaBrain /> : <FaLayerGroup />}
                    </span>
                    <span className="toggle-current">
                        {isML ? 'ML' : 'FS'}
                    </span>
                </span>

                {/* Divider */}
                <span className="toggle-divider"></span>

                {/* Alt mode — the curiosity trigger */}
                <span className="toggle-alt-side">
                    <span className="toggle-alt-icon">
                        {isML ? <FaLayerGroup /> : <FaBrain />}
                    </span>
                    <span className="toggle-alt-text">
                        {isML ? 'FS' : 'ML'}
                    </span>
                </span>
            </span>
        </button>
    );
};

export default ModeToggle;
