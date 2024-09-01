import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { LogOut, User2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from '../../utils/axios';
import { setUser } from '@/redux/authSlice';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const Navbar = () => {

  const defaultUrl = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
  const { user } = useSelector((store) => store.auth);

  let path = "/home"
  if (!user) {
    path = "/"
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get('/api/v1/user/logout');
      localStorage.removeItem('token');

      if (res) {
        toast.success(res.data?.message);
        dispatch(setUser(false));
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className='bg-white shadow-md'>
      <div className='mx-auto max-w-7xl flex items-center justify-between p-4'>
        <div className='flex gap-2 items-center'>
          <Link to={path}>
            <h1 className='font-bold text-xl'>
              <i className='ri-blaze-fill text-red-500 text-3xl'></i> PlacementHoga
            </h1>
          </Link>
        </div>
        <div className='flex items-center gap-5'>
          {
            user?.role === 'recruiter' ? (<ul className='hidden lg:flex gap-10'>
              {['Company', 'Jobs'].map((item) => (
                <li key={item} className='font-semibold'>
                  <NavLink
                    className={(e) =>
                      e.isActive
                        ? 'text-indigo-600 border-b-2 border-indigo-700'
                        : ''
                    }
                    to={`/job-admin/${item.toLowerCase()}`}
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>) : (
              <ul className='hidden lg:flex gap-10'>
                {['Home', 'Jobs','Browse'].map((item) => (
                  <li key={item} className='font-semibold'>
                    <NavLink
                      className={(e) =>
                        e.isActive
                          ? 'text-indigo-600 border-b-2 border-indigo-700'
                          : ''
                      }
                      to={`${item.toLowerCase()}`}
                    >
                      {item}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )
          }

          {!user ? (
            <div className='flex gap-4'>
              <Link to='/login'>
                <Button className='md:px-5 md:bg-[#01DEBF] text-white border hover:text-white  md:hover:bg-[#26b39e]'>
                  Login
                </Button>
              </Link>
              <Link to='/signup'>
                <Button className='hidden md:flex md:px-5 border hover:text-white md:text-white hover:bg-blue-600 md:bg-blue-500'>
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user?.profile?.profilePhoto || defaultUrl} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className='w-80 shadow-md'>
                <div className='flex items-center gap-2 bg-white p-4'>
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={user?.profile?.profilePhoto || defaultUrl} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className='font-semibold'>{user?.fullname}</h1>
                    <p className='text-sm text-muted-foreground'>
                      {user?.profile?.bio
                        ? user.profile.bio.length > 150
                          ? `${user.profile.bio.slice(0, 150)}...`
                          : user.profile.bio
                        : 'No bio available'}
                    </p>
                  </div>
                </div>
                <hr className='md:hidden' />
                <ul className='lg:hidden gap-10 p-2'>
                  {['Home', 'Jobs', 'Browse'].map((item) => (
                    <li key={item} className='font-semibold'>
                      <NavLink
                        className={(e) =>
                          e.isActive
                            ? 'text-indigo-600 border-b-2 border-indigo-700'
                            : ''
                        }
                        to={`/${item.toLowerCase()}`}
                      >
                        {item}
                      </NavLink>
                      <hr />
                    </li>
                  ))}
                </ul>
                <hr />
                <div className='px-6 mt-2 flex items-center bg-white'>
                  <User2 />
                  <Button variant='link'>
                    <Link to='/profile'>Profile</Link>
                  </Button>
                </div>
                <div className='px-6 flex items-center bg-white'>
                  <LogOut />
                  <Button variant='link' onClick={logoutHandler}>
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
