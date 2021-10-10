import React, {useState, useEffect} from 'react'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const PressurePage = ({ match, history }) => {

    let pressureId = match.params.id
    let [pressure, setPressure] = useState(null)


    useEffect(() => {
        get_pressure()
    }, [pressureId])


    let get_pressure = async () => {
        let response = await fetch(`/api/pressure/${pressureId}/`)
        let data = await response.json()
        setPressure(data)
    }


    let update_pressure = async () => {
        fetch(`/api/pressure/${pressureId}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pressure)
        })

    }


    let handleSubmit = () => {
        update_pressure()
        history.push('/')
    }


    return (
        <div className='pressure'>
            <div className="pressure-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                
            </div>
            <div>
                <h3>{pressure?.created}</h3>
                <h3>Systolic Pressure: {pressure?.systolic_pressure}</h3>
                <h3>Diastolic Pressure: {pressure?.diastolic_pressure}</h3>
                <h3>Heart Rate: {pressure?.heart_rate}</h3>
                <br/>
                <p>&#9998;Note...</p>
                <textarea onChange={(e) => {setPressure({...pressure, 'note': e.target.value })}} defaultValue={pressure?.note}></textarea>
            </div>
            <div>
                Weather data
            </div>
        </div>
    )
}

export default PressurePage
