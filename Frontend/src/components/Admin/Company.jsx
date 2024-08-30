import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import getAllCompany from '../hook/getAllCompany';
import { useNavigate } from 'react-router-dom';
import CompanyTable from './CompanyTable';
import Footer from '../Footer';

const Company = () => {
  getAllCompany()
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate()
  const [name, setName] = useState()
  return (
    <>
      <div className='w-[90%] md:w-[80%] min-h-1/2 mx-auto mt-6'>
        <h1 className="text-center text-2xl font-extrabold mb-8">
          Hi, <span className="text-indigo-600 block sm:inline">{user?.fullname}</span> Welcome Back 🎉
        </h1>
        <div className='w-full gap-10 md:flex items-center justify-between'>
          <div className="relative md:w-96">
            <Input
              type="text"
              placeholder="Filter by Keyword, e.g., Microsoft"
              className="pl-10"
              value={name}
              onChange={(evt) => setName(evt.target.value)}
            />
            <i className="ri-search-line absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-400"></i>
          </div>
          <Button
            type="submit"
            className="w-full mt-5 md:mt-0 bg-indigo-500 hover:bg-indigo-600 md:w-32 flex items-center justify-center space-x-2"
            onClick={() => navigate(`/job-admin/company/${user._id}`)}
          >
            <i className="ri-add-line"></i>
            <span>Add Company</span>
          </Button>
        </div>
        <CompanyTable userId={user._id} />
      </div>
      <Footer />
    </>
  )
}

export default Company