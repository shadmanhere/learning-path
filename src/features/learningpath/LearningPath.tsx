import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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
  return (
    <div className='container mx-auto'>
      <section className='overflow-hidden text-gray-700 '>
        <div className='container px-5 py-2 mx-auto lg:pt-12 lg:px-32'>
          <h1 className='capitalize text-center text-3xl md:text-4xl mb-5 font-extrabold text-cyan-800'>
            {learningpath.split('-').join(' ')}
          </h1>

          {status === 'idle'
            ? path.map((segement, i, row) => {
                return (
                  <div key={i} className='my-8'>
                    <h2 className='font-medium leading-tight text-4xl mt-0 mb-2 text-amber-800'>
                      {segement.section.name}
                    </h2>
                    <div className='flex flex-wrap -m-1 md:-m-2'>
                      {segement.section.tutorials?.map((tutorial, index) => {
                        return (
                          <div key={index} className='flex flex-wrap w-1/3'>
                            <div className='w-full p-1 md:p-2'>
                              <a target='_blank' rel='noreferrer' href={tutorial.url}>
                                <img
                                  alt='gallery'
                                  className='block object-cover object-center w-full h-full rounded-lg'
                                  src={tutorial.thumbnail}
                                />
                              </a>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    {i < row.length - 1 ? <hr className='mt-4 bg-slate-800 h-0.5' /> : ''}
                  </div>
                )
              })
            : [0, 1, 2, 3, 4, 5].map((index) => {
                return (
                  <div key={index} className='flex flex-wrap w-1/3 animate-pulse'>
                    <div className='w-full p-1 md:p-2'>
                      <a target='_blank' rel='noreferrer' href='#'>
                        <div className='block object-cover object-center w-full h-20 md:h-40 rounded-lg bg-slate-300	'></div>
                      </a>
                    </div>
                  </div>
                )
              })}
        </div>
      </section>
    </div>
  )
}

export default LearningPath
