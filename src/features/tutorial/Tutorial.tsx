import React, { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useLocation, useNavigate } from 'react-router-dom'
import { GetTutorial, ChapterViewed, selectTutorial } from '../tutorial/tutorialSlice'
import { selectUser } from '../auth/authSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import ReactPlayer from 'react-player'
import styles from './Tutorial.module.css'
import { OnProgressProps } from 'react-player/base'

const Tutorial = () => {
  const [currentChapter, setCurrentChapter] = useState<{
    id: number
    title: string
    url: string
    imageUrl: string
    tutorialId: number
  }>({ id: 0, title: '', url: '', imageUrl: '', tutorialId: 0 })
  const [playing, setPlaying] = useState(false)
  const [ml, setMl] = useState('md:ml-60')
  const [activeChapter, setActiveChapter] = useState('')
  const [initialPlaybackDuration, setInitialPlaybackDuration] = useState(0)
  const [playbackDuration, setPlaybackDuration] = useState(0)

  const user = useAppSelector(selectUser)
  const location = useLocation()
  const pathnameArray = location.pathname.split('/')
  const tutorial = useAppSelector(selectTutorial)
  const tutorialId = pathnameArray[pathnameArray.length - 1]

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(GetTutorial(tutorialId))
    setCurrentChapter({ ...currentChapter, url: `https://youtu.be/${tutorialId}` })
  }, [])

  useEffect(() => {
    if (tutorial.Chapter.length === 0) setMl('')
    else setMl('md:ml-60')
  }, [tutorial.Chapter.length])

  useEffect(() => {
    if (Math.floor(playbackDuration) === 10 && currentChapter.id)
      dispatch(ChapterViewed({ chapterId: currentChapter.id, userId: user.id }))
  }, [playbackDuration])

  const handlePlayer = (
    chapter: {
      id: number
      title: string
      url: string
      imageUrl: string
      tutorialId: number
    },
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    setActiveChapter((event.target as HTMLInputElement).id)
    setCurrentChapter(chapter)
    setPlaying(true)
    setInitialPlaybackDuration(0)
    setPlaybackDuration(0)
  }

  const handleProgress = (e: OnProgressProps) => {
    if (initialPlaybackDuration === 0.0) setInitialPlaybackDuration(e.playedSeconds)
    else setPlaybackDuration(e.playedSeconds - initialPlaybackDuration)
  }

  return (
    <HelmetProvider>
      <div className='container flex flex-col-reverse md:flex-row'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>{tutorial.title + ' | Learning Path'}</title>
        </Helmet>
        {tutorial.Chapter.length !== 0 ? (
          <nav
            className={`${styles.sidenav} mx-4 md:mx-0 md:mr-4 md:fixed md:w-60 rounded py-2.5 text-base font-medium uppercase leading-tight text-amber-800 shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg overflow-y-auto`}
          >
            <ul className=''>
              <li className='mr-4 w-full rounded px-6 py-2.5 text-base font-medium uppercase leading-tight text-amber-800 shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg'>
                Chapters
              </li>

              {tutorial.Chapter?.map((chapter, i) => {
                return (
                  <li
                    key={i}
                    id={`chapter_${i}`}
                    className={`float-left cursor-pointer mr-0 w-full rounded border-y-2 border-blue-600 pl-6 pr-2 py-2.5 text-xs font-medium uppercase leading-tight text-blue-600 shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg
                      ${activeChapter === `chapter_${i}` ? 'bg-gray-300' : ''}
                    `}
                    onClick={(event) => handlePlayer(chapter, event)}
                  >
                    {`${i + 1} - ${chapter.title}`}
                    {chapter.ChapterToUser[0]?.chapterId === chapter.id ? (
                      <span className='float-right' title='viewed'>
                        ⬤
                      </span>
                    ) : (
                      <span className='float-right' title='unviewed'>
                        ○
                      </span>
                    )}
                  </li>
                )
              })}
              <li className='md:h-96 mr-4 w-full rounded px-6 py-2.5 text-base font-medium uppercase leading-tight text-amber-800'>
                &nbsp;
              </li>
            </ul>
          </nav>
        ) : null}
        <div className={`flex flex-col ${ml} items-center w-full`}>
          <h1 className='capitalize mt-7 md:mt-0 px-5 py-2 mx-auto lg:pt-12 lg:px-32 text-center text-3xl md:text-4xl mb-5 font-extrabold text-rose-700'>
            {tutorial.title}
          </h1>
          <ReactPlayer
            url={currentChapter.url}
            className={`${styles.videoframe} mx-4 h-80 sm:mx-auto my-10 sm:w-full max-w-2xl sm:h-96`}
            controls={true}
            playing={playing}
            width={'95%'}
            onProgress={(e) => handleProgress(e)}
          />
        </div>
      </div>
    </HelmetProvider>
  )
}

export default Tutorial

// start=76&end=120
