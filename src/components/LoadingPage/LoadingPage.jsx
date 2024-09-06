import React, {useState, useEffect} from 'react'
import './LoadingPage.css'
import { ReactComponent as Gradient } from '../../assets/Gradient.svg'
import { ReactComponent as Logo } from '../../assets/Logo.svg'

const LoadingPage = () => {

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme === 'dark' : true;
      });
    
      useEffect(() => {
        if (isDarkMode) {
          document.documentElement.style.setProperty('--backgrounddark', '#0a0e14');
          document.documentElement.style.setProperty('--white-100', 'rgba(217, 217, 217, 1)');
          document.documentElement.style.setProperty('--white-80', 'rgba(217, 217, 217, 0.8)');
          document.documentElement.style.setProperty('--bluehighlights', '#207ce7');
          document.documentElement.style.setProperty('--black-100', 'rgba(0, 0, 0, 1)');
          document.documentElement.style.setProperty('--black-80', 'rgba(0, 0, 0, 0.8)');
          document.documentElement.style.setProperty('--pagetext', '1.125rem');
          document.documentElement.style.setProperty('--background-blacktiles', '#10141b');
          document.documentElement.style.setProperty('--glasstilecolor', 'rgba(217, 217, 217, 0.05)');
          document.documentElement.style.setProperty('--white-30', 'rgba(217, 217, 217, 0.3)');
          document.documentElement.style.setProperty('--white-5', 'rgba(217, 217, 217, 0.01)');
          document.documentElement.style.setProperty('--bluegradient', 'linear-gradient(90deg, #58a5ff 0%, #7276c5 86.5%)');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.style.setProperty('--backgrounddark', '#f5f5f5');
          document.documentElement.style.setProperty('--white-100', '#000000');
          document.documentElement.style.setProperty('--white-80', 'rgba(0, 0, 0, 0.8)');
          document.documentElement.style.setProperty('--bluehighlights', '#00397a');
          document.documentElement.style.setProperty('--black-100', 'rgba(255, 255, 255, 1)');
          document.documentElement.style.setProperty('--black-80', 'rgba(255, 255, 255, 0.8)');
          document.documentElement.style.setProperty('--pagetext', '1rem');
          document.documentElement.style.setProperty('--background-blacktiles', '#e0e0e0');
          document.documentElement.style.setProperty('--glasstilecolor', 'rgba(0, 0, 0, 0.05)');
          document.documentElement.style.setProperty('--white-30', 'rgba(0, 0, 0, 0.3)');
          document.documentElement.style.setProperty('--white-5', 'rgba(0, 0, 0, 0.01)');
          document.documentElement.style.setProperty('--bluegradient', 'linear-gradient(90deg, #4c9ffe 0%, #656bd8 86.5%)');
          localStorage.setItem('theme', 'light');
          setIsDarkMode(isDarkMode);
        }
      }, [isDarkMode]);

    return (
        <div className='LoadingPage'>
            <div className="Loader">
                <Gradient className='Gradient Gradient-1'/>
                <Gradient className='Gradient Gradient-2'/>
                <Gradient className='Gradient Gradient-3'/>
                <Gradient className='Gradient Gradient-4'/>
                <Gradient className='Gradient Gradient-5'/>
                <Logo className='Logo'/>
            </div>
        </div>
    )
}

export default LoadingPage
