import { setAllCompany } from "@/redux/companySlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from '../../utils/axios'


const getAllCompany = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchAllcompany = async () => {
      try {
        const res = await axios.get('/api/v1/company/get');
        console.log(res.data.companies);
        
        if (res) {
          dispatch(setAllCompany(res.data?.companies))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllcompany()
  }, []);
}

export default getAllCompany