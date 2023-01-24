import React, { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useLocation, useNavigate } from 'react-router-dom'
import { styled } from '@linaria/react'
import { GetTutorial, selectTutorial } from '../tutorial/tutorialSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import YouTube, { YouTubeProps } from 'react-youtube'

const Tutorial = () => {
  const location = useLocation()
  const pathnameArray = location.pathname.split('/')
  const tutorial = useAppSelector(selectTutorial)
  const tutorialId = pathnameArray[pathnameArray.length - 1]

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(GetTutorial(tutorialId))
  }, [])

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
    },
  }

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
        <VideoIframe>
          <YouTube
            className='mx-4 h-80 sm:mx-auto my-10 sm:w-full max-w-2xl sm:h-96'
            videoId={tutorialId}
            opts={opts}
            onReady={onPlayerReady}
          />
        </VideoIframe>
      </div>
    </HelmetProvider>
  )
}

const VideoIframe = styled.span`
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
