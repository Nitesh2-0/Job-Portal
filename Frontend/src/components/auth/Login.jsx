import React, { useState } from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { BASE_URL_FOR_USER } from '../../utils/axios'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { loading } = useSelector(store => store.auth)
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const loginEventHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${BASE_URL_FOR_USER}login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data?.message || 'Login Successfully 🎉')
        navigate('/')
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred 👿');
    } finally {
      dispatch(setLoading(false))
    }
  };

  return (
    <div className='w-full lg:max-w-7xl flex items-center justify-center lg:mx-auto'>
      <form onSubmit={loginEventHandler} className='w-[80%] lg:w-1/2 border border-gray-200 rounded-md p-4 my-10'>
        <h1 className='text-2xl text-center font-semibold'>Login</h1>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="example@gmail.com" className="mt-1 mb-2" />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="Example@gmail#123" className="mt-1 mb-2" />
        </div>
        <div className='mt-4 mb-4 flex justify-between items-center'>
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
          loading ? <Button type="submit" className="w-full p-2 mb-3"><Loader2 className='h-4 w-4 animate-spin mr-2' />⚡ Please wait for a while. </Button> : <Button type="submit" className="w-full p-2 mb-3">Login</Button>
        }
        <span className='text-sm text-muted-foreground mt-5 mb-5'>Don't have an accoun? <Link to="/signup" className="text-blue-600">SignUp Here</Link></span>
      </form>
    </div>
  )
}

export default Login