import React from 'react'
import { styled } from '@linaria/react'
import { reactpath } from '../../data/reactpath'

const LearningPath = () => {
  return (
    <div className='container mx-auto'>
      <section className='overflow-hidden text-gray-700 '>
        <div className='container px-5 py-2 mx-auto lg:pt-12 lg:px-32'>
          <div className='flex flex-wrap -m-1 md:-m-2'>
            {reactpath.map((tutorial, i) => {
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

export default LearningPath
