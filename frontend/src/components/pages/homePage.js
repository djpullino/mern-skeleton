import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'
import Card from 'react-bootstrap/Card';
const HomePage = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken')
        return navigate('/')
    }

    useEffect(() => {
        setUser(getUserInfo())
    }, [])

    if (!user) return (
        <div><h4>Log in to view this page.</h4></div>)
    const { id, email, username, password, favroute} = user
    return (
        <>
            <div>
                <h3>
                    Welcome
                </h3>
                    <span className='username'> @{username}</span>
                
                <h3>
                    Your userId in mongo db is:
                </h3>
                    <span className='userId'> {id}</span>
                
                <h3>
                    Your registered email is: 
                </h3>
                    <span className='email'> {email}</span>
                
                <h3>
                    Your password is:
                </h3>

                    <span className='password'> {password} ( hashed )</span>
                
                <h3>
                    Your favorite route is currently set as:
                </h3>
                    <span className='favroute'> {favroute}</span>
                
            </div>
            <button onClick={(e) => handleClick(e)}>
                Log Out
            </button>
        </>
    )
}

export default HomePage