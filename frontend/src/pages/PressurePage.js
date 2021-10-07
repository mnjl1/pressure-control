import React, {useState, useEffect} from 'react'

const PressurePage = ({ match }) => {

    let pressureId = match.params.id
    let [pressure, setPressure] = useState(null)

    let getPressure = async () => {
        let response = await fetch(`/api/pressure/${pressureId}/`)
        let data = await response.json()
        setPressure(data)
    }

    useEffect(() => {
        getPressure()
    }, [pressureId])

    return (
        <div className='pressure'>
            <div>
                <h3>{pressure?.created}</h3>
                <h3>Systolic Pressure: {pressure?.systolic_pressure}</h3>
                <h3>Diastolic Pressure: {pressure?.diastolic_pressure}</h3>
                <h3>Heart Rate: {pressure?.heart_rate}</h3>
                <br/>
                <p>&#9998;Note...</p>
                <textarea defaultValue={pressure?.note}></textarea>
            </div>
            <div>
                Weather data
            </div>
        </div>
    )
}

export default PressurePage
