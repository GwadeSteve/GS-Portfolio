import React from 'react'
import './AboutSectionTwo.css'
import { FiDownload, FiBriefcase, FiCalendar, FiExternalLink } from 'react-icons/fi'

const AboutSectionTwo = () => {
    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = '/resume/GwadeSteve-Resume.pdf';
        link.download = 'GwadeSteve_Resume.pdf';
        link.target = '_blank';
        link.click();
    };

    const experiences = [
        {
            company_logo: '/images/Experience/SmartMove.svg',
            company_name: 'SmartMove',
            period: 'January 2024 - Present',
            role: 'Currently in research and development initiatives focused on AI-powered mobility solutions. Working on computer vision algorithms for local problems.',
            position: 'Research & Development',
            type: 'Part-time',
            skills: ['Computer Vision', 'AI', 'Python', 'Pytorch'],
            companyUrl: 'https://smartmove.com'
        },
        {
            company_logo: '/images/Experience/Tgnix.svg',
            company_name: 'Tgnix.co',
            period: 'March 2023 - December 2024',
            role: 'Led a team of 4 developers building AI applications for clients. Implemented agile methodologies, and architected scalable solutions using various stacks like MERN and Render.',
            position: 'Software Developer Team Lead',
            type: 'Part-time',
            skills: ['React', 'Node.js', 'Render', 'Team Leadership'],
            companyUrl: 'https://www.linkedin.com/company/tgnix-co/'
        },
        {
            company_logo: '/images/Experience/AITEC.svg',
            company_name: 'AITECAF',
            period: 'June 2022 - September 2022',
            role: 'At AITECAF, as a software developer intern, I designed, implemented, and tested software solutions for clients and internal projects. The technologies I mainly used were Python, OpenCV and JavaScript',
            position: 'Software Developer Intern',
            type: 'Internship',
            skills: ['Python', 'OpenCV', 'JavaScript'],
            companyUrl: 'https://aitecaf.com/'
        },
        {
            company_logo: '/images/Experience/CRTV.png',
            company_name: 'CRTV Cameroon',
            period: 'July 2021 - September 2021',
            role: 'As an intern at Cameroon Radio and Television, I collaborated with the electronics and IT teams, debugging servers and fixing electrical issues. This experience deepened my understanding of electronics.',
            position: 'IT Intern',
            type: 'Internship',
            skills: ['Server Administration', 'Electronics', 'Troubleshooting'],
            companyUrl: 'https://crtv.cm'
        }
    ];
    

    return (
        <div className='experience-section'>
            <div className="background-glow"></div>
            
            <div className="section-container">
                <div className="section-header reveal-element">
                    <h2>My Career <span className='gradient-text'>Journey</span></h2>
                    <p>Discover the highlights of my professional path and explore my achievements.</p>
                    <button className="cv-download-btn" onClick={handleDownloadResume}>
                        <span>Download Resume</span>
                        <FiDownload />
                    </button>
                </div>
                
                <div className="experience-timeline reveal-element delay-1">
                    <div className="timeline-connector">
                        <div className="timeline-glow-overlay"></div>
                        <div className="timeline-pulse"></div>
                        
                        <div className="particle particle-1"></div>
                        <div className="particle particle-2"></div>
                        <div className="particle particle-3"></div>
                        <div className="particle particle-4"></div>
                        <div className="particle particle-5"></div>
                        <div className="particle particle-6"></div>
                        
                        <div className="sparkle sparkle-1"></div>
                        <div className="sparkle sparkle-2"></div>
                        <div className="sparkle sparkle-3"></div>
                    </div>
                    
                    {experiences.map((exp, index) => (
                        <div key={index} className={`experience-card ${index % 2 === 0 ? 'left' : 'right'}`}>

                            <div className="card-timeline-connector"></div>
                            
                            <div className="timeline-anchor">
                                <div className="anchor-core"></div>
                                <div className="anchor-pulse"></div>
                            </div>
                            
                            <div className="company-logo">
                                <img src={exp.company_logo} alt={exp.company_name} />
                            </div>
                            
                            <div className="experience-content">
                                <div className="experience-header">
                                    <div className="company-title">
                                        <h3>{exp.company_name}</h3>
                                        {exp.companyUrl && (
                                            <a 
                                                href={exp.companyUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="company-link"
                                                title={`Visit ${exp.company_name}`}
                                            >
                                                <FiExternalLink />
                                            </a>
                                        )}
                                    </div>
                                    <div className="period">
                                        <FiCalendar />
                                        <span>{exp.period}</span>
                                    </div>
                                </div>
                                
                                <div className="position-info">
                                    <div className="position-badge">
                                        <FiBriefcase />
                                        <span>{exp.position}</span>
                                    </div>
                                    <div className={`type-badge ${exp.type.toLowerCase()}`}>
                                        <span>{exp.type}</span>
                                    </div>
                                </div>
                                
                                <p className="role-description">{exp.role}</p>
                                
                                {exp.skills && exp.skills.length > 0 && (
                                    <div className="skills-container">
                                        {exp.skills.map((skill, idx) => (
                                            <span key={idx} className="skill-tag">{skill}</span>
                                        ))}
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

export default AboutSectionTwo