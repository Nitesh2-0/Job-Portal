import React from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import moment from 'moment';
import Footer from './Footer';

const JobDescription = () => {
  const location = useLocation();
  const job = location.state?.job;

  if (!job) {
    return <div className='text-center mt-5'>No job data available.</div>;
  }

  const locationParts = job.location.split(',');
  const lastTwoParts = locationParts.slice(-2).join(', ');

  const formattedDate = moment(job.createdAt).format('D-MMMM-YYYY | h:mm:ss A');

  const applied = false;

  return (
    <>
      <div className='w-[90%] md:w-[80%] h-[65vh] border md:border-none mx-auto mt-12 bg-white rounded-lg overflow-hidden'>
        <div className='md:flex items-center justify-between p-5 border-b border-gray-200'>
          <div className='flex gap-5 items-center'>
            <Avatar className='bg-gray-500 rounded-none'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png" alt="" />
            </Avatar>
            <div className='ml-4 flex-grow'>
              <h1 className='text-2xl font-semibold'>{job.company.name}</h1>
              <p className='text-gray-600 text-sm'>{job.jobType} | {lastTwoParts}</p>
            </div>
          </div>
          {applied ? (
            <Button disabled className='bg-gray-400 mt-8 w-full md:w-auto md:mt-0 text-white'>
              Already Applied
            </Button>
          ) : (
            <Button className='bg-cyan-600 mt-8 w-full md:w-auto md:mt-0 text-white hover:bg-cyan-700'>
              Apply
            </Button>
          )}
        </div>
        <div className='p-5'>
          <h2 className='text-xl font-semibold mb-3'>Job Details</h2>
          <p className='text-gray-700 mb-2'>
            <strong>Role :- </strong> {job.title}
          </p>
          <p className='text-gray-700 mb-2'>
            <strong>Description :- </strong> {job.description}
          </p>
          <p className='text-gray-700 mb-2'>
            <strong>Location :- </strong> {job.location}
          </p>
          <p className='text-gray-700 mb-2'>
            <strong>Salary :- </strong> {job.salary > 99 ? `₹ ${job.salary}` : `${job.salary} LPA`}
          </p>
          <p className='text-gray-700 mb-2'>
            <strong>Openings :- </strong> {job.openings}
          </p>
          <p className='text-gray-700 mb-2'>
            <strong>Requirements :- </strong> {job.requirements.join(', ')}
          </p>
          <p className='text-gray-700 mb-2'>
            <strong>Posted Date :- </strong> {formattedDate}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobDescription;
