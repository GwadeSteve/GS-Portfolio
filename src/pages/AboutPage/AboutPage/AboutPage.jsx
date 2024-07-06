import React from 'react'
import AboutSectionOne from '../AboutSection-1/AboutSectionOne'
import AboutSectionTwo from '../AboutSection-2/AboutSectionTwo'
import AboutSectionThree from '../AboutSection-3/AboutSectionThree'
import CallToAttention from '../../../components/CallToAttention/CallToAttention'
import './AboutPage.css'

const AboutPage = () => {
    return (
        <div className='AboutPage'>
            <AboutSectionOne/>
            <AboutSectionTwo/>
            <AboutSectionThree/>
            <CallToAttention/>
        </div>
    )
}

export default AboutPage