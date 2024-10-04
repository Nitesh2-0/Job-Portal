import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { redirect, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import axios from '../../utils/axios';
import { setAllCompany } from '@/redux/companySlice';

const CreateCompany = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {

      const res = await axios.post('/api/v1/company/register', { companyName });

      if (res.data?.success) {
        toast.success(res.data?.message);
        dispatch(setAllCompany(res.data?.companies));
        return redirect('/')
        // navigate(`/company/update-company-information/${res.data?.companies._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to register company.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="my-10">
        <h1 className="font-bold text-3xl mb-2 text-gray-900">Your Company Name</h1>
        <p className="text-gray-600">What would you like to name your company? You can change this later.</p>
      </div>

      <div className="my-6">
        <Label htmlFor="companyName" className="text-lg font-medium">Company Name</Label>
        <div className="relative mt-2">
          <Input
            id="companyName"
            type="text"
            className="pl-10 py-2"
            placeholder="JobHunt, Microsoft, etc."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <i className="ri-building-line absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-400"></i>
        </div>
      </div>

      <div className="flex items-center gap-4 my-10">
        <Button variant="outline" className="flex items-center space-x-2" onClick={() => navigate(-1)}>
          <i className="ri-arrow-go-back-line"></i>
          <span>Cancel</span>
        </Button>
        <Button className="flex items-center space-x-2" onClick={registerNewCompany}>
          <i className="ri-add-line"></i>
          <span>Continue</span>
        </Button>
      </div>
    </div>
  );
}

export default CreateCompany;
