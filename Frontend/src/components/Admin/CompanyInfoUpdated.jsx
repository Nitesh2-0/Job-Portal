import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import { HashLoader } from 'react-spinners';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Button } from '../../components/ui/button';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyInfoUpdated = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.auth);

  const [info, setInfo] = useState(null);
  const [input, setInput] = useState({
    name: "",
    location: "",
    website: "",
    description: "",
    logo: null
  });

  useEffect(() => {
    const fetchCompanyById = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`/api/v1/company/get/${id}`);
        if (res.data?.success) {
          const company = res.data?.company;
          dispatch(setSingleCompany(company))
          setInfo(company);
          setInput({
            name: company?.name || "",
            location: company?.location || "",
            website: company?.website || "",
            description: company?.description || "",
            file: company?.logo || null
          });
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchCompanyById();
  }, [id, dispatch]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeEventFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.put(`/api/v1/company/update/${id}`, input);

      if (res.data?.success) {
        toast.success(res.data?.message);
      } else {
        toast.error("Failed to update company information.");
      }
    } catch (error) {
      console.error("Error updating company data:", error);
      toast.error("An error occurred while updating the company information.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  console.log(input);

  return info ? (
    <div className="flex items-center justify-center ">
      <form onSubmit={handleSubmit} className="md:w-[70%] w-full p-8 mt-4 mb-12 md:mb-0">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Update Company Information
        </h2>

        <div className="md:flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              <i className="ri-building-line text-xl mr-2"></i> Company Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Enter company name"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              <i className="ri-map-pin-line text-xl mr-2"></i> Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={input.location}
              onChange={changeEventHandler}
              placeholder="Enter company location"
            />
          </div>
        </div>

        <div className="md:flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
              <i className="ri-link-line text-xl mr-2"></i> Website URL
            </label>
            <input
              type="url"
              id="website"
              name="website"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={input.website}
              onChange={changeEventHandler}
              placeholder="Enter company website URL"
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="logo">
              <i className="ri-image-line text-xl mr-2"></i> Website Logo
            </label>
            <input
              type="file"
              id="file"
              name="file"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={changeEventFileHandler}
              accept="image/*"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            <i className="ri-file-text-line text-xl mr-2"></i> Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="6"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={input.description}
            onChange={changeEventHandler}
            placeholder="Enter company description"
          ></textarea>
        </div>

        <div className="flex gap-4 mb-4">
          <Button
            type="button"
            className="flex items-center justify-center w-1/2 bg-red-500 border-2 border-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Go Back
          </Button>
          <Button
            type="submit"
            className="flex items-center justify-center w-1/2 bg-blue-500 border-2 border-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? (
              <>
                <HashLoader size={20} color="#fff" />
                <span className="ml-2">Updating...</span>
              </>
            ) : (
              'Update Information'
            )}
          </Button>
        </div>

      </form >
    </div >
  ) : (
    <div className="flex gap-5 justify-center items-center h-screen">
      <HashLoader color="blue" />
      <span>Loading...</span>
    </div>
  );
};

export default CompanyInfoUpdated;
