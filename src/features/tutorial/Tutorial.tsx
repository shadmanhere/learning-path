import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { selectPath } from '../learningpath/learningpathSlice'
import { useAppSelector } from '../../app/hooks'

const Tutorial = () => {
  const location = useLocation()
  const pathnameArray = location.pathname.split('/')
  const tutorialId = pathnameArray[pathnameArray.length - 1]
  const path = useAppSelector(selectPath)

  const getTitle = () => {
    for (let i = 0; i < path.length; i++) {
      const tutorials = path[i].section.tutorials
      for (let j = 0; j < tutorials.length; j++) {
        if (tutorialId === tutorials[j].url.split('=')[1]) {
          return tutorials[j].title
        }
      }
    }
  }

  const title = getTitle() || ''

  return (
    <HelmetProvider>
      <div className='container mx-auto'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>{title + ' | Learning Path'}</title>
        </Helmet>
        <h1 className='capitalize px-5 py-2 mx-auto lg:pt-12 lg:px-32 text-center text-3xl md:text-4xl mb-5 font-extrabold text-rose-700'>
          {title}
        </h1>
        <iframe
          className='mx-auto my-10 w-full max-w-2xl h-96'
          src={'https://www.youtube.com/embed/' + tutorialId}
          frameBorder='0'
          allowFullScreen
        ></iframe>
      </div>
    </HelmetProvider>
  )
}

export default Tutorial

// start=76&end=120
