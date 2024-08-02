import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
const Navbar = () => {
  let user = false;
  return (
    <div className='bg-white shadow-md '>
      <div className='mx-auto max-w-7xl flex items-center justify-between p-4 '>
        <div className='flex gap-2 items-center'>
          <i className="ri-blaze-fill text-red-500 text-3xl"></i>
          <Link to="/"><h1 className='text-2xl md:text-3xl font-semibold'>Job<span>Pulse</span></h1></Link>
        </div>
        <div className='flex items-center gap-5'>
          <ul className='hidden lg:flex gap-10'>
            <li className="font-semibold"><Link>Home</Link></li>
            <li className="font-semibold"><Link>Jobs</Link></li>
            <li className="font-semibold"><Link>Browser</Link></li>
          </ul>

          {
            !user ? (
              <div className='flex gap-4'>
                <Link to="/login"><Button className="md:px-5 text-white hover:bg-gray-700 bg-gray-600" variant="outlier">Login</Button></Link>
                <Link to="/signup"><Button className="md:px-5 text-white hover:bg-blue-600 bg-blue-500" variant="outlier">Singup</Button></Link>
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
                      <h1>Nitesh Kumar</h1>
                      <p className='text-sm text-muted-foreground'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                    </div>
                  </div>
                  <hr />
                  <div className='px-6 mt-2 flex items-center bg-white'>
                    <User2 />
                    <Button variant="link">Profile</Button>
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