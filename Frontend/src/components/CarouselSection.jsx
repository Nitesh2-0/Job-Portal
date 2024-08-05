import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';

const CarouselSection = () => {
  const roleDev = [
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Mobile App Developer",
    "Data Scientist",
    "AI/ML Engineer",
    "Cloud Engineer",
    "UI/UX Designer",
    "Software Engineer",
    "Game Developer"
  ];

  return (
    <div className='max-w-[80%] md:max-w-[75%] lg:max-w-[50%] xlg:max-w-[40%] flex mx-auto flex-col px-5'>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {roleDev.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/3 p-5  xl:p-4 "
            >
              <Button className="text-black bg-transparent border hover:bg-gray-100 w-full">
                <span className="text-base font-semibold">{item}</span>
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default CarouselSection;
