import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogData as rawData } from '../../data/blogData';
import { withIds } from '../../utils/dataUtils';
import { FaArrowLeft, FaChevronLeft, FaChevronRight, FaCalendarAlt, FaClock } from 'react-icons/fa';
import './Blog.css';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const blogData = React.useMemo(() => withIds(rawData, 'b'), []);

    const [post, setPost] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Effect to handle post loading and SCROLL RESET
    useEffect(() => {
        const foundPost = blogData.find(p => p.id === id);
        if (foundPost) {
            setPost(foundPost);
            setImageLoaded(false); // Reset image state
            // Explicit scroll to top when mounting a new post
            window.scrollTo(0, 0);
        } else {
            navigate('/blog');
        }
    }, [id, blogData, navigate]);

    if (!post) return <div className="blog-page section"></div>;

    // Navigation Logic
    const currentIndex = blogData.findIndex(p => p.id === post.id);
    const prevPost = currentIndex > 0 ? blogData[currentIndex - 1] : null;
    const nextPost = currentIndex < blogData.length - 1 ? blogData[currentIndex + 1] : null;

    const renderContent = (block, idx) => {
        switch (block.type) {
            case 'p': return <p key={idx}>{block.text}</p>;
            case 'h3': return <h3 key={idx}>{block.text}</h3>;
            case 'ul': return <ul key={idx} className="article-list bullet">{block.items.map((item, i) => <li key={i}>{item}</li>)}</ul>;
            case 'ol': return <ol key={idx} className="article-list numbered">{block.items.map((item, i) => <li key={i}>{item}</li>)}</ol>;
            case 'quote': return <blockquote key={idx} className="article-quote">{block.text}</blockquote>;
            case 'code': return <pre key={idx} className="article-code"><code>{block.text}</code></pre>;
            default: return null;
        }
    };

    return (
        <div className="blog-page section article-view">
            <div className="container">
                <button onClick={() => navigate('/blog')} className="back-btn">
                    <FaArrowLeft /> Back to Insights
                </button>

                <article className="full-article">
                    <div className="article-header">
                        <div className="article-meta-top">
                            <span className="article-category">{post.category}</span>
                            <span className="article-date">{post.date}</span>
                            <span className="article-read-time">{post.readTime}</span>
                        </div>
                        <h1 className="article-title">{post.title}</h1>

                        {/* ROBUST IMAGE WRAPPER */}
                        <div className="article-image-wrapper">
                            {/* Skeleton Layer - Always rendered behind */}
                            <div className="skeleton-bg">
                                <div className="skeleton-shimmer"></div>
                            </div>

                            <img
                                src={post.image}
                                alt={post.title}
                                className={`article-hero-image ${imageLoaded ? 'loaded' : ''}`}
                                onLoad={() => setImageLoaded(true)}
                            />
                        </div>
                    </div>

                    <div className="article-body">
                        {post.content.map((block, idx) => renderContent(block, idx))}
                    </div>

                    <div className="article-footer">
                        <div className="tags-list">
                            {post.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
                        </div>
                    </div>

                    <div className="article-nav">
                        {prevPost ? (
                            <button onClick={() => navigate(`/blog/${prevPost.id}`)} className="nav-btn prev">
                                <FaChevronLeft />
                                <div className="nav-text">
                                    <span className="nav-label">Previous</span>
                                    <span className="nav-title">{prevPost.title}</span>
                                </div>
                            </button>
                        ) : <div className="nav-spacer" />}

                        {nextPost ? (
                            <button onClick={() => navigate(`/blog/${nextPost.id}`)} className="nav-btn next">
                                <div className="nav-text">
                                    <span className="nav-label">Next</span>
                                    <span className="nav-title">{nextPost.title}</span>
                                </div>
                                <FaChevronRight />
                            </button>
                        ) : <div className="nav-spacer" />}
                    </div>
                </article>
            </div>
        </div>
    );
};

export default BlogPost;
