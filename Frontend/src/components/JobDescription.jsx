import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import Footer from './Footer';
import axios from '../utils/axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice.js';
import { HashLoader } from 'react-spinners';

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.jobs);
  const { user } = useSelector(store => store.auth);
  const [isAppliedAvailable, setIsAppliedAvailable] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();


  const appyBtnHandler = async () => {
    try {
      const res = await axios.get(`/api/v1/application/apply/${singleJob?._id}`);
      if (res.data.success) {
        toast.success(res.data?.message);
        setIsAppliedAvailable(true);
        setShouldFetch(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const res = await axios.get(`/api/v1/job/get/${id}`);
        if (res.data?.success) {
          dispatch(setSingleJob(res?.data?.job));
          const track = res?.data?.job.applications;
          const ans = track.some(application => application?.applicant === user?._id);
          setIsAppliedAvailable(ans);
        } else {
          toast.error('Failed to fetch job details');
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || 'An error occurred');
        console.log(error);
      }
    };

    if (shouldFetch) {
      fetchJobData();
      setShouldFetch(false);
    }
  }, [id, dispatch, user._id, shouldFetch]);


  if (!singleJob) {
    return (
      <div className="flex gap-5 justify-center items-center h-screen">
        <HashLoader color="blue" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className='w-[90%] md:w-[80%] min-h-[65vh] border md:border-none mx-auto mt-12 bg-white rounded-lg overflow-hidden'>
        <div className='md:flex items-center justify-between p-5 border-b border-gray-200'>
          <div className='flex gap-5 items-center'>
            <Avatar className='bg-gray-500 rounded-none'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png" alt="Company Logo" />
            </Avatar>
            <div className='ml-4 flex-grow'>
              <h1 className='text-2xl font-semibold'>{singleJob.company.name}</h1>
              <p className='text-gray-600 text-sm'>{singleJob.jobType} | {singleJob.location.split(',').slice(-2).join(',')}</p>
            </div>
          </div>
          {user.role === 'student' && (
            <Button
              onClick={appyBtnHandler}
              disabled={isAppliedAvailable}
              className='mt-8 w-full bg-indigo-600 hover:bg-indigo-500 md:w-auto md:mt-0 text-white'
            >
              {isAppliedAvailable ? 'Already Applied' : 'Apply Now'}
            </Button>
          )}
        </div>
        <div className='p-5'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center text-indigo-600 hover:text-indigo-800 focus:outline-none mb-4'
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
            <strong>Role :- </strong> {singleJob.title}
          </p>
          <p className='text-gray-700 mb-2'>
            <strong>Description :- </strong> {singleJob.description}
          </p>
          <p className='text-gray-700 mb-2'>
            <strong>Location :- </strong> {singleJob.location}
          </p>
          <p className='text-gray-700 mb-2'>
            <strong>Salary :- </strong> {singleJob.salary > 99 ? `₹ ${singleJob.salary}` : `${singleJob.salary} LPA`}
          </p>
          <p className='text-gray-700 mb-2'>
            <strong>Openings :- </strong> {singleJob.openings}
          </p>
          <p className='text-gray-700 mb-2'>
            <strong>Requirements :- </strong> {singleJob.requirements.join(', ')}
          </p>
          <p className='text-gray-700 mb-2'>
            <strong>Applicants :- </strong> {singleJob.applications?.length}
          </p>
          <p className='text-gray-700 mb-2'>
            <strong>Posted Date :- </strong> {singleJob.createdAt.split('T')[0].split('-').reverse().join('/')}
          </p>
        </div>
      </div >
      <Footer />
    </>
  );
};

export default JobDescription;
