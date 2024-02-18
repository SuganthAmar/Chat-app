import React from 'react'
import './App.css'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes';
import Room from './Pages/Room'
import LoginPage from './Pages/Login/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route element={<PrivateRoutes/>}>  //Outlet is used to create a private router only loads on login
          <Route path='/' element={<Room/>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
