import React, { useState } from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { BASE_URL_FOR_USER } from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  })

  const navigate = useNavigate();
  const dispathch = useDispatch();
  const { loading } = useSelector(store => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const fileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const signupHandler = async (e) => {
    e.preventDefault();
    try {

      dispathch(setLoading(true))
      const formData = new FormData();
      formData.append("fullName", input.fullName);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("password", input.password);
      formData.append("role", input.role);
      formData.append("file", input.file);

      const res = await axios.post(`${BASE_URL_FOR_USER}register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login')
      }
      console.log(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
      console.log(error);
    } finally {
      dispathch(setLoading(false))
    }
  };


  return (
    <div className='w-full lg:max-w-7xl flex items-center justify-center mx-auto'>
      <form onSubmit={signupHandler} className='w-[85%] lg:w-1/2 border border-gray-200 rounded-md p-4 my-10'>
        <h1 className='text-2xl text-center font-semibold'>SignUp</h1>
        <div>
          <Label>Full Name</Label>
          <Input type="text" name="fullName" value={input.fullName} onChange={changeEventHandler} placeholder="Nitesh Kumar" className="mt-1 mb-2" />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="example@gmail.com" className="mt-1 mb-2" />
        </div>
        <div>
          <Label>Phone Number</Label>
          <Input type="Number" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} placeholder="9877445567" className="mt-1 mb-2" />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="Example@gmail#123" className="mt-1 mb-2" />
        </div>
        <div className='mt-6 mb-4 lg:flex justify-between items-center'>
          <div className='lg:flex items-center gap-4'>
            <Label>Profile</Label>
            <Input type="file" name="file" accept="image/*" onChange={fileHandler} className="cursor-pointer" />
          </div>
          <RadioGroup defaultValue="comfortable" className="flex">
            <div className="flex items-center space-x-2">
              <Input type="radio" checked={input.role == 'student'} name='role' value="student" onChange={changeEventHandler} className="cursor-pointer" />
              <Label htmlFor="r2">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input type="radio" checked={input.role == 'recruiter'} name='role' value="recruiter" onChange={changeEventHandler} className="cursor-pointer" />
              <Label htmlFor="r3">Recruiter</Label>
            </div>
          </RadioGroup>
        </div>
        {
          loading ? <Button type="submit" className="w-full p-2 mb-3  bg-blue-600 hover:bg-blue-700"><Loader2 className='mr-2 h-4 w-4 animate-spin' />⚡ Please wait for a while. </Button> : <Button type="submit" className="w-full p-2 mb-3  bg-blue-600 hover:bg-blue-700">Signup</Button>
        }
        <span className='text-sm text-muted-foreground mt-5 mb-5'>Already have an accoun? <Link to="/login" className="text-blue-600">Login Here</Link></span>
      </form>
    </div>
  )
}

export default Signup