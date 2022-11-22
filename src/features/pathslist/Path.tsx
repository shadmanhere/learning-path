import React from 'react'
import { Link } from 'react-router-dom'

interface PathList {
  pathName: string
  pathUrl: string
}
const Path = ({ pathName, pathUrl }: PathList) => {
  return (
    <div className='flex flex-wrap w-1/3'>
      <div className='w-full p-1 md:p-2'>
        <Link
          className='bg-rose-800 block object-cover object-center w-full h-full rounded-lg flex justify-center'
          rel='noreferrer'
          to={pathUrl}
        >
          <h5 className='text-white text-xl font-medium text-center py-2'>{pathName}</h5>
        </Link>
      </div>
    </div>
  )
}

export default Path
