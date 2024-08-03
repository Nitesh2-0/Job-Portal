import React from 'react'
import { Avatar } from './ui/avatar'
import { Badge } from './ui/badge'

const TopJob = () => {
  const card = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className='max-w-7xl flex mt-12 flex-col mx-auto'>
      <h1 className='font-bold text-2xl text-center md:text-3xl'><span className='text-blue-700'>Latest & Top</span> Job Openings,</h1>
      <div className='grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-3 gap-12 p-4'>
        {
          card.slice(0,6).map((item, index) => (
            <div key={index} className='shadow-md p-4 bg-gray-50 rounded-sm'>
              <p className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>2 days ago</span>
                <i className="ri-heart-line"></i>
              </p>
              <div className='flex items-center gap-5 mt-5'>
                <Avatar className='bg-gray-500 rounded-none'>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png" alt="Microsoft Logo" />
                </Avatar>
                <div>
                  <h1 className='font-bold'>Microsoft</h1>
                  <p className='font-semibold'>Software Engineer Intern</p>
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
          ))
        }
      </div>
    </div>
  )
}

export default TopJob
