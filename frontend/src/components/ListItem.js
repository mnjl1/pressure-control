import React from 'react'
import {Link} from 'react-router-dom'


let getCreatedTime = (pressure) => {
    return new Date(pressure.created).toLocaleDateString()
}

let getTitle = (pressure) => {
    let title = pressure.note.split('\n')[0]
    if (title.length > 45) {
        return title.slice(0, 45)
    }
    return title
}


const ListItem = ({pressure}) => {
    return (
        <Link to={`/pressure/${pressure.id}`}>
            <div className='pressure-list-list-item'>
                <p><span>{getCreatedTime(pressure)}</span></p>
                <h3>&#9757; {pressure.systolic_pressure}</h3>
                <h3>&#9759; {pressure.diastolic_pressure}</h3>
                <h3>&#9825; {pressure.heart_rate}</h3>
                <h3>&#9998; {getTitle(pressure)}</h3> 
            </div>
        </Link>
    )
}

export default ListItem
