import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="section contact-v3">
            <div className="container contact-container-v3">

                <div className="contact-minimal-header">
                    <h2 className="text-display">Let's Build Impact</h2>
                </div>

                <div className="contact-actions-v3">
                    <a href="mailto:gwade.steve.dev@gmail.com" className="magnetic-cta">
                        <span>Start a Conversation</span>
                        <FaArrowRight className="cta-arrow" />
                    </a>
                </div>



            </div>
        </section>
    );
};

export default Contact;
