import React, { useState, useEffect } from 'react';
import './ThemeToggle.css';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Using data-theme to apply CSS variables from index.css
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsAnimating(true);
    setIsDarkMode(!isDarkMode);
    
    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  return (
    <button 
      className={`theme-toggle ${isDarkMode ? 'dark' : 'light'} ${isAnimating ? 'animating' : ''}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div className="toggle-track">
        <span className="toggle-icon sun"><FiSun /></span>
        <span className="toggle-icon moon"><FiMoon /></span>
        <span className="toggle-thumb"></span>
      </div>
      
      <span className="toggle-label">{isDarkMode ? 'Dark' : 'Light'}</span>
    </button>
  );
};

export default ThemeToggle;