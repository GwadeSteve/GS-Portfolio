import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { processProjects } from '../../utils/dataUtils';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import './Projects.css';

const Projects = () => {
    const processed = processProjects(portfolioData.projects);
    const uniqueProjects = Array.from(new Map(processed.all.map(item => [item.title, item])).values());

    // Filter logic
    const [filter, setFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    const displayedProjects = filter === 'all'
        ? uniqueProjects
        : processed[filter];

    // Helper to determine bento size dynamically & fill gaps at the end
    const getBentoClass = (index, total) => {
        const isLast = index === total - 1;
        const pattern = ['large', 'standard', 'standard', 'wide', 'standard', 'standard'];

        // Smart Tail Logic:
        // If it's the last item and we have an odd remainder that leaves a gap, expand it
        if (isLast && total % 2 !== 0) {
            return 'full'; // Uses the new full-width class
        }

        return pattern[index % pattern.length];
    };

    return (
        <section id="projects" className="section projects">
            <div className="container">
                <div className="projects-header-v2">
                    <h2 className="section-title text-display">Selected Works</h2>

                    <div className="bento-filters">
                        <button
                            className={`bento-filter ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All Works
                        </button>
                        <button
                            className={`bento-filter ${filter === 'ml' ? 'active' : ''}`}
                            onClick={() => setFilter('ml')}
                        >
                            Intelligence
                        </button>
                        <button
                            className={`bento-filter ${filter === 'fullstack' ? 'active' : ''}`}
                            onClick={() => setFilter('fullstack')}
                        >
                            Systems
                        </button>
                    </div>
                </div>

                <div className="bento-grid">
                    {displayedProjects.map((project, index) => (
                        <div key={project.id || index} className={`bento-cell ${getBentoClass(index, displayedProjects.length)}`}>
                            <ProjectCard
                                project={project}
                                onClick={() => setSelectedProject(project)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
};

export default Projects;
