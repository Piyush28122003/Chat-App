import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import './App.css'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Home from './pages/Home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from './Context/AuthContext'

function App() {
  const {user} = useAuthContext();
  return (
    <div className='p-0 m-0 h-screen flex items-center justify-center'>
    <Routes>
      <Route path='/login' element={user?<Navigate to={'/'}/> : <Login/>}/>
      <Route path='/signup' element={user?<Navigate to={'/'}/> : <SignUp/>}/>
      <Route path='/' element={user ? <Home/> : <Navigate to={'/login'}/>}/>
    </Routes>
    <Toaster />
    </div>
  )
}

export default App
