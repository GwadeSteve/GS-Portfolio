import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useMode } from '../../context/ModeContext';
import { FaBrain, FaRocket, FaCode, FaChartLine, FaLightbulb, FaCogs } from 'react-icons/fa';
import './About.css';

const About = () => {
    const { photoUrl, text } = portfolioData.about;
    const { mode } = useMode();

    // Define traits for each mode
    const traits = {
        ml: [
            { icon: FaChartLine, label: 'Data-Focused', desc: 'PyTorch, TensorFlow' },
            { icon: FaLightbulb, label: 'Problem Solver', desc: 'Medical AI, Vision, LLMs' },
            { icon: FaBrain, label: 'Research-Driven', desc: 'Publications & Papers' },
        ],
        fullstack: [
            { icon: FaCode, label: 'Full-Stack', desc: 'React, Node.js, FastAPI' },
            { icon: FaRocket, label: 'Ship Fast', desc: 'MVP to Production' },
            { icon: FaCogs, label: 'System Design', desc: 'Scalable Architecture' }
        ]
    };

    const currentTraits = traits[mode];

    return (
        <section id="about" className="section about-v3">
            <div className="container about-container-v3">

                {/* Left: Image with accent frame */}
                <div className="about-visual-v3">
                    <div className={`about-image-frame ${mode}`}>
                        <img src={photoUrl} alt="Portrait" className="about-image-v3" />
                    </div>
                    <div className={`about-accent-line ${mode}`}></div>
                </div>

                {/* Right: Content */}
                <div className="about-content-v3">
                    <div className="about-header-v3">
                        <span className="about-label">About</span>
                        <h2 className="about-title-v3">Who I Am</h2>
                    </div>

                    <p className="about-bio-v3">{text[mode]}</p>

                    {/* Personality Traits */}
                    <div className="about-traits-v3">
                        {currentTraits.map((trait, index) => (
                            <div
                                key={trait.label}
                                className={`trait-card ${mode}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <trait.icon className="trait-icon" />
                                <div className="trait-text">
                                    <span className="trait-label">{trait.label}</span>
                                    <span className="trait-desc">{trait.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mode indicator */}
                    <div className="about-mode-indicator-v3">
                        <span className="mode-label">Currently viewing as</span>
                        <span className={`mode-value ${mode}`}>
                            {mode === 'ml' ? 'ML Engineer' : 'Product Builder'}
                        </span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;
