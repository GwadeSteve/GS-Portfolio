import React, { useState } from 'react'
import './Experience.css'

const Experience = ({company_logo, company_name, Period, Role}) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <div 
            className={`Experience ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="experience-header">
                <div className="logo-container">
                    <img src={company_logo} alt={company_name} />
                    <div className="logo-backdrop"></div>
                </div>
                <h3 className="company-name">{company_name}</h3>
            </div>
            
            <div className="experience-period">
                <div className="period-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                </div>
                <span>{Period}</span>
            </div>
            
            <p className="experience-role">{Role}</p>
            
            <div className="experience-decoration"></div>
        </div>
    )
}

export default Experience