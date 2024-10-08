import React from 'react';
import Card from './shared/Card';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import NoJob from './NoJob';
import getAllJobs from './hook/getAllJobs';
import { HashLoader } from 'react-spinners';

const Browse = () => {
  getAllJobs()
  const { allJobs } = useSelector(state => state.jobs);

  return allJobs.length != 0 ? (
    <>
      <div className='max-w-7xl mt-2 mx-auto px-7 gap-5 h-[100%]'>
        <h1 className='mb-5 mt-5 font-semibold'>Search Results (22)</h1>
        <div className='grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-5'>

          {
            allJobs ? allJobs.map((job) => (
              <Card key={job._id} job={job} />
            )) : <NoJob />
          }
        </div>
      </div >
      <Footer />
    </>
  ) : <div className="flex gap-5 justify-center items-center h-screen">
    <HashLoader color="blue" />
    <span>Loading...</span>
  </div>
}

export default Browse;
