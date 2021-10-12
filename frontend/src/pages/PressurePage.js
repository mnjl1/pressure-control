import React, {useState, useEffect} from 'react'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const PressurePage = ({ match, history }) => {

    let pressureId = match.params.id
    let [pressure, setPressure] = useState(null)


    useEffect(() => {
        getPressure()
    }, [pressureId])


    let getPressure = async () => {
        if (pressureId === 'new') return

        let response = await fetch(`/api/pressure/${pressureId}/`)
        let data = await response.json()
        setPressure(data)
    }

    let createPressure = async () => {
        fetch(`/api/pressure/create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pressure)
        })
    }


    let updatePressure = async () => {
        fetch(`/api/pressure/${pressureId}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pressure)
        })
    }

    // TODO Implement 'Are you sure you want to delete? y/n'
    let deletePressure = async () => {
        fetch(`/api/pressure/${pressureId}/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        history.push('/')
    }


    let handleSubmit = () => {
        if (pressureId !== 'new' && pressure.note === '') {
            deletePressure()
        } else if (pressureId !== 'new') {
            updatePressure()
        } else if (pressureId === 'new' && pressure.note !== null) {
            createPressure()
        }
        history.push('/')
    }

    let handleChange = (value) => {
        setPressure(pressure => ({ ...pressure, 'note': value }))
        console.log('Change', pressure)
    }


    return (
        <div className='pressure'>
            <div className="pressure-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {pressureId !== "new" ? (
                    <button onClick={deletePressure}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
                
            </div>
            <div>
                <h3>{pressure?.created}</h3>
                <h3>Systolic Pressure: {pressure?.systolic_pressure}</h3>
                <h3>Diastolic Pressure: {pressure?.diastolic_pressure}</h3>
                <h3>Heart Rate: {pressure?.heart_rate}</h3>
                <br/>
                <p>&#9998;Note...</p>
                <textarea onChange={(e) => {handleChange(e.target.value)}} value={pressure?.note}></textarea>
            </div>
            <div>
                Weather data
            </div>
        </div>
    )
}

export default PressurePage
