import React from 'react';
import { FaArrowRight, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="section contact-v3">
            <div className="container contact-container-v3">

                {/* Overline */}
                <span className="contact-overline">Available for Collaboration</span>

                {/* Main Headline */}
                <h2 className="contact-headline">
                    Let's Build
                    <span className="contact-accent"> Impact</span>
                </h2>

                {/* Subtitle */}
                <p className="contact-subtitle">
                    Have a project in mind? Let's turn ideas into intelligent solutions.
                </p>

                {/* Primary CTA */}
                <div className="contact-cta-row">
                    <a href="mailto:gwade.steve.dev@gmail.com" className="magnetic-cta">
                        <FaEnvelope className="cta-icon" />
                        <span>Start a Conversation</span>
                        <FaArrowRight className="cta-arrow" />
                    </a>
                </div>

                {/* Social Links */}
                <div className="contact-socials">
                    <a href="https://github.com/GwadeSteve" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FaGithub />
                        <span>GitHub</span>
                    </a>
                    <span className="social-divider"></span>
                    <a href="https://linkedin.com/in/gwade-steve" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FaLinkedin />
                        <span>LinkedIn</span>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default Contact;
