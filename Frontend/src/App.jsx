import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Home from './components/shared/Home'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Job from './components/Job';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import CreateJob from './components/Admin/CreateJob';
import Company from './components/Admin/Company';
import CreateCompany from './components/Admin/CreateCompany';
import CompanyInfoUpdated from './components/Admin/CompanyInfoUpdated';


const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobdescriptions/:id" element={<JobDescription />} />
        <Route path="/job-admin/company" element={<Company />} />
        <Route path="/job-admin/jobs" element={<CreateJob />} />
        <Route path="/job-admin/company/:id" element={<CreateCompany />} />
        <Route path="/job-admin/company/update-company-information/:id" element={<CompanyInfoUpdated />} />
      </Routes>
    </>
  );
}

export default App;
