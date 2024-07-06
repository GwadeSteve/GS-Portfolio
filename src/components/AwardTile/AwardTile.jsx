import React from 'react'
import './AwardTile.css'

const AwardTile = ({Competition, Position, Description, Icon}) => {

    return (
        <div className='AwardTile'>
            <div className="Comp-Icon">
                <img src={Icon} alt={Competition} />
            </div>
            <div className="Details">
                <p className="l-font">{Competition}</p>
                <p className="m-font">{Position}</p>
            </div>
            <p className="s-font">{Description}</p>
        </div>
    )
}

export default AwardTile