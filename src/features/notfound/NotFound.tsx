import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const NotFound = () => {
  return (
    <HelmetProvider>
      <div className='container grid h-screen place-items-center'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Signin | Learning Path</title>
        </Helmet>
        <div className='block p-6 rounded-lg shadow-lg bg-white'>
          <h1 className='text-5xl font-extrabold text-rose-700'>404: Page Not Found</h1>
        </div>
      </div>
    </HelmetProvider>
  )
}

export default NotFound
