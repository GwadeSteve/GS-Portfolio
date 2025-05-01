import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import './LoadingPage.css'
import { ReactComponent as Logo } from '../../assets/Logo.svg'

const LoadingPage = () => {
  const [mounted, setMounted] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Initializing system');
  const location = useLocation();
  const messageRef = useRef(null);
  
  const routeMessages = useMemo(() => ({
    '/': ['Preparing showcase', 'Loading portfolio elements', 'Rendering homepage'],
    '/about': ['Loading personal journey', 'Preparing experience timeline', 'Assembling biography'],
    '/work': ['Curating projects', 'Processing project previews', 'Setting up work gallery'],
    '/request': ['Setting up contact form', 'Initializing messaging system', 'Preparing communication systems'],
    'default': ['Loading content', 'Preparing visuals', 'Optimizing experience']
  }), []); 

  const getRouteMessages = useCallback(() => {
    const pathname = location.pathname;
    return routeMessages[pathname] || routeMessages.default;
  }, [location.pathname, routeMessages]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.style.overflow = 'hidden';
    
    requestAnimationFrame(() => {
      setMounted(true);
    });
    
    const messages = getRouteMessages();
    
    const phaseInterval = setInterval(() => {
      setLoadingPhase(prev => {
        const next = prev + 1;
        if (next < messages.length) {
          setLoadingMessage(messages[next]);
          return next;
        }
        clearInterval(phaseInterval);
        return prev;
      });
    }, 900);
    
    return () => {
      document.body.style.overflow = '';
      clearInterval(phaseInterval);
    };
  }, [getRouteMessages]);

  const createGlyphs = (count) => {
    const glyphs = [];
    for (let i = 0; i < count; i++) {
      const animDelay = Math.random() * 5;
      const size = Math.random() * 15 + 10;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const opacity = Math.random() * 0.4 + 0.1;
      
      glyphs.push(
        <div 
          className="cyber-glyph" 
          key={i}
          style={{
            top: `${posY}%`,
            left: `${posX}%`,
            opacity,
            fontSize: `${size}px`,
            animationDelay: `${animDelay}s`
          }}
        >
          {['⌘', '⌥', '⌤', '⎔', '◉', '◎', '◇', '◈', '◐', '◨', '◧', '▣', '▤', '▥', '▦'][Math.floor(Math.random() * 15)]}
        </div>
      );
    }
    return glyphs;
  };

  if (!mounted) return <div className="loading-page-preload" style={{ backgroundColor: 'var(--color-background)' }}></div>;

  const phaseStyles = {
    transform: `scale(${1 + loadingPhase * 0.05})`,
    opacity: 1 - loadingPhase * 0.1
  };

  return (
    <div className="loading-page">
      <div className="nebula-background"></div>
      <div className="stars-layer"></div>
      <div className="cyber-pattern">{createGlyphs(40)}</div>
      <div className="glowing-grid"></div>
      
      <div className="hologram-container" style={phaseStyles}>
        <div className="core-element">
          <div className="logo-container">
            <div className="logo-scanlines"></div>
            <Logo className="loader-logo" />
          </div>
        </div>
        
        <div className="particles-container">
          {[...Array(30)].map((_, i) => (
            <div key={i} className={`particle particle-${i+1}`}></div>
          ))}
        </div>
        
        <div className="data-lines">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`data-line line-${i+1}`}>
              <div className="data-point"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="loading-interface">
        <div className="progress-wrapper">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{
                animationDuration: `${5 - loadingPhase * 0.5}s`
              }}
            ></div>
            <div className="progress-glow"></div>
          </div>
          <div className="progress-percentage">
            <span className="percentage-number"></span>
            <span className="percentage-symbol">%</span>
          </div>
        </div>
        
        <div className="status-text">
          <span className="status-message" ref={messageRef}>{loadingMessage}</span>
          <span className="status-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </span>
        </div>
      </div>
      
      <div className="corner-frames">
        <div className="corner top-left">
          <span className="frame-line horizontal"></span>
          <span className="frame-line vertical"></span>
        </div>
        <div className="corner top-right">
          <span className="frame-line horizontal"></span>
          <span className="frame-line vertical"></span>
        </div>
        <div className="corner bottom-left">
          <span className="frame-line horizontal"></span>
          <span className="frame-line vertical"></span>
        </div>
        <div className="corner bottom-right">
          <span className="frame-line horizontal"></span>
          <span className="frame-line vertical"></span>
        </div>
      </div>
      
      <div className="system-info">
        <div className="info-item">Route: {location.pathname || '/'}</div>
        <div className="info-item">Theme: {document.documentElement.getAttribute('data-theme')}</div>
        <div className="info-item">Status: Phase {loadingPhase + 1}/3</div>
      </div>
    </div>
  )
}

export default LoadingPage