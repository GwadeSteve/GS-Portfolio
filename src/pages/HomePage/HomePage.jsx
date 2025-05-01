import React from 'react'; 
import { NavLink } from 'react-router-dom';
import { ReactComponent as Line } from '../../assets/Line.svg';
import { ReactComponent as GitHub } from '../../assets/github.svg';
import { ReactComponent as LinkedIn } from '../../assets/linkedin-circle-mono.svg';
import { ReactComponent as WhatsApp } from '../../assets/whatsapp-circle-mono.svg';
import { ReactComponent as Tools } from '../../assets/Tools.svg';
import ImageMe from '../../assets/ArtMe.jpg';
import ProjectTile from '../../components/ProjectTile/ProjectTile';
import projectsData from '../../assets/data/Projects.json';
import CallToAttention from '../../components/CallToAttention/CallToAttention';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="page-container">
      <section className="section hero-section section-visible">
        <div className="hero-background">
          <div className="hero-grid"></div>
          <div className="hero-accent-circle"></div>
          <div className="hero-primary-circle"></div>
          <div className="hero-geometric-shapes">
            <div className="shape circle"></div>
            <div className="shape square"></div>
            <div className="shape triangle"></div>
          </div>
        </div>

        
        
        <div className="container">
          <div className="hero-content">
            <div className="hero-text-container">
              <h1 className="hero-heading reveal-text">
                <span className="text-line">I build <span className="gradient-text">Software</span> & <span className="gradient-text">AI</span></span>
                <span className="text-line">informed by research</span>
              </h1>

              <div className="hero-subheading">
                I build <span className="gradient-text pulse-ring">intelligent solutions</span> that matter.
              </div>
              
              <div className="hero-description">
                <div className="glass-effect tech-badge">
                  <div className="badge-pulse pulsing"></div>
                  <p>
                    MSc at NHPSD
                  </p>
                </div>
              </div>
              
              <div className="hero-actions">
                <NavLink to="/work" className="button primary">
                  <span>View My Work</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </NavLink>
                <NavLink to="/about" className="button secondary">About Me</NavLink>
              </div>
            </div>
            
            <div className="socials">
              <div className="Line">
                <Line />
              </div>
              <div className="social-icons">
                {[
                  { icon: <GitHub />, url: "https://github.com/GwadeSteve", label: "GitHub" },
                  { icon: <LinkedIn />, url: "https://www.linkedin.com/in/gwade-steve-0414b8249?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn" },
                  { icon: <WhatsApp />, url: "https://wa.me/237683647400", label: "WhatsApp" }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon hover-lift"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section full-bleed-section about-section section-visible">
        
        
        <div className="section-content">
          <div className="about-home">
            <div className="about-image reveal-element">
              <div className="image-frame">
                <div className="image-container">
                  <img src={ImageMe} alt="Gwade Steve - Software Developer and AI Researcher" />
                </div>
                <div className="image-decoration top-left"></div>
                <div className="image-decoration bottom-right"></div>
              </div>
            </div>
            
            <div className="about-text">
              <div className="greeting-container reveal-element">
                <h2 className="greeting">
                  Hello, I'm <span className="gradient-text shimmer">Gwade Steve</span>
                </h2>
              </div>
              
              <h2 className="section-title reveal-element delay-1">
                <span className="gradient-text shimmer">Software Developer</span> & Aspiring <span className="gradient-text shimmer">Computer Vision Researcher</span>
              </h2>

              <p className="about-description combined-about reveal-element delay-2">
                I'm currently in a Research Master's (Data Science & AI) at the National Polytechnic School of Douala, Cameroon. For me, technology is a tool for solving problems, and I'm really into building smart solutions by combining software development and data science, with a big focus on pushing the boundaries of AI, especially in <p className="gradient-text">computer vision</p>
              </p>
              
              <NavLink to="/about" className="button secondary reveal-element delay-4">
                <span>Read More About Me</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section full-bleed-section tools-section section-visible">
        <div className="tools-background">
          <div className="neural-network"></div>
          <div className="tools-floating-elements">
            <div className="floating-element circle-md"></div>
            <div className="floating-element square-sm"></div>
            <div className="floating-element dots-pattern"></div>
          </div>
        </div>
        
        <div className="tools-content">
          <h2 className="section-title text-center reveal-element">
            <span className="gradient-text shimmer">Tools</span> I Use
          </h2>
          
          <p className="section-description text-center reveal-element delay-1">
            I use a variety of tools to build innovative solutions. 
            These tools help me achieve excellence in my projects.
          </p>
          
          <div className="tools-display reveal-element delay-2">
            <Tools />
            <div className="tools-glow"></div>
          </div>
        </div>
      </section>
      
      <section className="section full-bleed-section projects-section section-visible">        
        <div className="section-content">
          <h2 className="section-title text-center reveal-element">
            Featured <span className="gradient-text shimmer">Projects</span>
          </h2>
          
          <p className="section-description text-center reveal-element delay-1">
            A selection of projects that highlight my expertise in software development, data science, and computer vision.
          </p>
          
          <div className="projects-grid">
            {projectsData.slice(0, 3).map((project, index) => (
              <div
                key={index}
                className={`project-item reveal-element delay-${index + 2}`}
              >
                <ProjectTile
                   type={project.type}
                   title={project.title}
                   description={project.description}
                   link_live={project.link_live}
                   link_github={project.link_github}
                   image={project.image}
                   tools={project.tools}
                   status={project.status}
                />
              </div>
            ))}
          </div>
          
          <div className="view-all-container reveal-element delay-5">
            <NavLink to="/work" className="button primary">
              <span>View All Projects</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </NavLink>
          </div>
        </div>
      </section>
      
      <section className="section full-bleed-section cta-section section-visible">
        <div className="cta-background">
          <div className="circuit-pattern"></div>
          <div className="glowing-lines-horizontal"></div>
          <div className="cta-accent-circle"></div>
        </div>
        <div className="section-content">
          <CallToAttention />
        </div>
      </section>
    </div>
  );
};

export default HomePage;