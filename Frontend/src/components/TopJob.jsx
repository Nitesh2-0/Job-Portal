import React, { useState } from 'react';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import calDate from './hook/getCalcluateDate';
import { Button } from '../components/ui/button';
import { HashLoader } from 'react-spinners'

const TopJob = () => {
  const { allJobs } = useSelector(state => state.jobs);
  const [like, setLike] = useState(false)
  return allJobs.length != 0 ? (
    <div className='max-w-7xl flex flex-col mx-auto mt-12'>
      <h1 className='font-bold text-2xl text-center md:text-3xl'>
        <span className='text-blue-700'>Latest & Top</span> Job Openings
      </h1>
      <div className='grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-3 gap-12 p-4'>
        {allJobs.slice(0, 6).map(job => (
          <div key={job._id} className='shadow-md p-4 bg-gray-50 rounded-sm'>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>{calDate(job.createdAt)}</span>
              <div className='flex items-center gap-2'>
                <Link className="w-9 h-9 flex items-center border justify-center rounded-full cursor-pointer" to={`/jobdescriptions/${job._id}`} state={{ job }}>
                  <i className="ri-information-line"></i>
                </Link>
                {
                  like ? (
                    <Button onClick={() => setLike(false)} variant="outline" className="w-9 h-9 flex items-center justify-center rounded-full cursor-not-allowed">
                      <i className="ri-heart-fill text-red-500"></i>
                    </Button>
                  ) : (
                    <Button onClick={() => setLike(true)} variant="outline" className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer">
                      <i className="ri-heart-line"></i>
                    </Button>
                  )
                }
              </div>
            </div>
            <div className='flex items-center gap-5 mb-3'>
              <Avatar className='bg-gray-500 rounded-none'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png" alt="" />
              </Avatar>
              <div>
                <h1 className='font-bold'>{job?.company?.name}</h1>
                <p className='font-semibold'>{job?.title}</p>
              </div>
            </div>
            <p className='mt-3 text-sm text-muted-foreground'>{job?.description}</p>
            <div className='flex justify-between mt-3'>
              <Badge variant="outline" className="text-purple-600 font-bold">
                {job?.location.split(',').slice(-1)}
              </Badge>
              <Badge variant="outline" className="text-red-600 font-bold">{job?.jobType}</Badge>
              <Badge variant="outline" className="text-blue-600 font-bold">
                {job?.salary < 400 ? `${job?.salary} LPA` : `₹ ${job?.salary}`}
              </Badge>
              <Badge variant="outline" className="text-yellow-500 font-bold">
                {job?.openings === 1 ? "1 opening" : `${job?.openings} openings`}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : <div className="flex gap-5 justify-center items-center h-screen">
    <HashLoader color="blue" />
    <span>Loading...</span>
  </div>
};

export default TopJob;
