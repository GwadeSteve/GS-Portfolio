import React from 'react'
import './LoadingPage.css'
import { ReactComponent as Gradient } from '../../assets/Gradient.svg'
import { ReactComponent as Logo } from '../../assets/Logo.svg'

const LoadingPage = () => {
    return (
        <div className='LoadingPage'>
            <div className="Loader">
                <Gradient className='Gradient Gradient-1'/>
                <Gradient className='Gradient Gradient-2'/>
                <Gradient className='Gradient Gradient-3'/>
                <Gradient className='Gradient Gradient-4'/>
                <Gradient className='Gradient Gradient-5'/>
                <Logo className='Logo'/>
            </div>
        </div>
    )
}

export default LoadingPage
