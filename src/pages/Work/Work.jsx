import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Work.css';
import ProjectTile from '../../components/ProjectTile/ProjectTile';
import projectsData from '../../assets/data/Projects.json';
import CallToAttention from '../../components/CallToAttention/CallToAttention';
import { 
    FiCode, FiBriefcase, FiStar, FiGlobe, FiBox, FiSearch, 
    FiCpu, FiFeather, FiLayers, FiCamera,
    FiDatabase, FiCommand, FiChevronDown
} from 'react-icons/fi';

const Work = () => {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [typedText, setTypedText] = useState('');
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [quoteVisible, setQuoteVisible] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const typingRef = useRef(null);
    const filterContainerRef = useRef(null);
    const projectsSectionRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const typingPhrases = useMemo(() => [
        {text: "Write clean code", icon: <FiCode color="#2563eb" />},
        {text: "Solve real problems", icon: <FiCommand color="#8b5cf6" />},
        {text: "Design user experiences", icon: <FiFeather color="#06b6d4" />},
        {text: "Create value", icon: <FiBox color="#3b82f6" />}
    ], []);

    const projectTypes = ['All', ...new Set(projectsData.map(project => project.type))];

    const filteredProjects = selectedFilter === 'All' 
        ? projectsData 
        : projectsData.filter(project => project.type === selectedFilter);

    const handleFilterClick = (type) => {
        setSelectedFilter(type);
        if (window.innerWidth < 768) {
            setIsDropdownOpen(false);
        }
    };

    // Typing animation
    useEffect(() => {
        const typingSpeed = 70;
        const deletingSpeed = 40;
        const pauseBeforeDeleting = 2500;
        const pauseBeforeTyping = 600;
        
        const currentPhrase = typingPhrases[currentPhraseIndex].text;
        
        if (!isDeleting && typedText === currentPhrase) {
            typingRef.current = setTimeout(() => {
                setIsDeleting(true);
            }, pauseBeforeDeleting);
        } else if (isDeleting && typedText === '') {
            setIsDeleting(false);
            setCurrentPhraseIndex((prevIndex) => 
                prevIndex === typingPhrases.length - 1 ? 0 : prevIndex + 1
            );
            
            typingRef.current = setTimeout(() => {}, pauseBeforeTyping);
        } else {
            typingRef.current = setTimeout(() => {
                if (isDeleting) {
                    setTypedText(typedText.slice(0, -1));
                } else {
                    setTypedText(currentPhrase.slice(0, typedText.length + 1));
                }
            }, isDeleting ? deletingSpeed : typingSpeed);
        }
        
        return () => {
            if (typingRef.current) clearTimeout(typingRef.current);
        };
    }, [typedText, currentPhraseIndex, isDeleting, typingPhrases]);

    // Pill position animation
    useEffect(() => {
        const updatePillPosition = () => {
            const activeBtn = document.querySelector('.filter-pill.active');
            const filterContainer = document.querySelector('.filter-pills');
            
            if (activeBtn && filterContainer && window.innerWidth >= 768) {
                const btnRect = activeBtn.getBoundingClientRect();
                const left = activeBtn.offsetLeft;
                const width = btnRect.width;
                
                filterContainer.style.setProperty('--pill-left', `${left}px`);
                filterContainer.style.setProperty('--pill-width', `${width}px`);
            }
        };
        
        updatePillPosition();
        window.addEventListener('resize', updatePillPosition);
        
        return () => {
            window.removeEventListener('resize', updatePillPosition);
        };
    }, [selectedFilter]);
    
    // Sticky filter bar
    useEffect(() => {
        const handleScroll = () => {
            if (!filterContainerRef.current || !projectsSectionRef.current) return;
            
            const filterRect = filterContainerRef.current.getBoundingClientRect();
            const sectionRect = projectsSectionRef.current.getBoundingClientRect();
            const filterOriginalTop = projectsSectionRef.current.offsetTop + 120; // Approximate position
            
            // Make sticky when in section, and not when we've scrolled past it
            if (window.scrollY >= filterOriginalTop && sectionRect.bottom >= filterRect.height + 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getTypeIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'personal':
                return <FiCode />;
            case 'academic':
                return <FiCpu />;
            case 'open source':
                return <FiStar />;
            case 'professional':
                return <FiBriefcase />;
            case 'all':
                return <FiGlobe />;
            default:
                return <FiBox />;
        }
    };

    const quotes = [
        {
          text: "The best way to predict the future is to build it. I believe in creating technology that enhances human capabilities rather than replacing them.",
          author: "Gabriel",
          title: "Software Engineer"
        },
        {
          text: "Machine learning is like teenage sex: everyone talks about it, nobody really knows how to do it, everyone thinks everyone else is doing it, so everyone claims they are doing it.",
          author: "Prof. Dan Ariely",
          title: "Behavioral Economist"
        },
        {
          text: "The question of whether computers can think is like the question of whether submarines can swim.",
          author: "Edsger W. Dijkstra",
          title: "Computer Scientist"
        },
        {
          text: "The biggest risk is not taking any risk. In a world that's changing quickly, the only strategy that is guaranteed to fail is not taking risks.",
          author: "Mark Zuckerberg",
          title: "Meta CEO"
        },
        {
          text: "The art of programming is the art of organizing complexity, of mastering multitude and avoiding its bastard chaos.",
          author: "Prof. Stephanie",
          title: "AI Research Mentor"
        }
    ];

    // Quotes rotation
    useEffect(() => {
        const quoteInterval = setInterval(() => {
          setQuoteVisible(false);
          setTimeout(() => {
            setCurrentQuoteIndex((prevIndex) => 
              prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
            );
            setQuoteVisible(true);
          }, 500);
        }, 8000);
        
        return () => clearInterval(quoteInterval);
    }, [quotes.length]);

    return (
        <div className="work-page">
            <div className="work-background">
                <div className="background-accent-1"></div>
                <div className="background-accent-2"></div>
                <div className="background-grid"></div>
            </div>
            
            <div className="work-hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        I Engineer <span className="gradient-text">Digital Solutions</span>
                    </h1>
                    <p className="hero-description">
                    Browse through my work, which highlights my abilities in software development alongside my increasing involvement in computer vision
                    </p>
                    
                    <div className="typing-container">
                        <div className="typing-icon">
                            {typingPhrases[currentPhraseIndex].icon}
                        </div>
                        <div className="typing-text">
                            <span className="typing-text-prefix">I</span>
                            <span className="typing-text-animated">
                                <span className="gradient-text">{typedText}</span>
                                <span className="typing-cursor"></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="projects-section" ref={projectsSectionRef}>
                <div className="filter-header">
                    <h2 className="section-title">Browse My Work</h2>
                    <p className="section-description">Select a category or view all projects</p>
                </div>
                
                <div className={`filter-container ${isSticky ? 'stuck' : ''}`} ref={filterContainerRef}>
                    <div className="filter-pills-wrapper">
                        <div className="filter-pills">
                            {projectTypes.map(type => (
                                <button
                                    key={type}
                                    onClick={() => handleFilterClick(type)}
                                    className={`filter-pill ${selectedFilter === type ? 'active' : ''}`}
                                >
                                    <span className="pill-icon">{getTypeIcon(type.toLowerCase())}</span>
                                    <span className="pill-text">{type}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="filter-mobile">
                        <button 
                            className="filter-dropdown-button"
                            onClick={toggleDropdown}
                            aria-expanded={isDropdownOpen}
                        >
                            <span>Filter Categories</span>
                            <FiChevronDown className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`} />
                        </button>
                        
                        <div className={`mobile-filter-dropdown ${isDropdownOpen ? 'open' : ''}`}>
                            {projectTypes.map(type => (
                                <button
                                    key={type}
                                    onClick={() => handleFilterClick(type)}
                                    className={`mobile-filter-option ${selectedFilter === type ? 'active' : ''}`}
                                >
                                    <span className="mobile-pill-icon">{getTypeIcon(type.toLowerCase())}</span>
                                    <span className="mobile-pill-text">{type}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="projects-header">
                    <div className="active-category">
                        <div className="category-icon">
                            {getTypeIcon(selectedFilter.toLowerCase())}
                        </div>
                        <h3>{selectedFilter} Projects</h3>
                    </div>
                    <span className="project-count">
                        {filteredProjects.length} Project{filteredProjects.length !== 1 ? 's' : ''}
                    </span>
                </div>
                
                <div className="projects-grid">
                    {filteredProjects.map((project, index) => (
                        <div
                        key={index}
                        className={`project-item`}>
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
                    
                    {filteredProjects.length === 0 && (
                        <div className="empty-projects">
                            <div className="empty-icon">
                                <FiSearch />
                            </div>
                            <h3>No projects in this category</h3>
                            <p>I'm currently working on adding more projects to this category. Check back soon!</p>
                            <button 
                                className="button primary" 
                                onClick={() => handleFilterClick('All')}
                            >
                                View All Projects
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="expertise-section">
                <div className="expertise-bg-elements">
                    <div className="expertise-bg-grid"></div>
                    <div className="expertise-bg-circle circle1"></div>
                    <div className="expertise-bg-circle circle2"></div>
                    <div className="expertise-bg-line line1"></div>
                    <div className="expertise-bg-line line2"></div>
                </div>
                
                <h2 className="section-title">My Expertise</h2>
                
                <div className="expertise-grid">
                    <div className="glass-card ai-card">
                        <div className="card-glow"></div>
                        <div className="card-icon">
                            <FiDatabase />
                        </div>
                        <h3>AI Systems</h3>
                        <p>I develop intelligent solutions powered by machine learning and deep learning.</p>
                    </div>
                    
                    <div className="glass-card vision-card">
                        <div className="card-glow"></div>
                        <div className="card-icon">
                            <FiCamera />
                        </div>
                        <h3>Computer Vision</h3>
                        <p>I build systems that can analyze, understand and extract insights from visual data.</p>
                    </div>
                    
                    <div className="glass-card backend-card">
                        <div className="card-glow"></div>
                        <div className="card-icon">
                            <FiCpu />
                        </div>
                        <h3>Backend Systems</h3>
                        <p>I create robust, scalable server-side applications and APIs that power modern experiences.</p>
                    </div>
                    
                    <div className="glass-card research-card">
                        <div className="card-glow"></div>
                        <div className="card-icon">
                            <FiLayers />
                        </div>
                        <h3>Research</h3>
                        <p>I apply academic insights and methodologies to solve practical real-world problems.</p>
                    </div>
                    
                    <div className="glass-card frontend-card">
                        <div className="card-glow"></div>
                        <div className="card-icon">
                            <FiCode />
                        </div>
                        <h3>Frontend Development</h3>
                        <p>I build responsive, accessible interfaces with modern frameworks and best practices.</p>
                    </div>
                    
                    <div className="glass-card ux-card">
                        <div className="card-glow"></div>
                        <div className="card-icon">
                            <FiFeather />
                        </div>
                        <h3>UX Design</h3>
                        <p>I create intuitive user experiences that balance functionality with aesthetic appeal.</p>
                    </div>
                </div>
            </div>
            
            <div className="quote-section">
                <div className="quote-background"></div>
                <div className="quote-container">
                    <div className="quote-icon">"</div>
                    <div className={`quote-text-container ${quoteVisible ? 'visible' : 'fading'}`}>
                        <blockquote>
                            {quotes[currentQuoteIndex].text}
                        </blockquote>
                    </div>
                    <div className="quote-attribution">
                        <div className="quote-attribution-avatar">
                            {quotes[currentQuoteIndex].author.charAt(0)}
                        </div>
                        <span>{quotes[currentQuoteIndex].author} • {quotes[currentQuoteIndex].title}</span>
                    </div>
                </div>
            </div>
            
            <div className="cta-container">
                <CallToAttention />
            </div>
        </div>
    );
};

export default Work;