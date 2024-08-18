import React from 'react'

const Footer = () => {
  return (
    <>
      <hr className='mt-12' />
      <footer className='h-16 md:px-12 flex items-center justify-between   p-4'>
        <div >
          <h1 className='font-bold text-xl'> <i className="ri-blaze-fill text-red-500 text-3xl"></i>PlacementHoga</h1>
          <p className='text-sm'>&copy;2024 All Rights Reserved.</p>
        </div>
        <div className='flex space-x-4'>
          <a className='border shadow-md bg-gray-100 px-1 rounded-full hover:bg-white cursor-pointer' href="https://www.linkedin.com" aria-label="LinkedIn">
            <i className="ri-linkedin-fill text-2xl"></i>
          </a>
          <a className='border shadow-md bg-gray-100 px-1 rounded-full hover:bg-white cursor-pointer' href="https://www.facebook.com" aria-label="Facebook">
            <i className="ri-facebook-fill text-2xl"></i>
          </a>
          <a className='border shadow-md bg-gray-100 px-1 rounded-full hover:bg-white cursor-pointer' href="https://www.instagram.com" aria-label="Instagram">
            <i className="ri-instagram-line text-2xl"></i>
          </a>
        </div>
      </footer>
    </>
  )
}

export default Footer
