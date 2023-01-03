import React, { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useLocation, useNavigate } from 'react-router-dom'
import { styled } from '@linaria/react'
import { GetTutorial, selectTutorial } from '../tutorial/tutorialSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

const Tutorial = () => {
  const location = useLocation()
  const pathnameArray = location.pathname.split('/')
  const tutorial = useAppSelector(selectTutorial)
  const tutorialId = pathnameArray[pathnameArray.length - 1]

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(GetTutorial(tutorialId))
  }, [])

  return (
    <HelmetProvider>
      <div className='container mx-auto'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>{tutorial.title + ' | Learning Path'}</title>
        </Helmet>
        <h1 className='capitalize px-5 py-2 mx-auto lg:pt-12 lg:px-32 text-center text-3xl md:text-4xl mb-5 font-extrabold text-rose-700'>
          {tutorial.title}
        </h1>
        <VideoIframe
          className='mx-auto my-10 sm:w-full max-w-2xl sm:h-96'
          src={'https://www.youtube.com/embed/' + tutorialId}
          frameBorder='0'
          allowFullScreen
        ></VideoIframe>
      </div>
    </HelmetProvider>
  )
}

const VideoIframe = styled.iframe`
  background-color: rgb(203 213 225);
  animation-name: color;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
  animation-timing-function: ease;
  @keyframes color {
    to {
      background-color: rgb(241 245 249);
    }
  }
`

export default Tutorial

// start=76&end=120
