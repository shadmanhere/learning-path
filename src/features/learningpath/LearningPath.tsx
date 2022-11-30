import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { Path, selectPath, selectStatus } from './learningpathSlice'

const LearningPath = () => {
  interface tutorialsInterface {
    title: string
    url: string
    thumbnail: string
  }
  const path:
    | {
        section: { name: string; tutorials: tutorialsInterface[] }
      }[]
    | null = useAppSelector(selectPath)
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const learningpath = location.pathname.split('/')[2]
  useEffect(() => {
    dispatch(Path(learningpath))
  }, [])

  function capitalize(word: string) {
    const wordArr = word.toLowerCase().split('')
    wordArr[0] = wordArr[0].toUpperCase()
    return wordArr.join('')
  }
  const pathName = learningpath.split('-').join(' ')
  const pathNameCapitalized = pathName
    .split(' ')
    .map((word) => {
      return capitalize(word)
    })
    .join(' ')

  return (
    <HelmetProvider>
      <div className='container mx-auto'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>{pathNameCapitalized} | Learning Path</title>
          {/* <link rel='canonical' href='http://mysite.com/example' /> */}
        </Helmet>
        <section className='overflow-hidden text-gray-700 '>
          <div className='container px-5 py-2 mx-auto lg:pt-12 lg:px-32'>
            <h1 className='capitalize text-center text-3xl md:text-4xl mb-5 font-extrabold text-rose-700'>
              {pathNameCapitalized}
            </h1>

            {status === 'idle' ? (
              path.map((segement, i) => {
                return (
                  <div key={i} className='my-8'>
                    <div className='flex'>
                      <h2 className='font-medium shrink-0 text-4xl mt-0 mb-2 text-amber-800'>
                        {segement.section.name}
                      </h2>
                      <hr className='my-6 mx-4 bg-gradient-to-r from-amber-700 h-0.5 w-full' />
                    </div>

                    <div className='flex flex-wrap -m-1 md:-m-2 max-h-80 overflow-y-scroll'>
                      {segement.section.tutorials?.map((tutorial, index) => {
                        return (
                          <div key={index} className='flex flex-wrap w-1/3 md:w-1/5'>
                            <div className='w-full p-1 md:p-2'>
                              <Link to={'tutorial/' + tutorial.url.split('=')[1]}>
                                <img
                                  alt='gallery'
                                  className='block object-cover object-center w-full h-full rounded-lg'
                                  src={tutorial.thumbnail}
                                />
                              </Link>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })
            ) : (
              <>
                <div className='animate-pulse block object-cover object-center w-60 h-10 mb-2 rounded-lg bg-slate-300'></div>
                <div className='flex flex-wrap -m-1 md:-m-2'>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
                    return (
                      <div key={index} className='flex flex-wrap w-1/3 md:w-1/5 animate-pulse'>
                        <div className='w-full p-1 md:p-2'>
                          <a target='_blank' rel='noreferrer' href='#'>
                            <div className='block object-cover object-center w-full h-20 md:h-40 rounded-lg bg-slate-300'></div>
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </HelmetProvider>
  )
}

export default LearningPath
