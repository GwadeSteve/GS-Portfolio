import React from 'react'
import './CallToAttention.css'
import {ReactComponent as Grad} from '../../assets/Gradient.svg'

const CallToAttention = () => {
  return (
    <div className='CallToAttention'>
        <Grad/>
        <p className="xxl-font">Let's <span className="gradient-text">Connect,</span></p>
        <p className="xxl-font"><span className="gradient-text">Collaborate </span>With Me</p>
        <p className="s-font">Interested in discussing a project or initiating a professional collaboration, I'm eager to connect with you.</p>
        <div className="call-btns">
            <a href="/request" className="ss-font full">
                Project Request
            </a>
            <a href="/request" className="ss-font empty">
                Contact Me
            </a>
        </div>
    </div>
  )
}

export default CallToAttention