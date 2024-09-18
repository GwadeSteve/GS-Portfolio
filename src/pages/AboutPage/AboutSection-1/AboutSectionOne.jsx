import React from 'react';
import './AboutSectionOne.css';

const images = [
    { src: process.env.PUBLIC_URL + '/images/Me4.png', alt: 'Me4' },
    { src: process.env.PUBLIC_URL + '/images/Me5.jpg', alt: 'Me5' },
    { src: process.env.PUBLIC_URL + '/images/Me6.jpg', alt: 'Me6' },
    { src: process.env.PUBLIC_URL + '/images/Me7.jpg', alt: 'Me7' }
];

const AboutSectionOne = () => {
    return (
        <div className='AboutSectionOne'>
            <div className="AboutMe">
                <div className="AboutMe-1">
                    <p className="xxl-font"><span className='gradient-text'>About</span></p>
                    <div className="Img-collage">
                        {images.map((image, index) => (
                            <div className="Col-Box" key={index}>
                                <img src={image.src} alt={image.alt} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="AboutMe-2">
                    <p className="l-font">
                        From childhood tech enthusiast to aspiring computer vision researcher, my journey in technology continues to fuel my passion and innovation.
                    </p>
                    <p className="s-font">
                        Hello! I'm Gwade Steve, a passionate Software Developer and aspiring Computer Vision Researcher. My journey into the world of technology began when I was around 8 years old, playing with computers and debugging issues on my parents' cell phones. This early curiosity evolved into a lifelong passion, leading me to pursue a Research Master's in Data Science at the National Higher Polytechnic School of Douala. With a strong foundation in software engineering, I focus on creating innovative solutions that bridge the gap between software development and data science. At NHPSD, I delve deeper into machine learning and computer vision, leveraging various programming languages, frameworks, and technologies to tackle real-world challenges. When I'm not coding or researching, you can find me on the basketball court, throwing some hoops. This balance between tech and sports keeps me energized and inspired to continuously push the boundaries of what's possible with technology.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutSectionOne;
