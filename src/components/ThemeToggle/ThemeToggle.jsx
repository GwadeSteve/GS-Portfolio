import React, { useState, useEffect } from 'react';
import './ThemeToggle.css';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'system';
  });
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [systemTheme, setSystemTheme] = useState('dark');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    
    updateSystemTheme(prefersDark);
    prefersDark.addEventListener('change', updateSystemTheme);
    
    return () => prefersDark.removeEventListener('change', updateSystemTheme);
  }, []);

  useEffect(() => {
    const themeToApply = theme === 'system' ? systemTheme : theme;
    document.documentElement.setAttribute('data-theme', themeToApply);
    localStorage.setItem('theme', theme);
  }, [theme, systemTheme]);

  const toggleTheme = (newTheme) => {
    setIsAnimating(true);
    setTheme(newTheme);
    
    if (window.innerWidth < 768) {
      setTimeout(() => setIsExpanded(false), 300);
    }
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  const getCurrentThemeIcon = () => {
    const effectiveTheme = theme === 'system' ? systemTheme : theme;
    
    if (effectiveTheme === 'dark') {
      return <FiMoon className="current-theme-icon" />;
    } else {
      return <FiSun className="current-theme-icon" />;
    }
  };

  const toggleExpand = (e) => {
    e.stopPropagation(); 
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const handleOutsideClick = () => {
      if (isExpanded) {
        setIsExpanded(false);
      }
    };
    
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isExpanded]);

  const actualTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className={`theme-toggle-container ${isExpanded ? 'expanded' : ''}`} onClick={(e) => e.stopPropagation()}>
      <button 
        className={`theme-toggle ${actualTheme} ${isAnimating ? 'animating' : ''}`}
        onClick={toggleExpand}
        aria-label="Toggle theme"
        aria-expanded={isExpanded}
        title="Change theme"
      >
        <div className="toggle-preview">
          {getCurrentThemeIcon()}
          <span className="toggle-label-preview">
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </span>
        </div>
      </button>
      
      <div className="theme-options-panel" aria-hidden={!isExpanded}>
        <button 
          className={`theme-option ${theme === 'light' ? 'active' : ''}`} 
          onClick={() => toggleTheme('light')}
          aria-label="Light theme"
        >
          <FiSun />
          <span>Light</span>
        </button>
        
        <button 
          className={`theme-option ${theme === 'system' ? 'active' : ''}`} 
          onClick={() => toggleTheme('system')}
          aria-label="System theme"
        >
          <FiMonitor />
          <span>System</span>
        </button>
        
        <button 
          className={`theme-option ${theme === 'dark' ? 'active' : ''}`} 
          onClick={() => toggleTheme('dark')}
          aria-label="Dark theme"
        >
          <FiMoon />
          <span>Dark</span>
        </button>
      </div>
      
      <div className="toggle-effects">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`particle particle-${i}`}></div>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle;