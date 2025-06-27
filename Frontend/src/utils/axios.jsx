import axios from "axios";

export const BASE_URL_FOR_USER = "";
export const BASE_URL_FOR_JOB = ""
// http://localhost:5000/api/v1/user/ http://localhost:5000/api/v1/job/

const api = axios.create({
  baseURL:"http://localhost:5000/api/v1/user/" 
})

export default api
