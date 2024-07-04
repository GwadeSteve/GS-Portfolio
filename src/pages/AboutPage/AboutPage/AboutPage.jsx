import React from 'react'
import AboutSectionOne from '../AboutSection-1/AboutSectionOne'
import AboutSectionTwo from '../AboutSection-2/AboutSectionTwo'
import './AboutPage.css'

const AboutPage = () => {
    return (
        <div className='AboutPage'>
            <AboutSectionOne/>
            <AboutSectionTwo/>
        </div>
    )
}

export default AboutPage