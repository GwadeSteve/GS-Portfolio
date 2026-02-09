import React from 'react';
import { useMode } from '../../context/ModeContext';
import { portfolioData } from '../../data/portfolioData';
import { FaArrowRight, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
    const { mode } = useMode();
    const { headlines, resume, socials } = portfolioData.hero;
    const textParts = headlines[mode];

    return (
        <section id="hero" className="hero section">
            <div className="hero-wrapper">

                {/* Floating Badge */}
                <div className="hero-badge">
                    <span className="badge-pulse"></span>
                    <span className="badge-label">Available for new ventures</span>
                </div>

                {/* The Headline */}
                <div className="hero-headline">
                    <div className="text-line text-line-1">
                        <span>{textParts[0]}</span>
                    </div>

                    <div className={`text-line text-line-2 ${mode}`}>
                        <span className="glass-text" data-text={textParts[1]}>{textParts[1]}</span>
                    </div>

                    <div className="text-line text-line-3">
                        <span>{textParts[2]}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="hero-actions">
                    <a
                        href={resume[mode]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn primary"
                    >
                        Resume <FaArrowRight />
                    </a>
                    <a href="#projects" className="action-btn outline">
                        View Work <FaArrowRight />
                    </a>

                    <div className="action-divider"></div>

                    <div className="action-links">
                        <a href={socials.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        <a href={`mailto:${socials.email}`}><FaEnvelope /></a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
