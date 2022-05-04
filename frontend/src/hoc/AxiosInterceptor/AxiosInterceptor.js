import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLayoutEffect } from "react";
import { logout } from "../../features/auth/authSlice";

function AxiosInterceptor({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    axiosInstance.interceptors.request.use(function (config) {
      // Setup withCredentials to true on every request header object
      config.withCredentials = true;
      return config;
    });

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // If token is expired redirect to login page
        if (error.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return children;
}

export default AxiosInterceptor;
