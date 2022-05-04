import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

// Do not go to login or register page if user already logged In
const PublicRouteWrapper = () => {
  const isAuthenticated = Cookies.get("session");
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRouteWrapper;
