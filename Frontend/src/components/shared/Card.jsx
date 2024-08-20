import React, { useState } from 'react'
import { Avatar } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Link } from 'react-router-dom'
import calDate from '../hook/getCalcluateDate'
import { Button } from '../../components/ui/button'

const Card = ({ job }) => {
  const [like, setLike] = useState(false)
  return (
    <div className='shadow-md p-4  rounded-sm transition-transform transform hover:scale-105 max-w-xs h-64'>
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
      <div className='flex items-center gap-5 mt-3'>
        <Avatar className='bg-gray-500 rounded-none'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png" alt="Microsoft logo" className='w-12 h-12' />
        </Avatar>
        <div>
          <h1 className='font-bold'>{job.company?.name}</h1>
          <p className='text-sm text-muted-foreground'>{job.location.split(',').slice(-1)}</p>
        </div>
      </div>
      <h2 className='mt-3 mb-1 font-semibold'>{job.title}</h2>
      <p className='mt-1 text-sm text-muted-foreground'>{job.description.length > 100 ? `${job.description.slice(0, 81)} ...` : job.description}</p>
      <div className='flex justify-between mt-3'>
        <Badge variant="outline" className="text-red-600 font-bold">{job.jobType}</Badge>
        <Badge variant="outline" className="text-blue-600 font-bold">{job.salary > 99 ? `₹ ${job.salary}` : `${job.salary} LPA`}</Badge>
        <Badge variant="outline" className="text-purple-600 font-bold"> {job?.openings === 1 ? "1 opening" : `${job?.openings} openings`}</Badge>
      </div>
    </div>
  )
}

export default Card
