import { useEffect } from "react"
import axios from "../../utils/axios"
import { useDispatch } from 'react-redux';
import { setSingleCompany } from "@/redux/companySlice";

const getSingleCompany = (id) => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   const fetchCompanyById = async () => {
  //     try {
  //       const res = await axios.get(`/api/v1/company/get/${id}`)
  //       if (res.data?.success) {
  //         console.log(res.data);
  //         dispatch(setSingleCompany(res.data?.company))
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchCompanyById()
  // }, [id])
}

export default getSingleCompany