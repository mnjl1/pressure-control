import React from 'react'
import {Link} from 'react-router-dom'


const ListItem = ({pressure}) => {
    return (
        <Link to={`/pressure/${pressure.id}`}>
            <div className='pressure-list-list-item'>
                <h3>{pressure.note}</h3>
            </div>
        </Link>
    )
}

export default ListItem
