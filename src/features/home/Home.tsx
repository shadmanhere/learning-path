import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import PathsList from '../pathslist/PathsList'
import './Home.css'

const Home = () => {
  return (
    <HelmetProvider>
      <div className='container mx-auto'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Home | Learning Path</title>
          {/* <link rel='canonical' href='http://mysite.com/example' /> */}
        </Helmet>
        <section className='overflow-hidden text-gray-700 '>
          <div className='container px-5 py-2 mx-auto lg:pt-12 lg:px-32'>
            <h2 className='font-bold text-2xl mb-2 text-amber-800'>Paths</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              <PathsList />
            </div>
          </div>
        </section>
      </div>
    </HelmetProvider>
  )
}

export default Home
