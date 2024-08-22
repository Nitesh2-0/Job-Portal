import React, { useEffect, useRef, useState } from 'react';
import Card from './shared/Card';
import Footer from './Footer';
import Filter from './Filter';
import { useSelector } from 'react-redux';
import getAllJobs from './hook/getAllJobs';
import { HashLoader } from 'react-spinners';

const Job = () => {
  getAllJobs()
  const { allJobs } = useSelector(state => state.jobs);

  return allJobs.length != 0 ? (
    <>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row max-h-screen'>
        <Filter />
        <hr />
        {allJobs.length !== 0 ? <div
          className={'w-full overflow-y-auto md:max-h-[80%] grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:w-[80%] p-5 pt-3'}
        >
          {
            allJobs ? (allJobs.map((job) => (
              <Card key={job._id} job={job} />
            ))) : <span></span>
          }
        </div> : <div className="flex w-[80%] gap-5 justify-center items-center h-screen">
          <HashLoader color="#e30f2b" />
          <span>Loading...</span>
        </div>
        }
      </div>
      <Footer />
    </>
  ) : <div className="flex gap-5 justify-center items-center h-screen">
    <HashLoader color="#e30f2b" />
    <span>Loading...</span>
  </div>
}

export default Job;
