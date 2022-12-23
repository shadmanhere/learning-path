import React, { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useLocation, useNavigate } from 'react-router-dom'
import { styled } from '@linaria/react'
import { selectPath } from '../learningpath/learningpathSlice'
import { selectTutorials } from '../home/homeSlice'
import { GetTutorial, selectTutorial, selectError } from '../tutorial/tutorialSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

const Tutorial = () => {
  const location = useLocation()
  const pathnameArray = location.pathname.split('/')
  const tutorialId = pathnameArray[pathnameArray.length - 1]
  const path1 = useAppSelector(selectPath)
  const path2 = useAppSelector(selectTutorials)
  const error = useAppSelector(selectError)
  const navigate = useNavigate()

  const isAuthenticated = () => {
    if (error.statusCode === 401) navigate('/signin')
  }
  useEffect(() => {
    isAuthenticated()
  }, [error])

  const getTitleFromPath1 = () => {
    for (let i = 0; i < path1.length; i++) {
      const tutorials = path1[i].Section[i].tutorials
      for (let j = 0; j < tutorials.length; j++) {
        if (tutorialId === tutorials[j].url.split('=')[1]) {
          return tutorials[j].title
        }
      }
    }
  }

  const getTitleFromPath2 = () => {
    for (let i = 0; i < path2.length; i++) {
      if (tutorialId === path2[i].url.split('=')[1]) {
        return path2[i].title
      }
    }
  }

  const dispatch = useAppDispatch()
  const getTutorialFromApi = () => {
    dispatch(GetTutorial(tutorialId))
    const tutorialFromApi = useAppSelector(selectTutorial)
    return tutorialFromApi.title
  }
  console.log(pathnameArray)
  const title = pathnameArray.includes('path')
    ? getTitleFromPath1() || getTutorialFromApi() || ''
    : getTitleFromPath2() || getTutorialFromApi() || ''
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
