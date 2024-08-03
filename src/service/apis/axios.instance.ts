import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const axiosInstanceWithToken = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { 'x-auth-token': localStorage.getItem("token") },
});
