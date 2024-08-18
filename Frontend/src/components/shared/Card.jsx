import React from 'react'
import { Avatar } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Link } from 'react-router-dom'

const Card = () => {
  return (
    <Link to="/jobdescriptions" className='shadow-md p-4 rounded-sm'>
      <div className='flex justify-between'>
        <span className='text-sm text-muted-foreground'>2 day ago</span>
        <Badge variant="outline" className="py-2"> <i className="ri-heart-line cursor-pointer"></i></Badge>
      </div>
      <div className='flex items-center gap-5 mt-3'>
        <Avatar className='bg-gray-500 rounded-none'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png" alt="" />
        </Avatar>
        <div>
          <h1 className='font-bold'>Microsoft</h1>
          <p className='text-sm text-muted-foreground'>India</p>
        </div>
      </div>
      <h2 className='mt-3 mb-1 font-semibold'>Software Developer Intern</h2>
      <p className='mt-1 text-sm text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi quos ea quod?</p>
      <div className='flex justify-between mt-3'>
        <Badge variant="outline" className="text-red-600 font-bold">Part Time</Badge>
        <Badge variant="outline" className="text-blue-600 font-bold">21 LPA</Badge>
        <Badge variant="outline" className="text-purple-600 font-bold">22 positions</Badge>
      </div>
    </Link>
  )
}

export default Card