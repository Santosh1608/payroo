import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Booking } from "../../constants/Booking";
import { view_booking_history } from "../../features/hotel/hotelSlice";
import Past_Bookings from "./Past_Bookings/Past_Bookings";
import UpComing_Bookings from "./UpComing_Bookings/UpComing_Bookings";
import styleClasses from "./Booking_History.module.css";
import Cancelled_Bookings from "./Cancelled_Bookings/Cancelled_Bookings";
import { Alert } from "../../constants/Alert";
import { createAlert } from "../../helpers/createAlert";
import { Loader } from "../../components/Loader/Loader";
function BookingHistory() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.hotel);

  // Setting component state
  const [show, setShow] = useState(Booking.UPCOMING);

  // Fetching booking history on page load
  useEffect(() => {
    const viewBookingHistory = async () => {
      try {
        await dispatch(view_booking_history()).unwrap();
      } catch (error) {
        console.error(error);
        createAlert({ alert: error, type: Alert.ERROR });
      }
    };
    viewBookingHistory();
  }, []);

  if (loading) {
    return <Loader />;
  }

  // Set active class for styling purpose
  const upcomingButtonClasses = [];
  const pastButtonClasses = [];
  const cancelledButtonClasses = [];

  if (show === Booking.UPCOMING) {
    upcomingButtonClasses.push(styleClasses.active);
  } else if (show === Booking.PAST) {
    pastButtonClasses.push(styleClasses.active);
  } else {
    cancelledButtonClasses.push(styleClasses.active);
  }

  return (
    <div>
      <div className={styleClasses.BookingButtonsWrapper}>
        <button
          className={`${cancelledButtonClasses.join(",")}`}
          onClick={() => setShow(Booking.CANCELLED)}
        >
          CANCELLED
        </button>
        <button
          className={`${pastButtonClasses.join(",")}`}
          onClick={() => setShow(Booking.PAST)}
        >
          PAST
        </button>
        <button
          className={`${upcomingButtonClasses.join(",")}`}
          onClick={() => setShow(Booking.UPCOMING)}
        >
          UPCOMING
        </button>
      </div>
      {show === Booking.UPCOMING && (
        <UpComing_Bookings setShow={setShow} loading={loading} />
      )}
      {show === Booking.PAST && <Past_Bookings loading={loading} />}
      {show === Booking.CANCELLED && <Cancelled_Bookings loading={loading} />}
    </div>
  );
}

export default BookingHistory;
