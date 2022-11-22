import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { GetPathsList, selectPathsList, selectStatus } from './pathsListSlice'
import Paths from './Path'

const PathsList = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(GetPathsList())
  }, [])

  const listOfPaths: string[] = useAppSelector(selectPathsList)
  return (
    <>
      {listOfPaths.map((path, i) => {
        return (
          <>
            <Paths
              key={i}
              pathName={path}
              pathUrl={'path/' + path.replaceAll(' ', '-').toLowerCase()}
            ></Paths>
          </>
        )
      })}
    </>
  )
}

export default PathsList
