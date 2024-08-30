import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { PopoverContent, PopoverTrigger, Popover } from '../ui/popover';
import { Avatar, AvatarImage } from '../ui/avatar';
import Footer from '../Footer';
import getAllCompany from '../hook/getAllCompany';
import { useNavigate } from 'react-router-dom';

const CompanyTable = ({userId}) => {
  const { allCompany } = useSelector(store => store.company);
  const navigate = useNavigate()
  const [companies, setCompanies] = useState(allCompany || []);

  const defult_url = "https://medvirturials.com/img/old_logo.png"


  return companies.length !== 0 ? (
    <div className='w-full mt-12'>
      <Table>
        <TableCaption>A list of compnay registed by you.</TableCaption>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            companies?.reverse().map((val, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Avatar className="rounded-none">
                    <AvatarImage src={val.logo || defult_url} alt={`${val.name} logo`} />
                  </Avatar>
                </TableCell>
                <TableCell>{val.name}</TableCell>
                <TableCell>{val.createdAt.split('T')[0].split('-').reverse().join('-')}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="border-none">
                        <i className="ri-more-2-line"></i>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="border border-slate-200 bg-white shadow-md rounded-lg p-3 w-40 flex items-center space-x-2">
                      <i className="ri-pencil-line text-cyan-700"></i>
                      <span className="text-gray-700 font-medium">Edit</span>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  ) : (
    <div className='font-bold flex items-center justify-center mt-20 mb-20'>
      <p>No Companies Available</p>
      <Button variant="secondary" className="ml-4" onClick={() => navigate(`/job-admin/company/${userId}`)}>Add Company</Button>
    </div>
  );
}

export default CompanyTable