import React from 'react'
import { useLocation } from 'react-router-dom'

const Tutorial = () => {
  const location = useLocation()
  const pathnameArray = location.pathname.split('/')
  const tutorialId = pathnameArray[pathnameArray.length - 1]
  return (
    <div className='container mx-auto my-auto'>
      <iframe
        className='mx-auto my-10 w-full max-w-2xl h-96'
        src={'https://www.youtube.com/embed/' + tutorialId}
        frameBorder='0'
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default Tutorial

// start=76&end=120
