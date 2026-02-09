import React from 'react';
import './Footer.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-minimal">
      <div className="container footer-content-wrapper"> {/* Added wrapper for centering if needed */}
        <div className="footer-left">
          <span>&copy; {new Date().getFullYear()} Gwade Steve</span>
        </div>
        <div className="footer-right">
          <a href="https://github.com/GwadeSteve" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/gwadesteve" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="mailto:gwade.steve.dev@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};


export default Footer;