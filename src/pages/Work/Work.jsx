import React, { useState } from 'react'
import './Work.css'
import ProjectTile from '../../components/ProjectTile/ProjectTile'
import projectsData from '../../assets/data/Projects.json'
import CallToAttention from '../../components/CallToAttention/CallToAttention'

const Work = () => {
    const [selectedFilter, setSelectedFilter] = useState('All');

    const projectTypes = ['All', ...new Set(projectsData.map(project => project.type))];

    const filteredProjects = selectedFilter === 'All' ? projectsData : projectsData.filter(project => project.type === selectedFilter);

    const handleFilterClick = (type) => {
        console.log(`Selected filter: ${type}`);
        setSelectedFilter(type);
    }

    return (
        <div className='Work'>
            <div className="Work-Head">
                <p className="xl-font"><span className="gradient-text">My Work</span></p>
                <p className="s-font">Dive into my diverse range of projects, showcasing my love for software development, Problem Solving, and dedication to delivering exceptional results.</p>
            </div>
            <div className="filters">
                {projectTypes.map(type => (
                    <button
                        key={type}
                        onClick={() => handleFilterClick(type)}
                        className={selectedFilter === type ? 'full' : 'empty'}
                    >
                        {type}
                    </button>
                ))}
            </div>
            <div className="Listing">
                {filteredProjects.map((project, index) => (
                    <ProjectTile key={index} {...project} />
                ))}
            </div>
            <CallToAttention/>
        </div>
    )
}

export default Work
