import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;

// creating axios instance from base url
const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
