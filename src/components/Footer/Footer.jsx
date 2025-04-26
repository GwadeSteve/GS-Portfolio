import React from 'react'
import './Footer.css'
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { ReactComponent as GitHub } from '../../assets/github.svg'
import { ReactComponent as LinkedIn } from '../../assets/linkedin-circle-mono.svg'
import { ReactComponent as FaceBook } from '../../assets/facebook-circle-mono.svg'
import { ReactComponent as Instagram } from '../../assets/instagram-circle-mono.svg'
import { ReactComponent as WhatsApp } from '../../assets/whatsapp-circle-mono.svg'
import { NavLink, Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='Footer'>
      <div className="footer-container">
        <div className="footer-top">
          <Logo className='Logo'/>
          <div className="PageLinks">
            <NavLink to='/' exact className='footer-link' activeClassName='active'>Home</NavLink>
            <NavLink to='/about' className='footer-link' activeClassName='active'>About</NavLink>
            <NavLink to='/work' className='footer-link' activeClassName='active'>Works</NavLink>
            <NavLink to='/request' className='footer-link' activeClassName='active'>Project Request</NavLink>
          </div>
        </div>
        
        <div className="Bottom">
          <div className="social-icons">
            <Link to="https://github.com" className="social-icon">
              <GitHub/>
            </Link>
            <Link to="https://linkedin.com" className="social-icon">
              <LinkedIn/>
            </Link>
            <Link to="https://instagram.com" className="social-icon">
              <Instagram/>
            </Link>
            <Link to="https://facebook.com" className="social-icon">
              <FaceBook/>
            </Link>
            <Link to="https://whatsapp.com" className="social-icon">
              <WhatsApp/>
            </Link>
          </div>
          <p className="copyright">© 2024 Gwade Steve. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer