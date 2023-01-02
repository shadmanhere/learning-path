import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactGA from 'react-ga4'
import Navbar from './features/navbar/Navbar'
import Home from './features/home/Home'
import LearningPath from './features/learningpath/LearningPath'
import Tutorial from './features/tutorial/Tutorial'
import './App.css'
import Signin from './features/auth/Signin'
import Signup from './features/auth/Signup'
import NotFound from './features/notfound/NotFound'
import ForgotPassword from './features/auth/ForgotPassword'
import NewPassword from './features/auth/NewPassword'

function App() {
  ReactGA.pageview(window.location.pathname + window.location.search)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<NewPassword />} />
        <Route path='/path/:path/tutorial/:tutorial' element={<Tutorial />} />
        <Route path='/tutorial/:tutorial' element={<Tutorial />} />
        <Route path='/path/:path' element={<LearningPath />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
