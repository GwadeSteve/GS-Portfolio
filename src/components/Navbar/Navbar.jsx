import React, { useState, useEffect } from 'react';
import { ReactComponent as Gradient } from '../../assets/Gradient.svg';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { FiHome, FiUser, FiBriefcase, FiSend, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.classList.add('body-scroll-lock');
    } else {
      document.body.classList.remove('body-scroll-lock');
    }
  };

  return (
    <>
      {/* Fixed logo in corner for all screens */}
      <div className="logo-corner">
        <NavLink to='/'>
          <div className="logo-container">
            <Logo className="Logo"/>
          </div>
        </NavLink>
      </div>
      
      {/* Mobile toggle button */}
      <div className={`mobile-toggle ${menuOpen ? 'open' : ''}`} onClick={handleToggle}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </div>
      
      {/* Floating sidebar for desktop */}
      <nav className={`floating-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-glow"></div>
        <ul className="nav-links">
          <li>
            <NavLink to='/' exact className='nav-link' activeClassName='active'>
              <span className="nav-icon"><FiHome /></span>
              <span className="nav-text">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' className='nav-link' activeClassName='active'>
              <span className="nav-icon"><FiUser /></span>
              <span className="nav-text">About</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/work' className='nav-link' activeClassName='active'>
              <span className="nav-icon"><FiBriefcase /></span>
              <span className="nav-text">Works</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/request' className='nav-link' activeClassName='active'>
              <span className="nav-icon"><FiSend /></span>
              <span className="nav-text">Project Request</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      
      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Gradient className='mobile-gradient'/>
        <div className="mobile-menu-container">
          <NavLink to='/' exact className='mobile-nav-link' activeClassName='active' onClick={() => setMenuOpen(false)}>
            <span className="mobile-nav-icon"><FiHome /></span>
            <span>Home</span>
          </NavLink>
          <NavLink to='/about' className='mobile-nav-link' activeClassName='active' onClick={() => setMenuOpen(false)}>
            <span className="mobile-nav-icon"><FiUser /></span>
            <span>About</span>
          </NavLink>
          <NavLink to='/work' className='mobile-nav-link' activeClassName='active' onClick={() => setMenuOpen(false)}>
            <span className="mobile-nav-icon"><FiBriefcase /></span>
            <span>Works</span>
          </NavLink>
          <NavLink to='/request' className='mobile-nav-link' activeClassName='active' onClick={() => setMenuOpen(false)}>
            <span className="mobile-nav-icon"><FiSend /></span>
            <span>Project Request</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;