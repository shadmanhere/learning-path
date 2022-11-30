import React from 'react'
import { useLocation } from 'react-router-dom'

const Tutorial = () => {
  const location = useLocation()
  const pathnameArray = location.pathname.split('/')
  const tutorialId = pathnameArray[pathnameArray.length - 1]
  console.log(tutorialId)
  return (
    <div className='container mx-auto my-auto'>
      <iframe
        className='mx-auto my-10'
        src={'https://www.youtube.com/embed/' + tutorialId}
        width='600'
        height='400'
        frameBorder='0'
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default Tutorial

// start=76&end=120
