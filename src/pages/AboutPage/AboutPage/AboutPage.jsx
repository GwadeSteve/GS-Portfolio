import React from 'react'
import AboutSectionOne from '../AboutSection-1/AboutSectionOne'
import AboutSectionTwo from '../AboutSection-2/AboutSectionTwo'
import AboutSectionThree from '../AboutSection-3/AboutSectionThree'
import CallToAttention from '../../../components/CallToAttention/CallToAttention'
import './AboutPage.css'

const AboutPage = () => {
    return (
        <div className="about-container">
            <section className="section full-bleed-section about-hero-section section-visible">
                <div className="about-hero-background">
                    <div className="hero-grid"></div>
                    <div className="accent-circle left"></div>
                    <div className="accent-circle right"></div>
                    <div className="geometric-elements">
                        <div className="element circle"></div>
                        <div className="element rectangle"></div>
                        <div className="element dots"></div>
                    </div>
                </div>
                
                <div className="section-content">
                    <AboutSectionOne />
                </div>
            </section>
            
            <section className="section full-bleed-section journey-section section-visible">
                <div className="journey-background">
                    <div className="topography-pattern"></div>
                </div>
                
                <div className="section-content">
                    <AboutSectionTwo />
                </div>
            </section>
            
            <section className="section full-bleed-section achievements-section section-visible">
                <div className="achievements-background">
                    <div className="circuit-pattern"></div>
                    <div className="floating-shapes">
                        <div className="shape dot-grid"></div>
                        <div className="shape light-beam"></div>
                    </div>
                </div>
                
                <div className="section-content">
                    <AboutSectionThree />
                </div>
            </section>
            
            <section className="section full-bleed-section cta-section section-visible">
                <div className="cta-background">
                    <div className="neural-network"></div>
                    <div className="glowing-lines-horizontal"></div>
                </div>
                
                <div className="section-content">
                    <CallToAttention />
                </div>
            </section>
        </div>
    )
}

export default AboutPage