import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from '../src/pages/Home'
import { BrowserRouter,Route,Routes } from 'react-router-dom'

function App() {
 
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/' element={<Home/>}></Route>
    </Routes>
    </BrowserRouter>
  )
    
}

export default App
