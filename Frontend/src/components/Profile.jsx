import React, { useState } from 'react';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppliedJob from './AppliedJob';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import UpdateProfile from './UpdateProfile';

const Profile = () => {
  const { user } = useSelector(store => store.auth);

  return (
    <>
      <div className='md:w-[80%] lg:w-[60%]  mx-auto p-2'>
        <div className='w-full border p-5 rounded-md bg-white'>
          <div className='md:flex justify-between items-center gap-3 '>
            <div className='flex gap-1'>
              <div className='md:flex w-full items-center gap-5'>
                <div className='flex items-center justify-between w-full md:w-40'>
                  <img className='w-32 h-32 border rounded-full object-cover' src="https://i.pinimg.com/originals/d0/d6/eb/d0d6eb27e479fc72acc48f67df6df3a8.jpg" alt="" />
                  <span className=' md:hidden'> <UpdateProfile variant="outline" /></span>
                </div>
                <div>
                  <h2 className='font-semibold text-xl'>{user?.fullname || "Joy Kuamr"}</h2>
                  <p className='text-sm text-gray-600 '>{user?.profile?.bio || "NA"}</p>
                </div>
              </div>
            </div>
            <span className='hidden md:flex'> <UpdateProfile /></span>
          </div>
          <div className='mb-4 mt-1 md:mt-0' >
            <p className='mb-1 font-semibold'>Skills</p>
            {
              user?.profile?.skills.length != 0 && user?.profile?.skills.map((item, idx) => (
                <Button variant="outline" className="m-1" key={idx}>{
                  item
                }</Button>
              ))
            }
          </div>
          <div className='flex items-center gap-5 mb-2'>
            <Mail className='text-gray-500' />
            <span className='text-gray-700'>{user?.email || "NA"}</span>
          </div>
          <div className='flex items-center gap-5 mb-2'>
            <Contact className='text-gray-500' />
            <span className='text-gray-700'> +91 {user?.phoneNumber || "NA"}</span>
          </div>
          <div className='flex items-center gap-5 mb-2'>
            <Link target='_blank' className='flex items-center text-blue-500 '>
              <i className="ri-download-2-fill text-2xl mr-2"></i>
              <p className='hover:underline font-semibold'>{user?.profile?.resumeOriginalName || "NA"}</p>
            </Link>
          </div>
        </div>
        <h1 className='mt-5 font-semibold text-sm text-center md:text-start'>Applied Job</h1>
        <AppliedJob />
      </div>
      <Footer />
    </>
  );
}

export default Profile;
