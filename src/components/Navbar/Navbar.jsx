import React, { useState } from 'react';
import { ReactComponent as Gradient } from '../../assets/Gradient.svg';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className='Navbar'>
      <Gradient className='Gradient'/>
      <NavLink to='/'><Logo className="Logo"/></NavLink>
      <div className={`Mobile ${menuOpen ? 'Open' : ''}`}>
        <NavLink to='/' exact className='ss-font' activeClassName='active'>Home</NavLink>
        <NavLink to='/about' className='ss-font' activeClassName='active'>About</NavLink>
        <NavLink to='/work' className='ss-font' activeClassName='active'>Works</NavLink>
        <NavLink to='/request' className='ss-font' activeClassName='active'>Project Request</NavLink>
      </div>
      <div className={`Toggle ${menuOpen ? 'open' : ''}`} onClick={handleToggle}>
        <div className="Bar"></div>
        <div className="Bar"></div>
        <div className="Bar"></div>
      </div>
      <div className="Links">
        <NavLink to='/about' className='ss-font' activeClassName='active'>About</NavLink>
        <NavLink to='/work' className='ss-font' activeClassName='active'>Works</NavLink>
        <NavLink to='/request' className='ss-font' activeClassName='active'>Project Request</NavLink>
      </div>
    </nav>
  )
}

export default Navbar;
