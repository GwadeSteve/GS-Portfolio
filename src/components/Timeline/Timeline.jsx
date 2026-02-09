import React, { useState } from 'react';
import { useMode } from '../../context/ModeContext';
import { portfolioData } from '../../data/portfolioData';
import { withIds } from '../../utils/dataUtils';
import { FaTrophy, FaBriefcase, FaBook, FaExternalLinkAlt } from 'react-icons/fa';
import './Timeline.css';

const Timeline = () => {
    const { mode } = useMode();
    const timeline = withIds(portfolioData.timeline, 't');
    const research = withIds(portfolioData.research, 'r');
    const [hoveredId, setHoveredId] = useState(null);

    // Normalize type for CSS classes (lowercase)
    const normalizeType = (type) => type?.toLowerCase() || 'role';

    return (
        <section id="timeline" className="section timeline-v6">
            <div className="container">
                <div className="timeline-header-v6">
                    <h2 className="text-display">The Journey</h2>
                    <p className="timeline-subtitle-v6">Milestones that shaped my craft.</p>
                </div>

                <div className="timeline-grid">
                    {timeline.map((item) => {
                        const typeClass = normalizeType(item.type);
                        const isAchievement = typeClass === 'achievement';
                        const isDimmed = hoveredId && hoveredId !== item.id;

                        return (
                            <div
                                key={item.id}
                                className={`timeline-item ${typeClass} ${isDimmed ? 'dimmed' : ''}`}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Type Icon */}
                                <div className="item-icon">
                                    {isAchievement ? <FaTrophy /> : <FaBriefcase />}
                                </div>

                                {/* Content */}
                                <div className="item-content">
                                    <div className="item-meta">
                                        <span className="item-year">{item.year}</span>
                                        <span className={`item-badge ${typeClass}`}>
                                            {isAchievement ? 'Achievement' : 'Experience'}
                                        </span>
                                    </div>
                                    <h3 className="item-title">{item.title}</h3>
                                    <p className="item-org">{item.org}</p>
                                    <p className="item-impact">{item.impact}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* RESEARCH & PUBLICATIONS - ONLY FOR ML MODE */}
                {mode === 'ml' && research && research.length > 0 && (
                    <div className="research-section">
                        <div className="research-header">
                            <h3 className="research-title">Research & Publications</h3>
                            <div className="research-divider"></div>
                        </div>

                        <div className="research-list">
                            {research.map((pub) => (
                                <div key={pub.id} className="research-card">
                                    <div className="research-icon">
                                        <FaBook />
                                    </div>
                                    <div className="research-info">
                                        <div className="research-meta">
                                            <span className="research-year">{pub.year}</span>
                                            <span className="research-journal">{pub.journal}</span>
                                        </div>
                                        <h4 className="pub-title">{pub.title}</h4>
                                        <p className="pub-impact">{pub.impact}</p>
                                        {pub.link !== "#" && (
                                            <a href={pub.link} className="pub-link" target="_blank" rel="noopener noreferrer">
                                                Read Paper <FaExternalLinkAlt />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Timeline;
