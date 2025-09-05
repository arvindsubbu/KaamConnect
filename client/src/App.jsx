import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from '../src/pages/Home'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './components/MainLayout'

function App() {
 
  return (
    <>
    <Toaster/>
    <BrowserRouter>
    
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      {/* <Route path='/' element={<Home/>}></Route> */}
      <Route path='/' element={<ProtectedRoute/>}/>
    </Routes>
    
    </BrowserRouter>
    </>
  )
    
}

export default App
