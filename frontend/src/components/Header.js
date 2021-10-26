import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
    const {user, logoutUser} = useContext(AuthContext)
    
    return (
        <div className="app-header">
            <h1>Blood pressure list</h1>
            <Link to="/">Home</Link>
            <span> | </span>
            {user ? (
                <Link onClick={logoutUser}>Logout</Link>
            ) : (
                <Link to="/login">Login</Link>
            )}
            
            {user && <p> Hello, {user.email}</p>}
            
        </div>
    )
}

export default Header
