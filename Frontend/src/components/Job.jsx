import React from 'react';


import Card from './shared/Card';
import Footer from './Footer';
import Filter from './Filter';

const Job = () => {

  return (
    <>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row max-h-[89vh]'>
        <Filter />
        <hr />
        <div className='w-full overflow-y-auto md:max-h-[80%] grid gap-5 grid-cols-1 md:grid-cols-3 md:w-[80%] p-5 pt-3'>
          {
            Array.from({ length: 12 }).sort().map((_, i) => (
              <Card key={i} />
            ))
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Job;
