import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'


const PressureListPage = () => {

    let [pressureList, setPressureList] = useState([])

    useEffect(() => {
        getPressureList()
    }, [])

    let getPressureList = async () => {
        let response = await fetch('/api/pressure/')
        let data = await response.json()
        console.log('DATA', data)
        setPressureList(data);
    }

    return (
        <div className="pressure-list">
            <div className='pressure-list-header'>
                <h2 className="pressure-list-title">&#9825; Total Notes:</h2>
                <p className="presssure-list-count">{pressureList.length}</p>
            </div>
            <div className='pressure-list-list'>
                {pressureList.map((pressure, index) => (
                    <ListItem key={index} pressure={pressure}/>
                ))}
            </div>
        </div>
    )
}

export default PressureListPage
