import React, { useEffect, useRef, useState } from 'react';
import Card from './shared/Card';
import Footer from './Footer';
import Filter from './Filter';
import { useSelector } from 'react-redux';
import getAllJobs from './hook/getAllJobs';

const Job = () => {
  getAllJobs()
  const { allJobs } = useSelector(state => state.jobs);


  return (
    <>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row max-h-screen'>
        <Filter />
        <hr />
        <div
          className={'w-full overflow-y-auto md:max-h-[80%] grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:w-[80%] p-5 pt-3'}
        >
          {
            allJobs ? (allJobs.map((job) => (
              <Card key={job._id} job={job} />
            ))) : <span></span>
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Job;
