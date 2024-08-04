import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const axiosInstanceWithToken = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { 'x-auth-token': localStorage.getItem("token") },
});

axiosInstanceWithToken.interceptors.request.use(
  config => {
    // Do something before request is sent

    config.headers["x-auth-token"] = localStorage.getItem("token");
    return config;
  },
  error => {
    Promise.reject(error);
  }
);