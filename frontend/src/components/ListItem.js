import React from 'react'
import {Link} from 'react-router-dom'


const ListItem = ({pressure}) => {
    return (
        <Link to={`/pressure/${pressure.id}`}>
            <div className='pressure-list-list-item'>
                <h3>{pressure.created}</h3>
                <h3>&#9757; {pressure.systolic_pressure}</h3>
                <h3>&#9759; {pressure.diastolic_pressure}</h3>
                <h3>&#9825; {pressure.heart_rate}</h3>
                <h3>&#9998; {pressure.note}</h3>
                
            </div>
        </Link>
    )
}

export default ListItem
