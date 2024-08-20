import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import moment from 'moment';
import Footer from './Footer';
import NoJob from '../components/NoJob';

const JobDescription = () => {
  const [isAppliedAvailable, setIsAppliedAvailable] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  if (!job) {
    return <NoJob />;
  }

  const locationParts = job.location.split(',');
  const lastTwoParts = locationParts.slice(-2).join(', ');

  const formattedDate = moment(job.createdAt).format('D-MMMM-YYYY | h:mm:ss A');

  return (
    <>
      <div className='w-[90%] md:w-[80%] min-h-[65vh] border md:border-none mx-auto mt-12 bg-white rounded-lg overflow-hidden'>
        <div className='md:flex items-center justify-between p-5 border-b border-gray-200'>
          <div className='flex gap-5 items-center'>
            <Avatar className='bg-gray-500 rounded-none'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png" alt="Company Logo" />
            </Avatar>
            <div className='ml-4 flex-grow'>
              <h1 className='text-2xl font-semibold'>{job.company.name}</h1>
              <p className='text-gray-600 text-sm'>{job.jobType} | {lastTwoParts}</p>
            </div>
          </div>
          {isAppliedAvailable ? (
            <Button disabled className='bg-gray-400 mt-8 w-full md:w-auto md:mt-0 text-white'>
              Already Applied
            </Button>
          ) : (
            <Button onClick={() => setIsAppliedAvailable(true)} className='bg-cyan-600 mt-8 w-full md:w-auto md:mt-0 text-white hover:bg-cyan-700'>
              Apply
            </Button>
          )}
        </div>
        <div className='p-5'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center text-cyan-600 hover:text-cyan-800 focus:outline-none mb-4'
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span>Go to Previous</span>
          </button>
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
