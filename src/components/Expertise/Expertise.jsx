import React from 'react';
import { useMode } from '../../context/ModeContext';
import { portfolioData } from '../../data/portfolioData';
import { withIds } from '../../utils/dataUtils';
import './Expertise.css';

const Expertise = () => {
    const { mode } = useMode();
    const skills = withIds(portfolioData.expertise, 'exp');

    return (
        <section id="expertise" className="section expertise">
            <div className="container">
                <div className="expertise-header">
                    <span className="mono-label">04 / Skills</span>
                    <h2 className="text-headline">Technical<br />Arsenal</h2>
                </div>

                <div className="expertise-grid">
                    {skills.map((group) => (
                        <div key={group.id} className="skill-card">
                            <h3 className="skill-category">{group.category}</h3>
                            <div className="skill-list">
                                {group.items.map(item => (
                                    <div key={item} className="skill-item">
                                        <span className="skill-dot"></span>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Expertise;
