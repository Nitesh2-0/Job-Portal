import { BASE_URL_FOR_JOB } from '@/utils/axios'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setAllJobs } from '@/redux/jobSlice';

const getAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${BASE_URL_FOR_JOB}/get`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setAllJobs(res.data?.jobs))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllJobs();
  }, [])
}

export default getAllJobs