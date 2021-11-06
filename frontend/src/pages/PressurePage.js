import React, {useState, useEffect, useContext} from 'react'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import AuthContext from '../context/AuthContext';
import axios from 'axios'

const PressurePage = ({ match, history }) => {

    let pressureId = match.params.id
    let [pressure, setPressure] = useState(null)
    let [city, setCity] = useState('')
    let {authTokens} = useContext(AuthContext)
    


    useEffect(() => {
        getClientCity()
        getPressure()
    }, [pressureId])

    let getClientCity = async () => {
        let info = await axios.get('https://geolocation-db.com/json/'
        )
        setCity(info.data.city)
    }

    let getPressure = async () => {
        if (pressureId === 'new') return

        let response = await fetch(`/api/pressure/${pressureId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setPressure(data)
        console.log('Pressure', data)
    }

    let createPressure = async () => {
        setPressure(pressure['city'] = city)
        fetch(`/api/pressure/create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify(pressure)
        })
    }


    let updatePressure = async () => {
        fetch(`/api/pressure/${pressureId}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
                },
            body: JSON.stringify(pressure)
        })
    }

    // TODO Implement 'Are you sure you want to delete? y/n'
    let deletePressure = async () => {
        fetch(`/api/pressure/${pressureId}/delete/`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
                
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

    let handleSystolicPressureChange = (value) => {
        setPressure(pressure => ({ ...pressure, 'systolic_pressure': value }))
    }

    let handleDiastolicPressureChange = (value) => {
        setPressure(pressure => ({ ...pressure, 'diastolic_pressure': value }))
    }

    let handleHeartRateChange = (value) => {
        setPressure(pressure => ({ ...pressure, 'heart_rate': value }))
    }

    let handleNoteChange = (value) => {
        setPressure(pressure => ({ ...pressure, 'note': value}))
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
                <h1>{pressure?.created}</h1>
                <p>&#9757;Systolic Pressure</p>
                <input onChange={(e) => {handleSystolicPressureChange(e.target.value)}} value={pressure?.systolic_pressure} />
                <p>&#9759;Diastolic Pressure</p>
                <input onChange={(e) => {handleDiastolicPressureChange(e.target.value)}} value={pressure?.diastolic_pressure} />
                <p>&#9825;Heart rate</p>
                <input onChange={(e) => {handleHeartRateChange(e.target.value)}} value={pressure?.heart_rate} />
                <br/>
                <p>&#9998;Note...</p>
                <textarea onChange={(e) => {handleNoteChange(e.target.value)}} value={pressure?.note}></textarea>
            </div>
            <div>
            
            </div>
        </div>
    )
}

export default PressurePage
