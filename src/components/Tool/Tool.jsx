import React, { useState } from 'react'
import './Tool.css'

const Tool = ({Text}) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <div 
            className={`Tool ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="tool-text">{Text}</span>
            <div className="tool-glow"></div>
        </div>
    )
}

export default Tool;