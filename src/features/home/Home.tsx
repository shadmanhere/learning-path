import React from 'react'
import { styled } from '@linaria/react'
import { tutorials } from '../../data/tutorialsList'
import './Home.css'

const Home = () => {
  return (
    <div className='container mx-auto'>
      <section className='overflow-hidden text-gray-700 '>
        <div className='container px-5 py-2 mx-auto lg:pt-12 lg:px-32'>
          <div className='flex flex-wrap -m-1 md:-m-2'>
            <div className='flex flex-wrap w-1/3'>
              <div className='w-full p-1 md:p-2'>
                <a
                  className=' bg-slate-300 block object-cover object-center w-full h-full rounded-lg'
                  rel='noreferrer'
                  href='path/react'
                >
                  <h5 className='text-gray-900 text-xl leading-tight font-medium mb-2 align-middle	'>
                    React Js
                  </h5>
                  <p className='text-gray-700 text-base mb-4'>
                    Some quick example text to build on the card title and make up the bulk of the
                    card&apos;s content.
                  </p>
                </a>
              </div>
            </div>
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
