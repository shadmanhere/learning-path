import React from 'react'
import { styled } from '@linaria/react'
import { tutorials } from '../../data/tutorialsList'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { requestTutorialsList, TutorialsList } from './homeSlice'
import './Home.css'

const Home = () => {
  const dispatch = useAppDispatch()
  dispatch(TutorialsList())
  return (
    <div className='container mx-auto'>
      <section className='overflow-hidden text-gray-700 '>
        <div className='container px-5 py-2 mx-auto lg:pt-12 lg:px-32'>
          <h2 className='font-bold text-2xl mb-2'>Paths</h2>
          <div className='flex flex-wrap -m-1 md:-m-2'>
            <div className='flex flex-wrap w-1/3'>
              <div className='w-full p-1 md:p-2'>
                <Link
                  className='bg-rose-800 block object-cover object-center w-full h-full rounded-lg flex justify-center'
                  rel='noreferrer'
                  to='path/react-js-developer'
                >
                  <h5 className='text-white text-xl font-medium text-center py-2'>
                    React Js Developer
                  </h5>
                </Link>
              </div>
            </div>
          </div>
          <hr className='border-2 my-4 bg-zinc-300 border-zinc-300' />
          <h2 className='font-bold text-2xl mt-4 mb-2'>Tutorials</h2>
          <div className='flex flex-wrap -m-1 md:-m-2'>
            {tutorials.map((tutorial, i) => {
              return (
                <div key={i} className='flex flex-wrap w-1/3'>
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
        </div>
      </section>
    </div>
  )
}

export default Home
