import React from 'react'
import './Footer.css'
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { ReactComponent as Line } from '../../assets/Line.svg';
import {ReactComponent as GitHub} from '../../assets/github.svg'
import {ReactComponent as LinkedIn} from '../../assets/linkedin-circle-mono.svg'
import {ReactComponent as FaceBook} from '../../assets/facebook-circle-mono.svg'
import {ReactComponent as Instagram} from '../../assets/instagram-circle-mono.svg'
import {ReactComponent as WhatsApp} from '../../assets/whatsapp-circle-mono.svg'
import { NavLink, Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className='Footer'>
        <Logo className='Logo'/>
        <div className="PageLinks">
            <NavLink to='/' exact className='sss-font' activeClassName='active'>Home</NavLink>
            <NavLink to='/about' className='sss-font' activeClassName='active'>About</NavLink>
            <NavLink to='/work' className='sss-font' activeClassName='active'>Works</NavLink>
            <NavLink to='/request' className='sss-font' activeClassName='active'>Project Request</NavLink>
        </div>
        <Line className='Line'/>
        <div className="Bottom">
            <div className="icos">
                <Link to="https://github.com">
                    <GitHub/>
                </Link>
                <Link to="https://linkedin.com">
                    <LinkedIn/>
                </Link>
                <Link to="https://instagram.com">
                    <Instagram/>
                </Link>
                <Link to="https://facebook.com">
                    <FaceBook/>
                </Link>
                <Link to="https://whatsapp.com">
                    <WhatsApp/>
                </Link>
            </div>
            <p className="sss-font">© 2024 Gwade Steve. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer