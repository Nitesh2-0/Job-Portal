import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from '../../utils/axios';
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
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading } = useSelector((state) => state.auth)
 

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("fullName", input.fullName);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("password", input.password);
      formData.append("role", input.role);
      formData.append("file", input.file);

      const res = await axios.post("/api/v1/user/register", formData);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className='w-full lg:max-w-7xl flex gap-2 items-center justify-between  mx-auto'>
      <div className='hidden w-[70%] mx-auto md:flex lg:block'>
        <img
          src="https://png.pngtree.com/png-vector/20220526/ourmid/pngtree-online-registration-or-sign-up-login-for-account-on-smartphone-app-png-image_4740847.png"
          alt="Signup Illustration"
          className='w-full h-full'
          style={{ perspective: '1000px' }}
        />
      </div>
      <form onSubmit={signupHandler} className='w-[40%] lg:w-1/2 rounded-md p-4 my-10'>
        <h1 className='text-2xl text-center font-semibold'>SignUp</h1>
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            name="fullName"
            value={input.fullName}
            onChange={changeEventHandler}
            placeholder="Nitesh Kumar"
            className="mt-1 mb-2"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="example@gmail.com"
            className="mt-1 mb-2"
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="number"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            placeholder="9877445567"
            className="mt-1 mb-2"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="Example@gmail#123"
            className="mt-1 mb-2"
          />
        </div>
        <div className='mt-6 mb-4 lg:flex justify-between items-center'>
          <div className='lg:flex items-center gap-4'>
            <Label htmlFor="file">Profile</Label>
            <Input
              id="file"
              type="file"
              name="file"
              accept="image/*"
              onChange={fileHandler}
              className="cursor-pointer"
            />
          </div>
          <RadioGroup defaultValue="comfortable" className="flex mt-4 lg:mt-0">
            <div className="flex items-center space-x-2">
              <Input
                id="student"
                type="radio"
                checked={input.role === 'student'}
                name='role'
                value="student"
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="student">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                id="recruiter"
                type="radio"
                checked={input.role === 'recruiter'}
                name='role'
                value="recruiter"
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </RadioGroup>
        </div>
        <Button
          type="submit"
          className="w-full p-2 mb-3 bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ⚡ Please wait
            </>
          ) : (
            'Signup'
          )}
        </Button>
        <span className='text-sm text-muted-foreground mt-5 mb-5'>
          Already have an account? <Link to="/login" className="text-blue-600">Login Here</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
