import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Badge } from './ui/badge';

const Filter = () => {
  const role = [
    {
      location: {
        name: "Location",
        locations: ["Delhi", "Pune", "Bangalore", "Mumbai", "Hyderabad", "Chennai", "Kolkata"]
      },
      role: {
        name: "Role",
        roles: ["Backend Developer", "Frontend Developer", "Full Stack Developer", "Data Scientist", "DevOps Engineer"]
      },
      salary: {
        name: "Salary",
        range: ["0-40k", "40-50k", "50k-1lakh", "1-5lakh"]
      }
    }
  ];
  return (
    <div className='w-full md:w-[20%] bg-slate-50 mt-1 p-5'>
      {
        role.length > 0 ? (
          role.map((item, index) => (
            <div key={index}>
              <h2 className='font-semibold'><i className="ri-map-pin-line"></i> {item.location.name} </h2>
              <hr className='mt-2' />
              <RadioGroup className="p-3">
                {item.location.locations.map((loca, locaIdx) => (
                  <div className="flex items-center space-x-2" key={locaIdx}>
                    <RadioGroupItem value={`${loca}`} id={`r${locaIdx}`} />
                    <Label htmlFor={`r${locaIdx}`}>{loca}</Label>
                  </div>
                ))}
              </RadioGroup>

              <h2 className='font-semibold mt-2'><i className="ri-filter-line"></i> {item.role.name} </h2>
              <hr className='mt-2' />
              <RadioGroup className="p-3">
                {item.role.roles.map((role, roleIdx) => (
                  <div className='flex items-center space-x-2' key={roleIdx}>
                    <RadioGroupItem value={`${role}`} id={`r${roleIdx}`} />
                    <Label htmlFor={`r${roleIdx}`}>{role}</Label>
                  </div>
                ))}
              </RadioGroup>

              <h2 className='font-semibold mt-2'><i className="ri-vip-diamond-line"></i> {item.salary.name} </h2>
              <hr className='mt-2' />
              <RadioGroup className="p-3">
                {item.salary.range.map((salary, salaryIdx) => (
                  <div className='flex space-x-2 items-center' key={salaryIdx}>
                    <RadioGroupItem value={`${salary}`} id={`s${salaryIdx}`} />
                    <Label htmlFor={`s${salaryIdx}`}>{salary}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))
        ) : (<h1>Not found That role</h1>)
      }
    </div>
  )
}

export default Filter