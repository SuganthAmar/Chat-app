import React, { useState } from 'react'
import { useAuth } from '../../utils/AuthContext'
import { Link } from 'react-router-dom';

const Register = () => {
    const {handleRegister}=useAuth();
    const [credentials,setCredentials]=useState({
        name:"",
        email:"",
        password1:"",
        password2:""
      })
      const handleCredentials=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setCredentials({...credentials,[name]:value});
      }
  return (
    <div className='auth--container'>
      <div className="form--wrapper">
        <form onSubmit={(e)=>{handleRegister(e,credentials)}}>
        <div className="field--wrapp">
            <label>Name:</label>
            <input 
              type="text"
              required
              name="name"
              placeholder='Enter your name...' 
              value={credentials.name}
              onChange={handleCredentials}/>
          </div>
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
              name="password1"
              placeholder='Enter your password...' 
              value={credentials.password1}
              onChange={handleCredentials}/>
          </div>
          <div className="field--wrapp">
            <label>Confirm Password:</label>
            <input 
              type="password"
              required
              name="password2"
              placeholder='Confirm your password...' 
              value={credentials.password2}
              onChange={handleCredentials}/>
          </div>
          <div className="field--wrapp">
            <input type="submit" className='btn btn--lg btn--main' value="Register" />
          </div>
        </form>
        <p className='formpara'>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  )
}

export default Register