import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

// If user is logged In open requested page else redirect to /login page
const PrivateRouteWrapper = () => {
  const isAuthenticated = Cookies.get("session");
  return isAuthenticated ? (
    <div className="hotel-container">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRouteWrapper;
