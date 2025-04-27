import React, { useState, useEffect } from 'react'
import './AboutSectionThree.css'
import { FiAward, FiExternalLink, FiTrendingUp, FiStar, FiUsers, FiClock } from 'react-icons/fi'

const AboutSectionThree = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        setIsVisible(true);
    }, []);
    
    const awards = [
        {
            title: 'Cameroon AI Awards',
            position: '2024 - Winner 🏆',
            description: 'Won the Best Prototype award for EatWise - a mobile app companion using AI, computer vision and recommendation systems to strengthen nutrition in Cameroon.',
            icon: '/images/Awards/IAC Logo.svg',
            link: 'https://www.iac-cameroon.org/',
            category: 'winner',
            date: '2024-04',
            highlights: [
                'Best AI prototype award',
                'Innovative nutrition solution',
                'Computer vision integration'
            ]
        },
        {
            title: 'JCAI Hackathon',
            position: '2024 - Winner 🏆',
            description: 'Winner of the IAC Hackathon challenge to build a solution for automatic plum sorting using AI. Developed the fastest and most accurate real-time plum classification model.',
            icon: '/images/Awards/IAC Logo.svg',
            link: 'https://www.iac-cameroon.org/',
            category: 'winner',
            date: '2024-04',
            highlights: [
                'Fastest classification model',
                'Highest accuracy among participants',
                'Real-time image processing'
            ]
        },
        {
            title: 'GIZ PADGOF Hackathon',
            position: '2023 - Finalist 🥈',
            description: 'Proposed an innovative E-governance solution for municipal communication, archiving, and digitalization of municipal services, enhancing efficiency.',
            icon: '/images/Awards/Giz Logo.svg',
            link: 'https://www.giz.de/en/html/index.html',
            category: 'finalist',
            date: '2023-11'
        },
        {
            title: 'Google Developer Student Clubs',
            position: '2023 - Recognition',
            description: 'Recognized for contributions to student developer community through workshops, code labs, and mentoring on machine learning and web development.',
            icon: '/images/Awards/Google Logo.svg',
            link: 'https://developers.google.com/community/gdsc',
            category: 'recognition',
            date: '2023-06'
        },
        {
            title: 'Africa AI Accelerator',
            position: '2022 - Participant',
            description: 'Selected to participate in the Africa AI Accelerator program, working on computer vision solutions for healthcare accessibility in rural areas.',
            icon: '/images/Awards/Africa AI Logo.svg',
            link: '#',
            category: 'participant',
            date: '2022-08'
        }
    ];
    
    const filteredAwards = activeFilter === 'all' 
        ? awards 
        : awards.filter(award => award.category === activeFilter);

    const getCategoryIcon = (category) => {
        switch(category) {
            case 'winner': return <FiStar />;
            case 'finalist': return <FiTrendingUp />;
            case 'recognition': return <FiUsers />;
            case 'participant': return <FiClock />;
            default: return <FiAward />;
        }
    };

    return (
        <div className='awards-section'>
            <div className="background-accent"></div>
            
            <div className="section-container">
                <div className="section-header reveal-element">
                    <h2>Awards and <span className="gradient-text">Recognition</span></h2>
                    <p>Milestones that highlight my journey and contributions in technology and innovation.</p>
                </div>
                
                <div className="filter-container reveal-element">
                    <div className={`awards-filter active-${activeFilter}`}>
                        <button 
                            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('all')}
                        >
                            All
                        </button>
                        <button 
                            className={`filter-btn ${activeFilter === 'winner' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('winner')}
                        >
                            Winners
                        </button>
                        <button 
                            className={`filter-btn ${activeFilter === 'finalist' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('finalist')}
                        >
                            Finalists
                        </button>
                        <button 
                            className={`filter-btn ${activeFilter === 'recognition' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('recognition')}
                        >
                            Recognition
                        </button>
                    </div>
                </div>
                
                <div className="awards-container reveal-element delay-1">
                    {filteredAwards && filteredAwards.map((award, index) => (
                        <div 
                            key={index} 
                            className={`award-card ${award.category} ${isVisible ? 'visible' : ''}`}
                            style={{animationDelay: `${index * 100}ms`}}
                        >
                            <div className="award-header">
                                <div className="award-badge">
                                    <div className="badge-icon">
                                        {getCategoryIcon(award.category)}
                                    </div>
                                    <span className="badge-text">{award.category}</span>
                                </div>
                                
                                <div className="award-logo">
                                    {award.icon ? (
                                        <img src={award.icon} alt={`${award.title} logo`} />
                                    ) : (
                                        <FiAward className="default-icon" />
                                    )}
                                </div>
                            </div>
                            
                            <div className="award-details">
                                <div className="award-info">
                                    <h3>{award.title}</h3>
                                    <div className="award-position">{award.position}</div>
                                </div>
                                
                                <p className="award-description">{award.description}</p>
                                
                                {award.highlights && (
                                    <div className="award-highlights">
                                        {award.highlights.map((highlight, idx) => (
                                            <div key={idx} className="highlight-item">
                                                <span className="highlight-bullet"></span>
                                                <span className="highlight-text">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                {award.link && award.link !== '#' && (
                                    <div className="award-link-container">
                                        <a 
                                            href={award.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="award-link"
                                        >
                                            <span>Learn more</span>
                                            <FiExternalLink />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AboutSectionThree