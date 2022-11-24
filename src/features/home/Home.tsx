import React, { useEffect } from 'react'
import { styled } from '@linaria/react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { TutorialsList, selectTutorials, selectStatus } from './homeSlice'
import PathsList from '../pathslist/PathsList'
import './Home.css'

const Home = () => {
  const tutorials: { title: string; url: string; thumbnail: string }[] | null =
    useAppSelector(selectTutorials)
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(TutorialsList())
  }, [])

  return (
    <div className='container mx-auto'>
      <section className='overflow-hidden text-gray-700 '>
        <div className='container px-5 py-2 mx-auto lg:pt-12 lg:px-32'>
          <h2 className='font-bold text-2xl mb-2'>Paths</h2>
          <div className='flex flex-wrap -m-1 md:-m-2'>
            <PathsList />
          </div>
          <hr className='border-2 my-4 bg-zinc-300 border-zinc-300' />
          <h2 className='font-bold text-2xl mt-4 mb-2'>Tutorials</h2>
          <div className='flex flex-wrap -m-1 md:-m-2'>
            {status === 'idle'
              ? tutorials?.map((tutorial, i) => {
                  return (
                    <div key={i} className='flex flex-wrap w-1/3 md:w-1/5'>
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
  )
}

export default Home
