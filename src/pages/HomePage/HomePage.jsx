import React from 'react'
import './HomePage.css'
import { NavLink } from 'react-router-dom';
import {ReactComponent as Line} from '../../assets/Line.svg'
import {ReactComponent as GitHub} from '../../assets/github.svg'
import {ReactComponent as LinkedIn} from '../../assets/linkedin-circle-mono.svg'
import {ReactComponent as FaceBook} from '../../assets/facebook-circle-mono.svg'
import {ReactComponent as Instagram} from '../../assets/instagram-circle-mono.svg'
import {ReactComponent as WhatsApp} from '../../assets/whatsapp-circle-mono.svg'
import {ReactComponent as Hello} from '../../assets/Hello.svg'
import {ReactComponent as Tools} from '../../assets/Tools.svg'
import ImageMe from '../../assets/ArtMe.jpg'
import { Link } from 'react-router-dom'
import ProjectTile from '../../components/ProjectTile/ProjectTile';
import projectsData from '../../assets/data/Projects.json'
import CallToAttention from '../../components/CallToAttention/CallToAttention';

const HomePage = () => {

    return (
        <div className='HomePage'>
            <div className="Home-1">
                <p className='xxl-font'>I  bridge the <span className='gradient-text'>gap</span> between <span className='gradient-text'>Software Development</span> and <span className='gradient-text'>AI</span> to create <span className='gradient-text'>Intelligent Solutions</span> that shape the <span className='gradient-text'>future.</span></p>
                <p className="m-font"><span className="bold-text">Gwade Steve - </span>Research Master's Student in Data Science and AI at Polytechic School of Douala</p>
                <div className="socials">
                    <div className="Line">
                        <Line/>
                    </div>
                    <div className="icos">
                        <Link to="https://github.com">
                            <GitHub/>
                        </Link>
                        <Link to="https://linkedin.com">
                            <LinkedIn/>
                        </Link>
                        <Link to="https://instagram.com">
                            <Instagram/>
                        </Link>
                        <Link to="https://facebook.com">
                            <FaceBook/>
                        </Link>
                        <Link to="https://whatsapp.com">
                            <WhatsApp/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="Home-2">
                <div className="Home-Img">
                    <img src={ImageMe} alt="An artistic Pic of Steve" />
                </div>
                <div className="Home-Abt">
                    <Hello/>
                    <p className="l-font">A Software Developer and Aspiring Computer Vision Researcher. Currently, I am pursuing a Research Master's in Data Science and AI at the National Polytechnic School of Douala.</p>
                    <p className="s-font">With a passion for creating intelligent solutions through the integration of software development and data science, I am dedicated to advancing the field of AI and computer vision. My work focuses on innovative problem-solving and pushing the boundaries of technology.
                        Want to know more about my journey and projects? <NavLink to='/about' className='ss-font bold-text gradient-text' activeClassName='active'>Read More About Me</NavLink>
                    </p>
                </div>
            </div>
            <div className="Home-3">
                <p className="xl-font"><span className="gradient-text">Tools</span> I use most of the time</p>
                <p className="s-font">As a Software Developer and Aspiring Computer Vision Researcher, I use a variety of tools to craft innovative solutions. These tools help me streamline my workflow and achieve excellence in my projects</p>
                <Tools/>
            </div>
            <div className="Home-4">
                <p className="xl-font">Some of <span className="gradient-text">My Projects</span></p>
                <p className="s-font">A selection of projects that highlight my expertise in software development, data science, and computer vision.</p>
                <div className="Listing">
                {projectsData.slice(0,3).map((project, index) => (
                        <ProjectTile
                            key={index}
                            type={project.type}
                            title={project.title}
                            description={project.description}
                            link_live={project.link_live}
                            link_github={project.link_github}
                            image={project.image}
                            tools={project.tools}
                        />
                ))}
                </div>
            </div>
            <div className="Home-5">
                <CallToAttention/>
            </div>
        </div>
    )
}

export default HomePage