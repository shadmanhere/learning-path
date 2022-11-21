import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactGA from 'react-ga'
import Navbar from './features/navbar/Navbar'
import Home from './features/home/Home'
import LearningPath from './features/learningpath/LearningPath'
import './App.css'

function App() {
  ReactGA.pageview(window.location.pathname + window.location.search)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/path/*' element={<LearningPath />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
