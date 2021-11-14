import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
    let {userLogin} = useContext(AuthContext)
    return (
        <div>
            <form onSubmit={userLogin}>
                <input type="email" name="email" placeholder="Enter Email" />
                <input type="password" name="password" placeholder="Enter Password" />
                <input type="submit" value="Submit"/>

            </form>
        </div>
    )
}

export default LoginPage;
