import React from 'react'
import { Avatar } from '../ui/avatar'
import { Badge } from '../ui/badge'

const Card = ({ index, value }) => {
  return (
    <div key={index} className='shadow-md p-4 bg-gray-50 rounded-sm'>
      <p className='flex justify-between'>
        <span>2 day ago</span>
        <i className="ri-heart-line"></i>
      </p>
      <div className='flex items-center gap-5 mt-5'>
        <Avatar className='bg-gray-500 rounded-none'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png" alt="" />
        </Avatar>
        <div>
          <h1 className='font-bold'>Microsoft</h1>
          <p className='font-semibold'>Software Enginner Intern</p>
        </div>
      </div>
      <p className='mt-3 text-sm text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi quos ea quod?</p>
      <div className='flex justify-between mt-3'>
        <Badge variant="outline" className="text-purple-600 font-bold">India</Badge>
        <Badge variant="outline" className="text-red-600 font-bold">Part Time</Badge>
        <Badge variant="outline" className="text-blue-600 font-bold">21 LPA</Badge>
        <Badge variant="outline" className="text-yellow-500 font-bold">22 positions</Badge>
      </div>
    </div>
  )
}

export default Card