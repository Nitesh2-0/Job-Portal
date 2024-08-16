import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { useSelector } from 'react-redux'
const Navbar = () => {
  let { user } = useSelector(store => store.auth);
  return (
    <div className='bg-white shadow-md '>
      <div className='mx-auto max-w-7xl flex items-center justify-between p-4 '>
        <div className='flex gap-2 items-center'>
          <Link to="/"><h1 className='font-bold text-xl'> <i className="ri-blaze-fill text-red-500 text-3xl"></i>PlacementHoga</h1></Link>
        </div>
        <div className='flex items-center gap-5'>
          <ul className='hidden lg:flex gap-10'>
            <li className="font-semibold"><NavLink className={(e) => e.isActive ? `text-indigo-600 border-b-2 border-indigo-700` : ""} to="/">Home</NavLink></li>
            <li className="font-semibold"><NavLink className={(e) => e.isActive ? `text-indigo-600 border-b-2 border-indigo-700` : ""} to="/jobs">Jobs</NavLink></li>
            <li className="font-semibold"><NavLink className={(e) => e.isActive ? `text-indigo-600 border-b-2 border-indigo-700` : ""} to="/browse">Browse</NavLink></li>
          </ul>

          {
            !user ? (
              <div className='flex gap-4'>
                <Link to="/login"><Button className="md:px-5 border hover:text-white  md:text-black hover:bg-gray-700 " variant="outlier">Login</Button></Link>
                <Link to="/signup"><Button className="md:px-5 border hover:text-white md:text-white hover:bg-blue-600 md:bg-blue-500" variant="outlier">Singup</Button></Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <img className='w-12' src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722470400&semt=sph" alt="" />
                </PopoverTrigger>
                <PopoverContent className='w-80 shadow-md'>
                  <div className='flex items-center gap-2 bg-white'>
                    <img className='w-24 flex justify-center' src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722470400&semt=sph" alt="" />
                    <div>
                      <h1 className='font-semibold'>{user?.fullname}</h1>
                      {
                        user?.profile?.bio ? (
                          <p className='text-sm text-muted-foreground'>
                            {user?.profile?.bio.length > 150
                              ? user?.profile?.bio.slice(0, 150) + "..."
                              : user?.profile?.bio}
                          </p>
                        ) : (
                          <span className='text-red-500'>NA</span>
                        )
                      }
                    </div>
                  </div>
                  <hr className=' md:hidden' />
                  <ul className=' lg:hidden gap-10'>
                    <li className="font-semibold p-2 " ><NavLink className={(e) => e.isActive ? `text-indigo-600 border-b-2 border-indigo-700` : ""} to="/">Home</NavLink></li>
                    <hr />
                    <li className="font-semibold p-2 "><NavLink className={(e) => e.isActive ? `text-indigo-600 border-b-2 border-indigo-700` : ""} to="/jobs">Jobs</NavLink></li>
                    <hr />
                    <li className="font-semibold p-2 "><NavLink className={(e) => e.isActive ? `text-indigo-600 border-b-2 border-indigo-700` : ""} to="/browse">Browse</NavLink></li>
                  </ul>
                  <hr />
                  <div className='px-6 mt-2 flex items-center bg-white'>
                    <User2 />
                    <Button variant="link"><Link to="/profile">Profile</Link></Button>
                  </div>
                  <div className='px-6 flex items-center bg-white'>
                    <LogOut />
                    <Button variant="link">Logout</Button>
                  </div>
                </PopoverContent>
              </Popover>
            )
          }
        </div>
      </div >
    </div >
  )
}

export default Navbar