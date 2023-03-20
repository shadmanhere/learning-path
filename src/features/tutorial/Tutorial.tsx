import React, { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useLocation, useNavigate } from 'react-router-dom'
import { GetTutorial, selectTutorial } from '../tutorial/tutorialSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import ReactPlayer from 'react-player'
import styles from './Tutorial.module.css'

const Tutorial = () => {
  const [videoUrl, setVideoUrl] = useState('')
  const [playing, setPlaying] = useState(false)
  const [ml, setMl] = useState('md:ml-60')

  const location = useLocation()
  const pathnameArray = location.pathname.split('/')
  const tutorial = useAppSelector(selectTutorial)
  const tutorialId = pathnameArray[pathnameArray.length - 1]

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(GetTutorial(tutorialId))
    setVideoUrl(`https://youtu.be/${tutorialId}`)
  }, [])

  useEffect(() => {
    if (tutorial.Chapter.length === 0) setMl('')
  }, [tutorial.Chapter.length])

  const handlePlayer = () => {
    setVideoUrl('https://www.youtube.com/watch?v=UB1O30fR-EE&t=44s')
    setPlaying(true)
  }

  return (
    <HelmetProvider>
      <div className='container flex flex-col-reverse md:flex-row'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>{tutorial.title + ' | Learning Path'}</title>
        </Helmet>
        {tutorial.Chapter.length !== 0 ? (
          <nav className='mr-4 md:fixed md:w-56 h-screen rounded py-2.5 text-base font-medium uppercase leading-tight text-amber-800 shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg'>
            <ul className=''>
              <li className='mr-4 w-full rounded px-6 py-2.5 text-base font-medium uppercase leading-tight text-amber-800 shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg'>
                Chapters
              </li>

              {tutorial.Chapter?.map((chapter, i) => {
                return (
                  <li
                    key={i}
                    className='cursor-pointer mr-4 w-full rounded border-y-2 border-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-blue-600 shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg'
                    onClick={() => handlePlayer()}
                  >
                    {chapter.title}
                  </li>
                )
              })}
            </ul>
          </nav>
        ) : null}
        <div className={`flex flex-col ${ml} items-center w-full`}>
          <h1 className='capitalize px-5 py-2 mx-auto lg:pt-12 lg:px-32 text-center text-3xl md:text-4xl mb-5 font-extrabold text-rose-700'>
            {tutorial.title}
          </h1>
          <ReactPlayer
            url={videoUrl}
            className={`${styles.videoframe} mx-4 h-80 sm:mx-auto my-10 sm:w-full max-w-2xl sm:h-96`}
            controls={true}
            playing={playing}
            width={'100%'}
          />
        </div>
      </div>
    </HelmetProvider>
  )
}

export default Tutorial

// start=76&end=120
