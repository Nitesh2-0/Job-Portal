import React from 'react';
import { Button } from './ui/button';
import { Contact, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppliedJob from './AppliedJob';

const Profile = () => {
  const skills = ["react", "redux", "typescript", "mongodb", "graphql", "docker", "kubernetes", "aws", "azure", "python", "java", "c++", "rust", "golang", "swift", "kotlin"];
  return (
    <div className='md:w-[80%] lg:w-[60%] mx-auto p-2'>
      <div className='w-full border p-5 rounded-md bg-white'>
        <div className='md:flex items-center gap-3 '>
          <img className='w-32 h-32  rounded-full object-cover' src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722470400&semt=sph" alt="Profile" />
          <div className='flex gap-1'>
            <div className='flex flex-col gap-2'>
              <div>
                <h2 className='font-semibold text-xl'>Full Name</h2>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, animi placeat? Amet sequi ullam quisquam architecto commodi tempora provident cum, possimus impedit velit, doloribus, vitae error minima modi quod iste?</p>
              </div>
            </div>
            <Button variant="outline">
              <i className="ri-pencil-line text-red-600"></i>
            </Button>
          </div>
        </div>
        <div className='mb-4 mt-1 md:mt-0' >
          <p className='mb-1 font-semibold'>Skills</p>
          {
            skills.map((item, idx) => (
              <Button variant="outline" className="m-1" key={idx}>{item}</Button>
            ))
          }
        </div>
        <div className='flex items-center gap-5 mb-2'>
          <Mail className='text-gray-500' />
          <span className='text-gray-700'>sivani@gmail.com</span>
        </div>
        <div className='flex items-center gap-5 mb-2'>
          <Contact className='text-gray-500' />
          <span className='text-gray-700'>+91 91550-61725</span>
        </div>
        <div className='flex items-center gap-5 mb-2'>
          <Link to='/resume' className='flex items-center text-blue-500 hover:underline'>
            <i className="ri-download-2-fill text-2xl mr-2"></i>Download Resume
          </Link>
        </div>
      </div>
      <h1 className='mt-5 font-semibold text-sm text-center md:text-start'>Applied Job</h1>
      <AppliedJob />
    </div>
  );
}

export default Profile;
