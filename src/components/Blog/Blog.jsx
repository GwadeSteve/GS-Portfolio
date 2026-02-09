import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogData as rawData } from '../../data/blogData';
import { withIds } from '../../utils/dataUtils';
import {
    FaArrowRight,
    FaArrowLeft,
    FaCalendarAlt,
    FaClock,
    FaChevronLeft,
    FaChevronRight
} from 'react-icons/fa';
import './Blog.css';

// --- Sub-Component: Skeleton Image ---
const SkeletonImage = ({ src, alt, className }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={`card-image-container ${className}`}>
            {!loaded && (
                <div className="skeleton-wrapper">
                    <div className="skeleton-shimmer"></div>
                </div>
            )}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className={`card-image ${loaded ? 'loaded' : ''}`}
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
};

const Blog = () => {
    // 1. Setup Data & Routing
    const navigate = useNavigate();
    const { id } = useParams();
    const blogData = withIds(rawData, 'b');

    // 2. State
    const [filter, setFilter] = useState('All');

    // 3. Derived State
    const activePost = id ? blogData.find(p => p.id === id) : null;
    const categories = ['All', ...new Set(blogData.map(p => p.category))];
    const filteredPosts = filter === 'All'
        ? blogData
        : blogData.filter(p => p.category === filter);

    // 4. Navigation Helpers
    const goHome = () => navigate('/');
    const goBlogHome = () => navigate('/blog');
    const goToPost = (postId) => navigate(`/blog/${postId}`);

    // 5. Scroll Fix happens via <ScrollToTop /> in App.jsx, 
    // but we can enforce strict reset here if needed.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]); // Reset whenever ID changes

    // --- RENDER: ARTICLE VIEW ---
    if (activePost) {
        const currentIndex = blogData.findIndex(p => p.id === activePost.id);
        const prevPost = currentIndex > 0 ? blogData[currentIndex - 1] : null;
        const nextPost = currentIndex < blogData.length - 1 ? blogData[currentIndex + 1] : null;

        return (
            <div className="blog-page section">
                <div className="container article-container">
                    <button onClick={goBlogHome} className="blog-back-btn">
                        <FaArrowLeft /> Back to Insights
                    </button>

                    {/* Article Header */}
                    <div className="article-header">
                        <div className="article-meta">
                            <span>{activePost.category}</span>
                            <span>•</span>
                            <span>{activePost.date}</span>
                            <span>•</span>
                            <span>{activePost.readTime}</span>
                        </div>
                        <h1 className="article-hero-title">{activePost.title}</h1>
                        <div className="article-hero-image-wrapper">
                            <SkeletonImage src={activePost.image} alt={activePost.title} />
                        </div>
                    </div>

                    {/* Article Content */}
                    <article className="article-content">
                        {activePost.content.map((block, idx) => {
                            switch (block.type) {
                                case 'p': return <p key={idx}>{block.text}</p>;
                                case 'h3': return <h3 key={idx}>{block.text}</h3>;
                                case 'ul': return <ul key={idx}>{block.items.map((it, i) => <li key={i}>{it}</li>)}</ul>;
                                case 'ol': return <ol key={idx}>{block.items.map((it, i) => <li key={i}>{it}</li>)}</ol>;
                                case 'quote': return <blockquote key={idx} className="article-quote">{block.text}</blockquote>;
                                case 'code': return <pre key={idx} className="article-code"><code>{block.text}</code></pre>;
                                default: return null;
                            }
                        })}
                    </article>

                    {/* Tags */}
                    <div className="article-tags">
                        {activePost.tags.map(tag => (
                            <span key={tag} className="tag-badge">#{tag}</span>
                        ))}
                    </div>

                    {/* Navigation Cards */}
                    <div className="nav-grid">
                        {prevPost ? (
                            <div className="nav-card prev" onClick={() => goToPost(prevPost.id)}>
                                <FaChevronLeft />
                                <div>
                                    <span className="nav-label">Previous Article</span>
                                    <span className="nav-title">{prevPost.title}</span>
                                </div>
                            </div>
                        ) : <div className="nav-spacer" />}

                        {nextPost ? (
                            <div className="nav-card next" onClick={() => goToPost(nextPost.id)}>
                                <div>
                                    <span className="nav-label">Next Article</span>
                                    <span className="nav-title">{nextPost.title}</span>
                                </div>
                                <FaChevronRight />
                            </div>
                        ) : <div className="nav-spacer" />}
                    </div>

                    {/* Bottom Back Button */}
                    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                        <button onClick={goBlogHome} className="blog-back-btn">
                            <FaArrowLeft /> View All Articles
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- RENDER: LIST VIEW ---
    return (
        <div className="blog-page section">
            <div className="container">
                {/* Header */}
                <div className="blog-header-section">
                    <button onClick={goHome} className="blog-back-btn">
                        <FaArrowLeft /> Home
                    </button>
                    <h1 className="blog-main-title">Insights & Thoughts</h1>
                    <p className="blog-subtitle">Exploring the intersection of AI Research and System Architecture.</p>
                </div>

                {/* Filters */}
                <div className="blog-filters-container">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="blog-grid">
                    {filteredPosts.map(post => (
                        <article key={post.id} className="blog-card" onClick={() => goToPost(post.id)}>
                            <div style={{ position: 'relative' }}>
                                <SkeletonImage src={post.image} alt={post.title} />
                                <span className="category-badge">{post.category}</span>
                            </div>

                            <div className="card-content">
                                <div className="card-meta">
                                    <span><FaCalendarAlt /> {post.date}</span>
                                    <span>•</span>
                                    <span><FaClock /> {post.readTime}</span>
                                </div>
                                <h2 className="card-title">{post.title}</h2>
                                <p className="card-excerpt">{post.excerpt}</p>
                                <div className="card-footer">
                                    Read Article <FaArrowRight className="card-arrow" />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
