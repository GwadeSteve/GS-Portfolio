import React, { useState, useEffect } from 'react';
import { ReactComponent as Gradient } from '../../assets/Gradient.svg';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import { FiHome, FiUser, FiBriefcase, FiSend, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Modified approach to avoid dependency issues
  const prevPathRef = React.useRef(location.pathname);
  
  useEffect(() => {
    // Only close menu when path actually changes
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

  useEffect(() => {
    return () => {
      document.body.classList.remove('body-scroll-lock');
    };
  }, []);

  return (
    <>
      <div className="logo-corner">
        <NavLink to='/'>
          <div className="logo-container">
            <Logo className="Logo"/>
          </div>
        </NavLink>
      </div>
      
      <div className={`mobile-toggle ${menuOpen ? 'open' : ''}`} onClick={handleToggle}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </div>
      
      <nav className={`floating-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-glow"></div>
        <ul className="nav-links">
          <li>
            <NavLink to='/' className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} end>
              <span className="nav-icon"><FiHome /></span>
              <span className="nav-text">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className="nav-icon"><FiUser /></span>
              <span className="nav-text">About</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/work' className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className="nav-icon"><FiBriefcase /></span>
              <span className="nav-text">Works</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/request' className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className="nav-icon"><FiSend /></span>
              <span className="nav-text">Project Request</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Gradient className='mobile-gradient'/>
        <div className="mobile-menu-container">
          <NavLink to='/' className={({isActive}) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'} end onClick={handleToggle}>
            <span className="mobile-nav-icon"><FiHome /></span>
            <span>Home</span>
          </NavLink>
          <NavLink to='/about' className={({isActive}) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'} onClick={handleToggle}>
            <span className="mobile-nav-icon"><FiUser /></span>
            <span>About</span>
          </NavLink>
          <NavLink to='/work' className={({isActive}) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'} onClick={handleToggle}>
            <span className="mobile-nav-icon"><FiBriefcase /></span>
            <span>Works</span>
          </NavLink>
          <NavLink to='/request' className={({isActive}) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'} onClick={handleToggle}>
            <span className="mobile-nav-icon"><FiSend /></span>
            <span>Project Request</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;