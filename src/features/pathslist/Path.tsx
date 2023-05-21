import React from 'react'
import { Link } from 'react-router-dom'

interface PathList {
  pathName: string
  pathUrl: string
}
const Path = ({ pathName, pathUrl }: PathList) => {
  return (
    <>
      <Link rel='noreferrer' to={pathUrl}>
        <div className='max-w-sm rounded overflow-hidden shadow-lg'>
          <img
            className='w-full'
            src='https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/react/react-original.svg'
            alt='Course Image'
          />

          <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>{pathName}</div>
            <p className='text-gray-700 text-base'>
              Course description goes here. This is a brief overview of what the course offers and
              why it&#39;s valuable.
            </p>
          </div>
          <div className='px-6 py-4'>
            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
              Beginner
            </span>
            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>
              Duration: 10 hours
            </span>
          </div>
        </div>
      </Link>
      {/* <div className='flex flex-wrap w-1/3'>
        <div className='w-full p-1 md:p-2'>
          <Link
            className='bg-rose-800 block object-cover object-center w-full h-full rounded-lg flex justify-center'
            rel='noreferrer'
            to={pathUrl}
          >
            <h5 className='text-white text-xl font-medium text-center py-2'>{pathName}</h5>
          </Link>
        </div>
      </div> */}
    </>
  )
}

export default Path
