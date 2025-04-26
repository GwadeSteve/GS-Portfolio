import React, { useState } from 'react'
import './AwardTile.css'

const AwardTile = ({Competition, Position, Description, Icon}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`AwardTile ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="award-icon-container">
                <img src={Icon} alt={Competition} />
                <div className="award-glow"></div>
            </div>

            <div className="award-content">
                <h3 className="award-title">{Competition}</h3>
                <div className="award-position">{Position}</div>
                <p className="award-description">{Description}</p>
            </div>
            
            <div className="award-badge">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l1.6 5h5.4l-4.3 3.2 1.6 5L12 12.2 7.7 15.2l1.6-5L5 7h5.4z"/>
                </svg>
            </div>
        </div>
    )
}

export default AwardTile