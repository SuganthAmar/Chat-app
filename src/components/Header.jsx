import React from 'react'
import { LogOut } from 'react-feather';
import { useAuth } from '../utils/AuthContext';

const Header = () => {
    const {user,handleLogout }=useAuth()
  return (
    <div id='header--wrapper'>
        {user ? (
            <>
            <h2>Welcome {user.name}</h2>
            <LogOut onClick={handleLogout} className="header--link"/>
            </>
        ):(
            <button>Login</button>
        )}
    </div>
  )
}

export default Header