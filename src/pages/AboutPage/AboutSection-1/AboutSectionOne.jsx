import React, { useState } from 'react'
import './AboutSectionOne.css'

const images = [
    { 
        src: process.env.PUBLIC_URL + '/images/Me4.png', 
        alt: 'Gwade Steve', 
        caption: 'Software Development' 
    },
    { 
        src: process.env.PUBLIC_URL + '/images/Me5.jpg', 
        alt: 'Gwade Presenting', 
        caption: 'Research Presentation' 
    },
    { 
        src: process.env.PUBLIC_URL + '/images/Me6.jpg', 
        alt: 'Gwade Working', 
        caption: 'Deep in Code' 
    },
    { 
        src: process.env.PUBLIC_URL + '/images/Me7.jpg', 
        alt: 'Gwade Collaborating', 
        caption: 'Teamwork' 
    },
    { 
        src: process.env.PUBLIC_URL + '/images/Me6.jpg', 
        alt: 'Gwade Working', 
        caption: 'Deep in Code' 
    },
    { 
        src: process.env.PUBLIC_URL + '/images/Me7.jpg', 
        alt: 'Gwade Collaborating', 
        caption: 'Teamwork' 
    },
    { 
        src: process.env.PUBLIC_URL + '/images/Me6.jpg', 
        alt: 'Gwade Working', 
        caption: 'Deep in Code' 
    },
    { 
        src: process.env.PUBLIC_URL + '/images/Me7.jpg', 
        alt: 'Gwade Collaborating', 
        caption: 'Teamwork' 
    },
    { 
        src: process.env.PUBLIC_URL + '/images/Me6.jpg', 
        alt: 'Gwade Working', 
        caption: 'Deep in Code' 
    },
    { 
        src: process.env.PUBLIC_URL + '/images/Me7.jpg', 
        alt: 'Gwade Collaborating', 
        caption: 'Teamwork' 
    }
];

const AboutSectionOne = () => {
    const [activeImage, setActiveImage] = useState(0);
    const [hoveredImage, setHoveredImage] = useState(null);
    
    const handleImageClick = (index) => {
        setActiveImage(index);
    };
    
    return (
        <div className="about-hero-content">
            <h2 className="section-title text-center reveal-element">
                About <span className="gradient-text shimmer">Me</span>
            </h2>
            
            <div className="about-content">
                <div className="bio-introduction reveal-element delay-1">
                    <div className="bio-header">
                        <div className="spark-badge">
                            <span className="badge-pulse pulsing"></span>
                            <span>Developer & Researcher</span>
                        </div>
                        <h3 className="bio-name">Gwade Steve</h3>
                        <div className="bio-separator"></div>
                    </div>
                    
                    <p className="bio-lead">
                        From childhood tech enthusiast to aspiring computer vision researcher, 
                        my journey in technology continues to fuel my passion and innovation.
                    </p>
                </div>
                
                <div className="gallery-section reveal-element delay-2">
                    <div className="gallery-container">
                        <div className="gallery-main">
                            <div className="image-wrapper">
                                <img 
                                    src={images[activeImage].src} 
                                    alt={images[activeImage].alt} 
                                    className="main-image"
                                />
                                <div className="image-overlay"></div>
                                <div className="image-caption">
                                    <span>{images[activeImage].caption}</span>
                                </div>
                                
                                <div className="image-navigation">
                                    <button 
                                        className="nav-btn prev" 
                                        onClick={() => handleImageClick(activeImage === 0 ? images.length - 1 : activeImage - 1)}
                                        aria-label="Previous image"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <button 
                                        className="nav-btn next" 
                                        onClick={() => handleImageClick((activeImage + 1) % images.length)}
                                        aria-label="Next image"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="gallery-thumbnails-wrapper">
                            <div className="gallery-thumbnails">
                                {images.map((image, index) => (
                                    <div 
                                        key={index}
                                        className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                                        onClick={() => handleImageClick(index)}
                                        onMouseEnter={() => setHoveredImage(index)}
                                        onMouseLeave={() => setHoveredImage(null)}
                                    >
                                        <div className="thumbnail-wrapper">
                                            <img src={image.src} alt={`Thumbnail ${index + 1}`} />
                                            <div className="thumbnail-overlay"></div>
                                            <div className={`thumbnail-indicator ${hoveredImage === index ? 'hover' : ''}`}></div>
                                        </div>
                                        <div className="thumbnail-number">{index + 1}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="gallery-counter">
                            <span className="current">{activeImage + 1}</span>
                            <span className="separator">/</span>
                            <span className="total">{images.length}</span>
                        </div>
                    </div>
                </div>
                
                <div className="bio-details reveal-element delay-3">
                    <div className="bio-text">                        
                        <p>
                            Currently pursuing a Research Master's in Data Science at the National Higher Polytechnic School of Douala, 
                            I focus on creating innovative solutions that bridge the gap between software development and data science, 
                            with a particular emphasis on computer vision and artificial intelligence.
                        </p>
                    </div>
                    
                    <div className="personal-details-card">
                        
                        <div className="details-list">
                            <div className="detail-row">
                                <div className="detail-content">
                                    <span className="detail-label">Expertise</span>
                                    <span className="detail-value">Computer Vision</span>
                                </div>
                            </div>
                            <div className="detail-row">
                                <div className="detail-content">
                                    <span className="detail-label">Education</span>
                                    <span className="detail-value">MSc Data Science & AI</span>
                                </div>
                            </div>
                            <div className="detail-row">
                                <div className="detail-content">
                                    <span className="detail-label">Languages</span>
                                    <span className="detail-value">English and French</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutSectionOne