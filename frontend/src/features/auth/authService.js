import axiosInstance from "../../api/axiosInstance";
import Cookies from "js-cookie";
const API_URL = "/api/auth";

// Register user
const register = async (userData) => {
  const response = await axiosInstance.post(`${API_URL}/register`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axiosInstance.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
  Cookies.remove("session");
};

// Get current user
const get_current_user = async () => {
  const response = await axiosInstance.get(`${API_URL}/get_current_user`);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
  logout,
  login,
  get_current_user,
};

export default authService;
