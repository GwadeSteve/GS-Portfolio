import React, { useState } from 'react';
import './Request.css';
import { ReactComponent as Gradient } from '../../assets/Gradient.svg';

const Request = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [requestStatus, setRequestStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        setTimeout(() => {
            const isSuccess = Math.random() < 0.5; 

            if (isSuccess) {
                setRequestStatus('success');
            } else {
                setRequestStatus('failure');
            }

            setIsSending(false);
        }, 1500); 
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
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <textarea
                        placeholder="Project Description"
                        rows="5"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit" disabled={isSending || requestStatus === 'success'}>
                        {isSending ? 'Sending Request...' : requestStatus === 'success' ? 'Request Sent!' : 'Send Request'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Request;
