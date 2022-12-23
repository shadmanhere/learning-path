import React, { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { TutorialsList, selectTutorials, selectStatus, selectError } from './homeSlice'
import PathsList from '../pathslist/PathsList'
import './Home.css'

const Home = () => {
  const tutorials: { title: string; url: string; image_url: string }[] | null =
    useAppSelector(selectTutorials)
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()
  const error = useAppSelector(selectError)
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(TutorialsList())
  }, [])

  const isAuthenticated = () => {
    if (error.statusCode === 401) navigate('/signin')
  }
  useEffect(() => {
    isAuthenticated()
  }, [error])

  return (
    <HelmetProvider>
      <div className='container mx-auto'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Home | Learning Path</title>
          {/* <link rel='canonical' href='http://mysite.com/example' /> */}
        </Helmet>
        <section className='overflow-hidden text-gray-700 '>
          <div className='container px-5 py-2 mx-auto lg:pt-12 lg:px-32'>
            <h2 className='font-bold text-2xl mb-2 text-amber-800'>Paths</h2>
            <div className='flex flex-wrap -m-1 md:-m-2'>
              <PathsList />
            </div>
            <hr className='my-4 h-0.5 w-full bg-gradient-to-r from-amber-700 via-stone-300 to-amber-700' />
            <h2 className='font-bold text-2xl mt-4 mb-2 text-amber-800'>Tutorials</h2>
            <div className='flex flex-wrap -m-1 md:-m-2'>
              {status === 'idle'
                ? tutorials?.map((tutorial, i) => {
                    return (
                      <div key={i} className='flex flex-wrap w-1/3 md:w-1/5'>
                        <div className='w-full p-1 md:p-2'>
                          <Link to={'/tutorial/' + tutorial.url.split('=')[1]}>
                            <img
                              alt='gallery'
                              className='block object-cover object-center w-full h-full rounded-lg'
                              src={tutorial.image_url}
                            />
                          </Link>
                        </div>
                      </div>
                    )
                  })
                : [0, 1, 2, 3, 4, 5, 7, 8, 9].map((index) => {
                    return (
                      <div key={index} className='flex flex-wrap w-1/3 md:w-1/5 animate-pulse'>
                        <div className='w-full p-1 md:p-2'>
                          <a target='_blank' rel='noreferrer' href='#'>
                            <div className='block object-cover object-center w-full h-20 md:h-40 rounded-lg bg-slate-300	'></div>
                          </a>
                        </div>
                      </div>
                    )
                  })}
            </div>
          </div>
        </section>
      </div>
    </HelmetProvider>
  )
}

export default Home
