import React, { useState, useEffect } from 'react';
import { ReactComponent as Gradient } from '../../assets/Gradient.svg';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

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
    <nav className={`Navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Gradient className='Gradient'/>
        <NavLink to='/'>
          <div className="logo-container">
            <Logo className="Logo"/>
          </div>
        </NavLink>
        
        <div className={`Mobile ${menuOpen ? 'Open' : ''}`}>
          <NavLink to='/' exact className='nav-link' activeClassName='active' onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to='/about' className='nav-link' activeClassName='active' onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to='/work' className='nav-link' activeClassName='active' onClick={() => setMenuOpen(false)}>Works</NavLink>
          <NavLink to='/request' className='nav-link' activeClassName='active' onClick={() => setMenuOpen(false)}>Project Request</NavLink>
        </div>
        
        <div className={`Toggle ${menuOpen ? 'open' : ''}`} onClick={handleToggle}>
          <div className="Bar"></div>
          <div className="Bar"></div>
          <div className="Bar"></div>
        </div>
        
        <div className="Links">
          <div className="nav-link-wrapper">
            <NavLink to='/about' className='nav-link' activeClassName='active'>
              About
            </NavLink>
          </div>
          <div className="nav-link-wrapper">
            <NavLink to='/work' className='nav-link' activeClassName='active'>
              Works
            </NavLink>
          </div>
          <div className="nav-link-wrapper">
            <NavLink to='/request' className='nav-link' activeClassName='active'>
              Project Request
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;