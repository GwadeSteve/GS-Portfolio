import React from 'react'
import AwardTile from '../../../components/AwardTile/AwardTile'
import './AboutSectionThree.css'

const AboutSectionThree = () => {
    return (
        <div className='AboutSectionThree'>
            <p className="xl-font"><span className="gradient-text">Awards</span> and <span className="gradient-text">Acknowledgements</span></p>
            <p className="s-font">Recognitions are like tattoos, you only show them off to people you want to impress.</p>
            <div className="Awards">
                <AwardTile
                    Competition='GIZ PADGOF Hackathon'
                    Position='2023 - Finalist 🥈'
                    Description='Proposed an innovative E-governance solution for municipal communication, archiving, and digitalization of municipal services, enhancing efficiency.'
                    Icon='/images/Awards/Giz Logo.svg'
                />
            </div>
        </div>
    )
}

export default AboutSectionThree