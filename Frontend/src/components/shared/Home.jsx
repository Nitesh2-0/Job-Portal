import CarouselSection from '../CarouselSection'
import HeroSection from '../HeroSection'
import React from 'react'
import TopJob from '../TopJob'
import Footer from '../Footer'
import getAllJobs from '../hook/getAllJobs'

const Home = () => {
  getAllJobs()
  return (
    <>
      <HeroSection />
      <CarouselSection />
      <TopJob />
      <Footer />
    </>
  )
}

export default Home