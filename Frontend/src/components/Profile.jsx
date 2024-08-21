import React, { useState } from 'react';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppliedJob from './AppliedJob';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import UpdateProfile from './UpdateProfile';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Profile = () => {
  const { user } = useSelector(store => store.auth);
  console.log(user);

  const defaultUrl = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";

  return (
    <>
      <div className='md:w-[80%] lg:w-[60%]  mx-auto p-2'>
        <div className='w-full border p-5 rounded-md bg-white'>
          <div className='md:flex justify-between items-center gap-3 '>
            <div className='flex gap-1'>
              <div className='md:flex w-full items-center gap-5'>
                <div className='flex flex-col items-center justify-center w-full md:w-40'>
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user?.profile?.profilePhoto || defaultUrl} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className='md:hidden mt-2'>
                    <UpdateProfile variant="outline" />
                  </span>
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
                <Button variant="outline" className="m-1 font-mono" key={idx}>{
                  item.toUpperCase()
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
            <Link to={user?.profile?.resume} target='_blank' className='flex items-center text-blue-500 '>
              <i className="ri-download-2-fill text-2xl mr-2"></i>
              <p className='hover:underline font-semibold'>{user?.profile?.resumeOriginalName.slice(0, 30) || "NA"}</p>
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
