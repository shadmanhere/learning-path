import React from 'react'
import { styled } from '@linaria/react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg'>
      <div className='container-fluid w-full flex flex-wrap items-center justify-between px-6'>
        <div className='container-fluid'>
          <Link to='/'>
            <Brand className='text-2xl text-rose-800 font-normal tracking-wide'>
              Learning Path
            </Brand>
          </Link>
          <span id='forkongithub'>
            <a target='_blank' href='https://github.com/shadmanhere/learning-path' rel='noreferrer'>
              GitHub
            </a>
          </span>
        </div>
      </div>
    </nav>
  )
}

// Create a styled component
const Brand = styled.p`
  font-family: 'Oleo Script Swash Caps', cursive;
`

export default Navbar
