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
            <textarea defaultValue={pressure?.note}></textarea>
        </div>
    )
}

export default PressurePage
