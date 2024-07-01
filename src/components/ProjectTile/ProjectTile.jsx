import React from 'react'
import './ProjectTile.css'
import {ReactComponent as Live} from '../../assets/Live.svg'
import Tool from '../Tool/Tool'

const ProjectTile = ({ type, title, description, link_live, link_github, image, tools }) => {
    return (
        <div className='ProjectTile'>
            <div className="Img-Description">
                <div className="Img-box">
                    <img src={image} alt={title} />
                </div>
            </div>
            <div className="Description">
                <p className="sss-font">{type}</p>
                <p className="l-font">{title}</p>
                <p className="s-font">{description}</p>
                <div className="project-links">
                    {
                        link_live && (
                            <a href={link_live} className='gradient-text bold-text s-font'>Live<Live/></a>
                        )
                    }
                    {
                        link_github && (
                            <a href={link_github} className='gradient-text bold-text s-font'>Github</a>
                        )
                    }
                </div>
                <div className="tools">
                    {
                        tools.map((tool, index) => (
                            <Tool key={index} Text={tool} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ProjectTile
