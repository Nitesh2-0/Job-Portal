import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector(store => store.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginEventHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post("/api/v1/user/login", input);
      console.log(res.data); 

      if (res.data.success) {
        const { user, token } = res.data;
        dispatch(setUser({ user, token }));
        localStorage.setItem('token', token);
        toast.success(res.data?.message || 'Login Successfully 🎉');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred 👿');
    } finally {
      dispatch(setLoading(false));
    }
  };


  return (
    <div className='w-full lg:mt-12 lg:max-w-7xl flex items-center justify-between lg:mx-auto px-4 sm:px-0'>
      <div className='hidden  w-[90%] lg:block'>
        <img src="https://liveassets.ca/wp-content/uploads/2023/09/Newcomers-Guide-Navigating-Canadas-Job-Market-Live-Assets.jpeg" alt="Login Illustration" className='max-w-full h-auto' />
      </div>
      <form onSubmit={loginEventHandler} className='w-full lg:w-1/2 rounded-md p-6 my-10 bg-white '>
        <h1 className='text-2xl text-center font-semibold mb-6'>Login</h1>
        <div className='mb-4'>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="example@gmail.com"
            className="mt-1"
            required
          />
        </div>
        <div className='mb-4'>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="Your Password"
            className="mt-1"
            required
          />
        </div>
        <fieldset className='mt-4 mb-6'>
          <legend className='text-sm font-medium mb-2'>Role</legend>
          <RadioGroup defaultValue="student" className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                id="student"
                name='role'
                value="student"
                checked={input.role === 'student'}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="student">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                id="recruiter"
                name='role'
                value="recruiter"
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </RadioGroup>
        </fieldset>
        <Button type="submit" className="w-full p-2 mb-4" disabled={loading}>
          {loading ? <Loader2 className='h-4 w-4 animate-spin mr-2' /> : 'Login'}
        </Button>
        <div className='text-center'>
          <span className='text-sm text-muted-foreground'>
            Don't have an account?
            <Link to="/signup" className="text-blue-600 ml-1">Sign Up Here</Link>
          </span>
        </div>
      </form>
    </div>
  )
};

export default Login;
