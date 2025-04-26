import React from 'react'
import { Link } from 'react-router-dom'
import './CallToAttention.css'

const CallToAttention = () => {
  return (
    <div className='CallToAttention'>
      <div className="geometric-elements">
        <div className="geo-circle"></div>
        <div className="geo-dots"></div>
        <div className="geo-square"></div>
        <div className="geo-line horizontal"></div>
        <div className="geo-line vertical"></div>
      </div>
        
      <div className="cta-content">
        <div className="spark-badge">Ready to Start</div>
        <div className="heading-container">
          <h2>Let's <span className="text-gradient">Create</span></h2>
          <h2>Something <span className="text-gradient">Amazing</span></h2>
        </div>
            
        <p>Ready to transform your vision into reality? Let's collaborate on innovative solutions 
        that make an impact. I bring technical expertise and creative thinking to every project.</p>
            
        <div className="cta-buttons">
          <Link to="/request" className="button-primary">
            <span>Start a Project</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
            
          <Link to="/request" className="button-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="icon">
              <path fillRule="evenodd" d="M2 10c0-3.967 3.69-7 8-7 4.31 0 8 3.033 8 7s-3.69 7-8 7a9.165 9.165 0 01-1.504-.123 5.976 5.976 0 01-1.825 1.025.75.75 0 01-.589-.022L5.09 16.47A.75.75 0 014.52 16a16.46 16.46 0 001.22-1.607c.226-.35.432-.7.621-1.066A6.993 6.993 0 012 10zm6.5 0c0-.828.559-1.5 1.25-1.5S11 9.172 11 10c0 .828-.559 1.5-1.25 1.5S8.5 10.828 8.5 10zm4.5 0c0-.828.56-1.5 1.25-1.5.689 0 1.25.672 1.25 1.5 0 .828-.561 1.5-1.25 1.5-.69 0-1.25-.672-1.25-1.5z" clipRule="evenodd" />
            </svg>
            <span>Let's Talk</span>
          </Link>
        </div>
      </div>
      
      <div className="cta-highlights">
        <div className="highlight-blob one"></div>
        <div className="highlight-blob two"></div>
        <div className="highlight-effect"></div>
      </div>
      
      <div className="cta-grid-pattern"></div>
    </div>
  )
}

export default CallToAttention