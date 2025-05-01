import React, { useState, useEffect } from 'react';
import { ReactComponent as Gradient } from '../../assets/Gradient.svg';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { useLocation } from 'react-router-dom';
import './Navbar.css';
import { FiHome, FiUser, FiBriefcase, FiSend, FiMenu, FiX } from 'react-icons/fi';

const Navbar = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const prevPathRef = React.useRef(location.pathname);
  
  useEffect(() => {
    if (prevPathRef.current !== location.pathname && menuOpen) {
      setMenuOpen(false);
      document.body.classList.remove('body-scroll-lock');
    }
    
    prevPathRef.current = location.pathname;
  }, [location.pathname, menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = () => {
    const newMenuState = !menuOpen;
    setMenuOpen(newMenuState);
    
    if (newMenuState) {
      document.body.classList.add('body-scroll-lock');
    } else {
      document.body.classList.remove('body-scroll-lock');
    }
  };
  
  const CustomNavLink = ({ to, children, className, onClick }) => {
    const isActive = location.pathname === to;
    const combinedClassName = isActive ? `${className} active` : className;
    
    const handleClick = (e) => {
      e.preventDefault();
      onNavigate(to);
      if (onClick) onClick();
    };
    
    return (
      <a href={to} className={combinedClassName} onClick={handleClick}>
        {children}
      </a>
    );
  };

  return (
    <>
      <div className="logo-corner">
        <a href="/" onClick={(e) => {
          e.preventDefault();
          onNavigate('/');
        }}>
          <div className="logo-container">
            <Logo className="Logo"/>
          </div>
        </a>
      </div>
      
      <div className={`mobile-toggle ${menuOpen ? 'open' : ''}`} onClick={handleToggle}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </div>
      
      <nav className={`floating-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-glow"></div>
        <ul className="nav-links">
          <li>
            <CustomNavLink to='/' className="nav-link">
              <span className="nav-icon"><FiHome /></span>
              <span className="nav-text">Home</span>
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink to='/about' className="nav-link">
              <span className="nav-icon"><FiUser /></span>
              <span className="nav-text">About</span>
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink to='/work' className="nav-link">
              <span className="nav-icon"><FiBriefcase /></span>
              <span className="nav-text">Works</span>
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink to='/request' className="nav-link">
              <span className="nav-icon"><FiSend /></span>
              <span className="nav-text">Project Request</span>
            </CustomNavLink>
          </li>
        </ul>
      </nav>
      
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Gradient className='mobile-gradient'/>
        <div className="mobile-menu-container">
          <CustomNavLink to='/' className="mobile-nav-link" onClick={handleToggle}>
            <span className="mobile-nav-icon"><FiHome /></span>
            <span>Home</span>
          </CustomNavLink>
          <CustomNavLink to='/about' className="mobile-nav-link" onClick={handleToggle}>
            <span className="mobile-nav-icon"><FiUser /></span>
            <span>About</span>
          </CustomNavLink>
          <CustomNavLink to='/work' className="mobile-nav-link" onClick={handleToggle}>
            <span className="mobile-nav-icon"><FiBriefcase /></span>
            <span>Works</span>
          </CustomNavLink>
          <CustomNavLink to='/request' className="mobile-nav-link" onClick={handleToggle}>
            <span className="mobile-nav-icon"><FiSend /></span>
            <span>Project Request</span>
          </CustomNavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;