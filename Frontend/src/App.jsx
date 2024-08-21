import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Home from './components/shared/Home'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Job from './components/Job';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';


const App = () => {

  let token = null
  useEffect(() => {
    token = localStorage.getItem("token")
  }, [])

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
      </Routes>
    </>
  );
}

export default App;
