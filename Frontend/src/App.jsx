import React from 'react';
import { Routes, Route, BrowserRouter as Router, NavLink, Navigate } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Home from './components/shared/Home'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;