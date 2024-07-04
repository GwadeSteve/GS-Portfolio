import React from 'react'
import './Experience.css'

const Experience = ({company_logo, company_name, Period, Role}) => {
    return (
        <div className='Experience'>
            <div className="header">
                <div className="logo-container">
                    <img src={company_logo} alt={company_name} />
                </div>
                <p className="s-font">{company_name}</p>
            </div>
            <p className="ss-font period">{Period}</p>
            <p className="ss-font role">{Role}</p>
        </div>
    )
}

export default Experience