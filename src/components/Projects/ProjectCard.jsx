import React from 'react';
import { FaArrowRight, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
    // Determine link icon type
    const LinkIcon = project.details?.link?.includes('github') ? FaGithub : FaExternalLinkAlt;

    return (
        <div className="project-card-v2" onClick={onClick}>
            <div className="card-bg-glow"></div>

            <div className="card-content">
                <div className="card-top">
                    {/* Tags row */}
                    <div className="card-tags">
                        {project.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="v2-tag">{tag}</span>
                        ))}
                    </div>
                </div>

                <div className="card-main">
                    <h3 className="card-title-v2">{project.title}</h3>
                    <p className="card-desc-v2">{project.descriptor}</p>
                </div>

                <div className="card-footer">
                    <span className="read-more">
                        Explore <FaArrowRight className="arrow-icon" />
                    </span>

                    {/* Direct Link Action - Stop Propagation to prevent modal open */}
                    {project.details?.link && (
                        <a
                            href={project.details.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="direct-link-btn"
                            onClick={(e) => e.stopPropagation()}
                            title="View Code / Live"
                        >
                            <LinkIcon />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
