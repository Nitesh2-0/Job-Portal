import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  // baseURL:"https://job-portal-server-2ee8.onrender.com",
  withCredentials: true,
});

export default instance;
