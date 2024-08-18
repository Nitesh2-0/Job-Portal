import React from 'react';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TopJob = () => {
  const { allJobs } = useSelector(state => state.jobs);

  const calDate = (value) => {
    const dayBefore = moment().diff(value, 'days');
    if (dayBefore === 0) return "Today"
    if (dayBefore === 1) return "Yesterday"
    if (dayBefore > 1 && dayBefore < 7) return `${dayBefore} day ago`
    const weekCal = Math.floor(dayBefore / 7);
    if (weekCal == 1) return `${weekCal} Week ago`
    return `${weekCal} Weeks ago`

  }

  return (
    <div className='max-w-7xl flex flex-col mx-auto mt-12'>
      <h1 className='font-bold text-2xl text-center md:text-3xl'>
        <span className='text-blue-700'>Latest & Top</span> Job Openings
      </h1>
      <div className='grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-3 gap-12 p-4'>
        {allJobs.slice(0, 6).map(job => (
          <div key={job._id} className='shadow-md p-4 bg-gray-50 rounded-sm'>
            <div className='flex items-center justify-between mb-3'>
              <span className='text-sm text-muted-foreground'>
                {/* {moment().diff(moment(job.createdAt), 'days')} day{moment().diff(moment(job.createdAt), 'days') !== 1 ? 's' : ''} ago */}
                {calDate(job.createdAt)}
              </span>
              <Badge variant="outline" className="py-2 cursor-pointer">
                <i className="ri-heart-line"></i>
              </Badge>
              <Link to={`/jobdescriptions/${job._id}`} state={{ job }} className="px-2 rounded-full py-1 border">
                <i className="ri-more-2-fill"></i>
              </Link>
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
  );
};

export default TopJob;
