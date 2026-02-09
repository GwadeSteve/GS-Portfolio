import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ModeToggle from '../ModeToggle/ModeToggle';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/';

    // Scroll Effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Clear active section when NOT on home page
    useEffect(() => {
        if (!isHomePage) {
            setActiveSection('');
        }
    }, [isHomePage]);

    // Active Section Spy - ONLY on home page
    useEffect(() => {
        if (!isHomePage) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { threshold: 0.3 });

        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => observer.observe(section));

        return () => sections.forEach(section => observer.unobserve(section));
    }, [isHomePage]);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const handleLogoClick = (e) => {
        e.preventDefault();
        if (isHomePage) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
            setTimeout(() => window.scrollTo(0, 0), 100);
        }
    };

    // Handle navigation link clicks - Fixed for cross-page routing
    const handleNavClick = (e, sectionId) => {
        e.preventDefault();
        setMobileMenuOpen(false);

        if (isHomePage) {
            // Already on home, just scroll
            const element = document.getElementById(sectionId);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Navigate home first, then scroll to section
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    };

    const navLinks = [
        { name: 'About', id: 'about' },
        { name: 'Work', id: 'projects' },
        { name: 'Journey', id: 'timeline' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container container">
                <a href="/" className="navbar-logo" onClick={handleLogoClick}>
                    GS<span className="dot">.</span>
                </a>

                <div className="desktop-actions">
                    <ul className="navbar-links">
                        {navLinks.map(link => (
                            <li key={link.name}>
                                <a
                                    href={`/#${link.id}`}
                                    className={isHomePage && activeSection === link.id ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, link.id)}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                        <li>
                            <Link
                                to="/blog"
                                className={location.pathname.startsWith('/blog') ? 'active' : ''}
                            >
                                Blog
                            </Link>
                        </li>
                    </ul>
                    <div className="nav-toggle-wrapper">
                        <ModeToggle />
                    </div>
                </div>

                <div className="mobile-actions">
                    <div className="mobile-toggle-wrapper">
                        <ModeToggle />
                    </div>
                    <button
                        className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </div>

                <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
                    <ul className="mobile-links">
                        {navLinks.map(link => (
                            <li key={link.name}>
                                <a
                                    href={`/#${link.id}`}
                                    onClick={(e) => handleNavClick(e, link.id)}
                                    className={isHomePage && activeSection === link.id ? 'active' : ''}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                        <li>
                            <Link
                                to="/blog"
                                onClick={() => setMobileMenuOpen(false)}
                                className={location.pathname.startsWith('/blog') ? 'active' : ''}
                            >
                                Blog
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;