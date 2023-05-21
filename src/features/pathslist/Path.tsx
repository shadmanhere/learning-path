import React from 'react'
import { Link } from 'react-router-dom'

interface PathList {
  pathName: string
  pathUrl: string
  pathDescription: string
  pathImage: string
  pathDuration: string
}
const Path = ({ pathName, pathUrl, pathDescription, pathImage, pathDuration }: PathList) => {
  return (
    <>
      <Link rel='noreferrer' to={pathUrl}>
        <div className='max-w-xs sm:max-w-sm bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col'>
          <img className='w-full h-48 object-fit' src={pathImage} alt='Course Image' />
          <div className='flex-grow p-4'>
            <h2 className='text-xl font-bold mb-2'>{pathName}</h2>
            <p className='text-gray-700 text-base'>{pathDescription}</p>
          </div>
          <div className='flex items-center justify-between px-4 py-2 bg-gray-200'>
            <span className='inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>
              Beginner
            </span>
            <span className='inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>
              Duration: {pathDuration}
            </span>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Path
