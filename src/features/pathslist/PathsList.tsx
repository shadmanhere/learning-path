import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { GetPathsList, selectPathsList, selectStatus } from './pathsListSlice'

import Paths from './Path'

const PathsList = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)
  useEffect(() => {
    dispatch(GetPathsList())
  }, [])

  const listOfPaths: { name: string; imageUrl: string; description: string; duration: string }[] =
    useAppSelector(selectPathsList)
  return (
    <>
      {status === 'idle'
        ? listOfPaths.map((path, i) => {
            return (
              <Paths
                key={i}
                pathName={path.name}
                pathUrl={'path/' + path.name.toLowerCase().split(' ').join('-')}
                pathDescription={path.description}
                pathImage={path.imageUrl}
                pathDuration={path.duration}
              ></Paths>
            )
          })
        : [0, 1, 2, 4].map((i) => {
            return (
              <div key={i} className='animate-pulse'>
                <div className='max-w-xs sm:max-w-sm bg-slate-200 rounded-lg overflow-hidden shadow-md h-full flex flex-col'>
                  <div className='w-full h-48 bg-slate-300'></div>
                  <div className='flex-grow p-4'>
                    <h2 className='text-xl font-bold mb-2 h-5 bg-slate-300'></h2>
                    <p className='text-gray-700 text-base h-16 bg-slate-300'></p>
                  </div>
                  <div className='flex items-center justify-between px-4 py-2 bg-gray-200'>
                    <span className='inline-block w-10 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 h-5 bg-slate-300'></span>
                    <span className='inline-block w-10 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 h-5 bg-slate-300'></span>
                  </div>
                </div>
              </div>
            )
          })}
    </>
  )
}

export default PathsList
