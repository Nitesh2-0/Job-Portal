import api from '../../utils/axios'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setAllJobs } from '@/redux/jobSlice';

const getAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get('/api/v1/job/get', { withCredentials: true });
        if (res.data.success) {
          dispatch(setAllJobs(res.data?.jobs))
        }
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllJobs();
  }, [])
}

export default getAllJobs