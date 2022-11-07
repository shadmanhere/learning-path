import React from 'react'
import { styled } from '@linaria/react'

const Home = () => {
  return (
    <>
      <nav className='relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg'>
        <div className='container-fluid w-full flex flex-wrap items-center justify-between px-6'>
          <div className='container-fluid'>
            <Brand className='text-xl font-semibold' href='/'>
              Learning Path
            </Brand>
          </div>
        </div>
      </nav>
    </>
  )
}

// Create a styled component
const Brand = styled.a`
  color: red;
`

export default Home
