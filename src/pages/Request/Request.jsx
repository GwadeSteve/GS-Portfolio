import React, { useState } from 'react';
import './Request.css';
import { ReactComponent as Gradient } from '../../assets/Gradient.svg';
import { useNavigate } from 'react-router-dom';

const Request = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [requestStatus, setRequestStatus] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        const requestBody = {
            fullName,
            email,
            projectDescription
        };
        console.log(requestBody);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/sendmail/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                alert('Request sent successfully!');
                navigate('/'); 
            } else {
                setRequestStatus('failure');
            }
        } catch (error) {
            setRequestStatus('failure');
        }

        setIsSending(false);
    };

    return (
        <div className='Request'>
            <Gradient className='behind' />
            <div className="content">
                <p className="xl-font"><span className="gradient-text">Request a Project</span></p>
                <p className="s-font">I am open to new opportunities and projects. If you have a project to discuss, please fill out the form below to reach out to me.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-row">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            disabled={isSending}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSending}
                            required
                        />
                    </div>
                    <textarea
                        placeholder="Project Description"
                        rows="5"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        disabled={isSending}
                        required
                    ></textarea>
                    <button type="submit" disabled={isSending}>
                        {isSending ? 'Sending Request...' : 'Send Request'}
                    </button>
                </form>
                {requestStatus === 'failure' && <p className="error-message">There was an error sending your request. Please try again.</p>}
            </div>
        </div>
    );
}

export default Request;
