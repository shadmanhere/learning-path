import React from 'react'
import { styled } from '@linaria/react'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg'>
      <div className='container-fluid w-full flex flex-wrap items-center justify-between px-6'>
        <div className='container-fluid'>
          <Brand className='text-2xl text-rose-800 font-normal tracking-wide' href='/'>
            Learning Path
          </Brand>
        </div>
      </div>
    </nav>
  )
}

// Create a styled component
const Brand = styled.a`
  font-family: 'Oleo Script Swash Caps', cursive;
`

export default Navbar
