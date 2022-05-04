import React, { useState, useEffect, useRef } from "react";
import { FaSignOutAlt, FaHotel } from "react-icons/fa";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { DatePicker } from "react-rainbow-components";
import styleClasses from "./Header.module.css";
import { createAlert } from "../../helpers/createAlert";
import { Alert } from "../../constants/Alert";
export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Setting component state
  const [date, setDate] = useState("");

  // Remove date on location change
  useEffect(() => {
    const paths = location.pathname.split("/");
    if (!paths.includes("available_hotels")) {
      setDate("");
    } else {
      if (!date) {
        navigate("/");
      }
    }
  }, [location.pathname]);

  // Handlers
  const onLogoutHandler = () => {
    dispatch(logout());
    createAlert({
      alert: [{ success: "Logout Successful" }],
      type: Alert.SUCCESS,
    });
    navigate("/login");
  };

  const onDateChangeHandler = (date) => {
    navigate(`/available_hotels/${date}`);
    setDate(date);
  };

  // Styles classes for history logo and datepicker
  const HistoryNavClasses = ["custom-btn", "custom-btn-text"];
  const LogoNavClasses = [styleClasses.Logo];

  return (
    <header className={styleClasses.Header}>
      <div className={styleClasses.LeftWrapper}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? LogoNavClasses.concat(styleClasses.activeLogo).join(" ")
              : LogoNavClasses
          }
          to="/"
        >
          <FaHotel />
        </NavLink>
      </div>
      <div className={styleClasses.NavigationWrapper}>
        <div className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto">
          <DatePicker
            placeholder="Hotel Availability"
            value={date}
            onChange={onDateChangeHandler}
            className={styleClasses.DatePicker}
            minDate={new Date()}
          />
        </div>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? HistoryNavClasses.concat("custom-btn-positive-active").join(" ")
              : HistoryNavClasses.concat("custom-btn-positive-reverse").join(
                  " "
                )
          }
          to={"/booking_history"}
        >
          History
        </NavLink>

        <NavLink
          className="custom-btn custom-btn-positive-reverse custom-btn-neutral-reverse custom-btn-text"
          to={"#"}
          onClick={onLogoutHandler}
        >
          <FaSignOutAlt /> Logout
        </NavLink>
      </div>
    </header>
  );
};
