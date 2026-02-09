import React, { lazy, Suspense } from 'react';
import { useMode } from '../../context/ModeContext';
import './Background.css';

const NeuralBackground = lazy(() => import('./NeuralBackground'));
const SystemBackground = lazy(() => import('./SystemBackground'));

const BackgroundManager = () => {
    const { mode } = useMode();

    return (
        <div className="background-manager">
            <Suspense fallback={null}>
                {mode === 'ml' ? <NeuralBackground /> : <SystemBackground />}
            </Suspense>
        </div>
    );
};

export default BackgroundManager;
