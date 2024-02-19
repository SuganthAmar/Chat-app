import React, { useEffect, useState } from 'react'
import { useAuth } from '../../utils/AuthContext'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const {user,handlelogin}=useAuth();
  const navigate=useNavigate();
  const [credentials,setCredentials]=useState({
    email:"",
    password:""
  })
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  })
  const handleCredentials=(e)=>{
    let name=e.target.name;
    let value=e.target.value;
    setCredentials({...credentials,[name]:value});
  }
  return (
    <div className='auth--container'>
      <div className="form--wrapper">
        <form onSubmit={(e)=>{handlelogin(e,credentials)}}>
          <div className="field--wrapp">
            <label>Email:</label>
            <input 
              type="email"
              required
              name="email"
              placeholder='Enter your email...' 
              value={credentials.email}
              onChange={handleCredentials}/>
          </div>
          <div className="field--wrapp">
            <label>Password:</label>
            <input 
              type="password"
              required
              name="password"
              placeholder='Enter your password...' 
              value={credentials.password}
              onChange={handleCredentials}/>
          </div>
          <div className="field--wrapp">
            <input type="submit" className='btn btn--lg btn--main' value="Login" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage