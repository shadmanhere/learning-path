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

  const listOfPaths: { name: string }[] = useAppSelector(selectPathsList)
  return (
    <>
      {status === 'idle'
        ? listOfPaths.map((path, i) => {
            return (
              <Paths
                key={i}
                pathName={path.name}
                pathUrl={'path/' + path.name.toLowerCase().split(' ').join('-')}
              ></Paths>
            )
          })
        : [0, 1, 2].map((i) => {
            return (
              <div key={i} className='flex flex-wrap w-1/3 animate-pulse'>
                <div className='w-full p-1 md:p-2'>
                  <a target='_blank' rel='noreferrer' href='#'>
                    <div className='block object-cover object-center w-full h-20 md:h-10 rounded-lg bg-slate-300	'></div>
                  </a>
                </div>
              </div>
            )
          })}
    </>
  )
}

export default PathsList
