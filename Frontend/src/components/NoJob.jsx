import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'

const NoJob = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center max-h-screen text-center'>
        <img
          src="https://casc.edu.bd/media/icon/No-data-found-banner.png" 
          alt="No Data"
        />
        <h2 className='font-semibold text-2xl text-gray-700'>Sorry! No job data available.</h2>
        <p className='mt-2 text-gray-500'>It seems we couldn't find the job you're looking for.</p>
        <Link to="/jobs" className='mt-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
          Explore Other Jobs
        </Link>
      </div>
      <Footer />
    </>
  )
}

export default NoJob
