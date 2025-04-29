import React, { useState, useEffect, useCallback } from 'react';
import './Request.css';
import { useNavigate, Link } from 'react-router-dom';
import { 
    FiUser, FiMail, FiMessageSquare, FiArrowRight, FiCheck, FiLoader, 
    FiSend, FiPhone, FiBriefcase, FiDollarSign, FiClock, 
    FiLink, FiGlobe, FiHeart, FiList, FiCpu, FiX, FiArrowLeft, FiHome
} from 'react-icons/fi';

const Request = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        projectType: 'web-development',
        budget: '',
        timeline: '',
        projectDescription: '',
        referralSource: '',
        contactPreference: 'email',
    });
    
    const [currentStep, setCurrentStep] = useState(1);
    const [isSending, setIsSending] = useState(false);
    const [requestStatus, setRequestStatus] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [isStepValid, setIsStepValid] = useState(false);
    const navigate = useNavigate();
    
    const totalSteps = 5;

    const projectTypes = [
        { id: 'web-development', label: 'Web Development' },
        { id: 'mobile-app', label: 'Mobile App' },
        { id: 'ai-solution', label: 'AI Solution' },
        { id: 'data-analysis', label: 'Data Analysis' },
        { id: 'consulting', label: 'Consulting' },
        { id: 'other', label: 'Other' }
    ];

    const timelineOptions = [
        { id: 'urgent', label: 'Urgent (< 1 month)' },
        { id: 'standard', label: '1-3 months' },
        { id: 'relaxed', label: '3-6 months' },
        { id: 'flexible', label: 'Flexible' }
    ];

    const budgetOptions = [
        { id: 'small', label: 'Under $5,000' },
        { id: 'medium', label: '$5,000 - $15,000' },
        { id: 'large', label: '$15,000 - $50,000' },
        { id: 'enterprise', label: 'Over $50,000' },
        { id: 'discuss', label: 'To be discussed' }
    ];

    const contactOptions = [
        { id: 'email', label: 'Email' },
        { id: 'phone', label: 'Phone' }
    ];

    const referralOptions = [
        { id: 'search', label: 'Search Engine' },
        { id: 'social', label: 'Social Media' },
        { id: 'reference', label: 'Personal Reference' },
        { id: 'article', label: 'Article or Blog' },
        { id: 'other', label: 'Other' }
    ];

    const validateCurrentStep = useCallback(() => {
        const errors = {};
        let valid = true;

        switch (currentStep) {
            case 1: 
                if (!formData.fullName.trim()) {
                    errors.fullName = "Name is required";
                    valid = false;
                } else if (formData.fullName.trim().length < 3) {
                    errors.fullName = "Name must be at least 3 characters";
                    valid = false;
                }
                
                if (!formData.email.trim()) {
                    errors.email = "Email is required";
                    valid = false;
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                    errors.email = "Please enter a valid email address";
                    valid = false;
                }

                if (formData.phone && !/^\+?[0-9\s()-]{8,}$/.test(formData.phone)) {
                    errors.phone = "Please enter a valid phone number";
                    valid = false;
                }
                break;
                
            case 2: 
                if (!formData.projectType) {
                    errors.projectType = "Please select a project type";
                    valid = false;
                }
                break;
                
            case 3: 
                if (!formData.budget) {
                    errors.budget = "Please select a budget range";
                    valid = false;
                }
                
                if (!formData.timeline) {
                    errors.timeline = "Please select a timeline";
                    valid = false;
                }
                break;
                
            case 4: 
                if (!formData.projectDescription.trim()) {
                    errors.projectDescription = "Project description is required";
                    valid = false;
                } else if (formData.projectDescription.trim().length < 20) {
                    errors.projectDescription = "Please provide more details (at least 20 characters)";
                    valid = false;
                }
                break;
                
            case 5: 
                // This step is optional, so no validation required
                break;
                
            default:
                break;
        }

        setFormErrors(errors);
        setIsStepValid(valid);
        return valid;
    }, [currentStep, formData]);

    // Validate whenever step or form data changes
    useEffect(() => {
        validateCurrentStep();
    }, [validateCurrentStep]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const nextStep = () => {
        if (isStepValid && currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isStepValid) return;
        
        setIsSending(true);
        
        try {
            const response = await fetch('https://emailbackend-portfolio.onrender.com/api/sendmail/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                setRequestStatus('success');
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                console.error('Request failed with status:', response.status);
                setRequestStatus('failure');
                setIsSending(false);
            }
        } catch (error) {
            console.error('Request error:', error);
            setRequestStatus('failure');
            setIsSending(false);
        }
    };

    const progress = (currentStep / totalSteps) * 100;

    const getStepClassName = (step) => {
        if (step === currentStep) return "form-step active";
        if (step < currentStep) return "form-step completed";
        return "form-step";
    };

    // Get step title
    const getStepTitle = () => {
        switch (currentStep) {
            case 1:
                return "Let's start with your basic info";
            case 2:
                return "What type of project are you looking for?";
            case 3:
                return "Tell me about your budget and timeline";
            case 4:
                return "Describe your project in detail";
            case 5:
                return "Almost done! Just a few more details";
            default:
                return "";
        }
    };

    const getStepIcon = (step) => {
        switch (step) {
            case 1:
                return <FiUser />;
            case 2:
                return <FiBriefcase />;
            case 3:
                return <FiDollarSign />;
            case 4:
                return <FiMessageSquare />;
            case 5:
                return <FiList />;
            default:
                return <FiCheck />;
        }
    };

    return (
        <div className="request-page">
            {/* Enhanced unified navigation */}
            <div className="request-nav">
                <div className="nav-left">
                    <Link to="/" className="nav-home-btn">
                        <FiHome />
                        <span>Home</span>
                    </Link>
                    
                    {currentStep > 1 && (
                        <button 
                            className="nav-back-btn"
                            onClick={prevStep}
                            disabled={isSending}
                        >
                            <FiArrowLeft />
                            <span>Back</span>
                        </button>
                    )}
                </div>
                
                <div className="nav-title">Project Request</div>
                
                <button className="nav-close-btn" onClick={() => navigate('/')}>
                    <FiX />
                </button>
            </div>
            
            {/* Background Elements */}
            <div className="request-background">
                <div className="animated-grid"></div>
                <div className="background-glow"></div>
                <div className="floating-particles">
                    {[...Array(20)].map((_, i) => (
                        <div 
                            key={i} 
                            className="particle" 
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${5 + Math.random() * 10}s`
                            }}
                        ></div>
                    ))}
                </div>
            </div>
            
            {/* Main Form Container */}
            <div className="request-container glass-form">
                <div className="request-header">
                    <h1>Let's Work <span className="gradient-text">Together</span></h1>
                    <p>Tell me about your project and I'll get back to you soon.</p>
                    
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                        <div className="steps-indicator">
                            {Array.from({ length: totalSteps }, (_, i) => (
                                <div 
                                    key={i} 
                                    className={`step-dot ${currentStep > i + 1 ? 'completed' : ''} ${currentStep === i + 1 ? 'active' : ''}`}
                                >
                                    {currentStep > i + 1 ? <FiCheck /> : getStepIcon(i + 1)}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <h2 className="step-title">{getStepTitle()}</h2>
                </div>
                
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className={getStepClassName(1)}>
                            <div className="input-group">
                                <label htmlFor="fullName">
                                    <div className="label-icon"><FiUser /></div>
                                    <span>Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className={formErrors.fullName ? "error" : ""}
                                    disabled={isSending}
                                />
                                {formErrors.fullName && (
                                    <div className="error-message">{formErrors.fullName}</div>
                                )}
                            </div>
                            
                            <div className="input-group">
                                <label htmlFor="email">
                                    <div className="label-icon"><FiMail /></div>
                                    <span>Email Address</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={formErrors.email ? "error" : ""}
                                    disabled={isSending}
                                />
                                {formErrors.email && (
                                    <div className="error-message">{formErrors.email}</div>
                                )}
                            </div>
                            
                            <div className="input-group">
                                <label htmlFor="phone">
                                    <div className="label-icon"><FiPhone /></div>
                                    <span>Phone Number <span className="optional">(Optional)</span></span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={formErrors.phone ? "error" : ""}
                                    disabled={isSending}
                                />
                                {formErrors.phone && (
                                    <div className="error-message">{formErrors.phone}</div>
                                )}
                            </div>
                        </div>
                        
                        {/* Step 2: Project Type */}
                        <div className={getStepClassName(2)}>
                            <div className="input-group">
                                <label>
                                    <div className="label-icon"><FiBriefcase /></div>
                                    <span>Project Type</span>
                                </label>
                                <div className="options-grid">
                                    {projectTypes.map(type => (
                                        <div 
                                            key={type.id} 
                                            className={`option-card ${formData.projectType === type.id ? 'selected' : ''}`}
                                            onClick={() => handleInputChange({
                                                target: { name: 'projectType', value: type.id }
                                            })}
                                        >
                                            <div className="option-icon">
                                                {type.id === 'web-development' && <FiGlobe />}
                                                {type.id === 'mobile-app' && <FiSmartphone />}
                                                {type.id === 'ai-solution' && <FiCpu />}
                                                {type.id === 'data-analysis' && <FiBarChart />}
                                                {type.id === 'consulting' && <FiUsers />}
                                                {type.id === 'other' && <FiMoreHorizontal />}
                                            </div>
                                            <div className="option-label">{type.label}</div>
                                        </div>
                                    ))}
                                </div>
                                {formErrors.projectType && (
                                    <div className="error-message">{formErrors.projectType}</div>
                                )}
                            </div>
                        </div>
                        
                        {/* Step 3: Budget and Timeline */}
                        <div className={getStepClassName(3)}>
                            <div className="input-group">
                                <label>
                                    <div className="label-icon"><FiDollarSign /></div>
                                    <span>Project Budget</span>
                                </label>
                                <div className="radio-options budget-options">
                                    {budgetOptions.map(option => (
                                        <div key={option.id} className="radio-option">
                                            <input
                                                type="radio"
                                                id={`budget-${option.id}`}
                                                name="budget"
                                                value={option.id}
                                                checked={formData.budget === option.id}
                                                onChange={handleInputChange}
                                                disabled={isSending}
                                            />
                                            <label htmlFor={`budget-${option.id}`}>{option.label}</label>
                                        </div>
                                    ))}
                                </div>
                                {formErrors.budget && (
                                    <div className="error-message">{formErrors.budget}</div>
                                )}
                            </div>
                            
                            <div className="input-group">
                                <label>
                                    <div className="label-icon"><FiClock /></div>
                                    <span>Project Timeline</span>
                                </label>
                                <div className="radio-options timeline-options">
                                    {timelineOptions.map(option => (
                                        <div key={option.id} className="radio-option">
                                            <input
                                                type="radio"
                                                id={`timeline-${option.id}`}
                                                name="timeline"
                                                value={option.id}
                                                checked={formData.timeline === option.id}
                                                onChange={handleInputChange}
                                                disabled={isSending}
                                            />
                                            <label htmlFor={`timeline-${option.id}`}>{option.label}</label>
                                        </div>
                                    ))}
                                </div>
                                {formErrors.timeline && (
                                    <div className="error-message">{formErrors.timeline}</div>
                                )}
                            </div>
                        </div>
                        
                        {/* Step 4: Project Description */}
                        <div className={getStepClassName(4)}>
                            <div className="input-group">
                                <label htmlFor="projectDescription">
                                    <div className="label-icon"><FiMessageSquare /></div>
                                    <span>Project Description</span>
                                </label>
                                <textarea
                                    id="projectDescription"
                                    name="projectDescription"
                                    placeholder="Describe your project needs, goals, features, challenges, etc..."
                                    rows="6"
                                    value={formData.projectDescription}
                                    onChange={handleInputChange}
                                    className={formErrors.projectDescription ? "error" : ""}
                                    disabled={isSending}
                                />
                                <div className="character-count">
                                    {formData.projectDescription.length} / 500 characters
                                    {formData.projectDescription.length >= 20 ? 
                                        <span className="valid-indicator"><FiCheck /></span> : 
                                        <span className="min-chars">min. 20</span>
                                    }
                                </div>
                                {formErrors.projectDescription && (
                                    <div className="error-message">{formErrors.projectDescription}</div>
                                )}
                            </div>
                        </div>
                        
                        <div className={getStepClassName(5)}>
                            <div className="input-group">
                                <label>
                                    <div className="label-icon"><FiHeart /></div>
                                    <span>Preferred Contact Method</span>
                                </label>
                                <div className="radio-options horizontal">
                                    {contactOptions.map(option => (
                                        <div key={option.id} className="radio-option">
                                            <input
                                                type="radio"
                                                id={`contact-${option.id}`}
                                                name="contactPreference"
                                                value={option.id}
                                                checked={formData.contactPreference === option.id}
                                                onChange={handleInputChange}
                                                disabled={isSending}
                                            />
                                            <label htmlFor={`contact-${option.id}`}>{option.label}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="input-group">
                                <label>
                                    <div className="label-icon"><FiLink /></div>
                                    <span>How did you find me? <span className="optional">(Optional)</span></span>
                                </label>
                                <select
                                    name="referralSource"
                                    value={formData.referralSource}
                                    onChange={handleInputChange}
                                    disabled={isSending}
                                >
                                    <option value="">Please select one</option>
                                    {referralOptions.map(option => (
                                        <option key={option.id} value={option.id}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        <div className="form-actions">
                            {currentStep > 1 && (
                                <button 
                                    type="button" 
                                    className="button secondary" 
                                    onClick={prevStep}
                                    disabled={isSending}
                                >
                                    <span className="btn-icon-back">←</span>
                                    Back
                                </button>
                            )}
                            
                            {currentStep < totalSteps && (
                                <button 
                                    type="button" 
                                    className="button primary" 
                                    onClick={nextStep}
                                    disabled={!isStepValid || isSending}
                                >
                                    Continue
                                    <FiArrowRight className="btn-icon" />
                                </button>
                            )}
                            
                            {currentStep === totalSteps && (
                                <button 
                                    type="submit" 
                                    className="button primary"
                                    disabled={!isStepValid || isSending}
                                >
                                    {isSending ? (
                                        <>
                                            <FiLoader className="spinner" /> Sending...
                                        </>
                                    ) : (
                                        <>
                                            Submit Request <FiSend />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                    
                    {requestStatus === 'success' && (
                        <div className="success-message">
                            <div className="success-icon"><FiCheck /></div>
                            <h3>Request Sent Successfully!</h3>
                            <p>Thank you for your interest. I'll review your project details and get back to you soon.</p>
                            <div className="pulse-rings"></div>
                        </div>
                    )}
                    
                    {requestStatus === 'failure' && (
                        <div className="error-notification">
                            <h3>Something went wrong!</h3>
                            <p>There was an error sending your request. Please try again or contact me directly.</p>
                            <button 
                                type="button" 
                                className="btn-secondary" 
                                onClick={() => setRequestStatus('')}
                            >
                                Try Again
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const FiSmartphone = () => <FiPhone />;
const FiBarChart = () => <FiClock />;
const FiUsers = () => <FiUser />;
const FiMoreHorizontal = () => <div style={{fontSize: '1.5rem'}}>...</div>;

export default Request;