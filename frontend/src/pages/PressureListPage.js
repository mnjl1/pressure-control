import React, {useState, useEffect, useContext} from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
import AuthContext from '../context/AuthContext'


const PressureListPage = () => {
    let {authTokens, logoutUser} = useContext(AuthContext)
    let [pressureList, setPressureList] = useState([])

    useEffect(() => {
        getPressureList()
    }, [])

    let getPressureList = async () => {
        let response = await fetch('/api/pressure/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })

        let data = await response.json()
        console.log('Data', data)

        if (response.status === 200) {
            setPressureList(data);
        }else if (response.statusText === 'Unauthorized') {
            logoutUser()
        } 
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
            <AddButton />
        </div>
    )
}

export default PressureListPage
