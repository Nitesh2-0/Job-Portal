import { Badge } from '../components/ui/badge'
import React from 'react'

const HeroSection = () => {
  return (
    <div className='text-center my-10 p-5'>
      <Badge variant="outline" className="text-xl md:text-midum"> <p>India's <span className='text-red-600'>#1</span> Job Portal.</p></Badge>
      <div className='flex flex-col text-center justify-center md:w-[70%] lg:w-[50%] mx-auto '>
        <h1 className='font-extrabold text-3xl md:text-5xl mt-12 mb-4'>Search, Apply & <br /> Get Your <span className='text-blue-800'>Dream Job.</span> </h1>
        <p className=''>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde possimus aut architecto neque sequi, dolor quos fugit eaque blanditiis accusamus.</p>
      </div>
      <div className='flex items-center shadow-md rounded-full mx-auto md:w-[70%] lg:w-[50%] mt-8'>
        <input type="text" className='h-12 w-full outline-none bg-gray-50 p-5 rounded-l-full' placeholder='Find your dream job.' />
        <h1 className='h-12 outline-none bg-blue-500 hover:bg-blue-600 flex items-center cursor-pointer rounded-r-full p-5 '><i className="ri-search-line text-center text-white font-bold"></i></h1>
      </div>
    </div>
  )
}

export default HeroSection