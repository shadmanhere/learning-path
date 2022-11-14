import React from 'react'
import { styled } from '@linaria/react'
import { tutorials } from '../../data/tutorialsList'
import './Home.css'

const Home = () => {
  return (
    <>
      <nav className='relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg'>
        <div className='container-fluid w-full flex flex-wrap items-center justify-between px-6'>
          <div className='container-fluid'>
            <Brand className='text-2xl text-rose-800 font-normal tracking-wide' href='/'>
              Learning Path
            </Brand>
          </div>
        </div>
      </nav>
      <div className='container mx-auto'>
        <section className='overflow-hidden text-gray-700 '>
          <div className='container px-5 py-2 mx-auto lg:pt-12 lg:px-32'>
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
    </>
  )
}

// Create a styled component
const Brand = styled.a`
  font-family: 'Oleo Script Swash Caps', cursive;
`

export default Home
