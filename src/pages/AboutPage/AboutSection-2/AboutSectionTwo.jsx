import React from 'react'
import './AboutSectionTwo.css'
import {ReactComponent as Download} from '../../../assets/download.svg'
import {ReactComponent as Gradient} from '../../../assets/Gradient.svg'
import {ReactComponent as Names} from '../../../assets/GreatName.svg'
import {ReactComponent as Coursera} from '../../../assets/coursera.svg'
import {ReactComponent as Microsoft} from '../../../assets/Microsoft.svg'
import {ReactComponent as Codesee} from '../../../assets/codesee.svg'
import {ReactComponent as DeepLearning} from '../../../assets/DeepLearningAi.svg'
import Experience from '../../../components/Experience/Experience'

const AboutSectionTwo = () => {
    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = '/resume/GwadeSteve-Resume.pdf';
        link.download = 'GwadeSteve_Resume.pdf';
        link.target = '_blank';
        link.click();
    };

    const experiences = [
        {
            company_logo: '/images/Experience/CRTV.png',
            company_name: 'CRTV Cameroon',
            Period: 'July 2022 - September 2022',
            Role: 'As an intern at Cameroon Radio and Television, I collaborated with the electronics and IT teams, debugging servers and fixing electrical issues. This experience deepened my understanding of electronics.'
        },
        {
            company_logo: '/images/Experience/AITEC.svg',
            company_name: 'AITEC',
            Period: 'July 2022 - September 2022',
            Role: 'At AITECAF, as a software developer intern, I designed, implemented, and tested software solutions for clients and internal projects. The technologies I mainly used were Python, OpenCV and JavaScript'
        }
    ];

    return (
        <div className='AboutSectionTwo'>
            <Gradient className='grad-1'/>
            <div className="Journey">
                    <div className="AboutMe-3">
                        <p className="xl-font">My Career <span className='gradient-text'>Journey</span></p>
                        <p className="s-font">Discover the highlights of my professional path and explore my achievements.</p>
                        <button className="ss-font full" onClick={handleDownloadResume}>
                            Download Resume <Download/>
                        </button>
                    </div>
                    <div className="AboutMe-4">
                        {experiences.map((exp, index) => (
                            <Experience
                                key={index}
                                company_logo={exp.company_logo}
                                company_name={exp.company_name}
                                Period={exp.Period}
                                Role={exp.Role}
                            />
                        ))}
                    </div>
            </div>
            <div className="GreatNames">
                < Names/>
                <div className="Company-Logos">
                    <DeepLearning/>
                    <Codesee/>
                    <Microsoft/>
                    <Coursera/>
                </div>
            </div>
        </div>
    )
}

export default AboutSectionTwo