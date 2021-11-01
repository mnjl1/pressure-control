import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'
import { useHistory } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(
        () => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    )
    let [user, setUser] = useState(
        () => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    )
    let [loading, setLoading] = useState(true)

    const history = useHistory()

    let userLogin = async (e) => {

        e.preventDefault()
         
        let response = await fetch('/api/token/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
                'email': e.target.email.value,
                'password': e.target.password.value})
            }
        )
        let data = await response.json()
        
        if(response.status === 200) {
            setAuthTokens(data)
            
            try {
                setUser(jwt_decode(data.access,  { payload: true }))
            }catch(error) {
                console.log('Invalid token')
            }

            localStorage.setItem('authTokens', JSON.stringify(data))
            history.push('/')
        } else {
            alert("Something went wrong!")
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history.push('/login')
    }


    let refreshToken = async () => {
        let response = await fetch('/api/token/refresh/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({'refresh': authTokens?.refresh})
            }
        )
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }


    let contextData = {
        authTokens: authTokens,
        user: user,
        userLogin: userLogin,
        logoutUser: logoutUser
    }

    useEffect(() => {

        if(loading){
            refreshToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                refreshToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])


    return (
        <AuthContext.Provider value={contextData}>
        {loading ? null : children}
        </AuthContext.Provider>
    )
}
