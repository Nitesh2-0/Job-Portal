import React from 'react';
import Card from './shared/Card';
import Footer from './Footer';

const Browse = () => {
  const search = [1, 2, 3, 4, 5, 6, 7, 8,11,22,88,7,5];
  return (
    <>
      <div className='max-w-7xl mt-2 mx-auto px-7 gap-5 h-[100%]'>
        <h1 className='mb-5 mt-5 font-semibold'>Search Results (22)</h1>
        <div className='grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5'>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          {
            search.map((item,index) => (
              <Card key={index} />
            ))
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Browse;
