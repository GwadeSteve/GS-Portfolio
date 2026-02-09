import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
    // Prevent background scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!project) return null;

    const LinkIcon = project.details?.link?.includes('github') ? FaGithub : FaExternalLinkAlt;

    const modalContent = (
        <div className="modal-overlay-v2" onClick={onClose}>
            <div className="modal-content-v2" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <FaTimes />
                </button>

                <div className="modal-header">
                    <h2 className="modal-title">{project.title}</h2>
                    <p className="modal-descriptor">{project.descriptor}</p>
                </div>

                <div className="modal-body">
                    {/* Grid Layout: Left Details, Right Visual */}
                    <div className="modal-details">
                        <div className="detail-row">
                            <h4>Problem</h4>
                            <p>{project.details.problem}</p>
                        </div>
                        <div className="detail-row">
                            <h4>Solution</h4>
                            <p>{project.details.how}</p>
                        </div>
                        <div className="detail-row highlight">
                            <h4>Impact</h4>
                            <p>{project.details.outcome}</p>
                        </div>
                    </div>

                    <div className="modal-visual">
                        {project.image ? (
                            <img
                                src={project.image}
                                alt={project.title}
                                className="project-image"
                            />
                        ) : (
                            <div className="visual-placeholder">
                                <span>{project.title.slice(0, 2).toUpperCase()}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="modal-footer">
                    <div className="modal-tags">
                        {project.tags.map(tag => (
                            <span key={tag} className="modal-tag">{tag}</span>
                        ))}
                    </div>
                    {project.details?.link && (
                        <a
                            href={project.details.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="modal-cta"
                        >
                            View <LinkIcon />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default ProjectModal;
