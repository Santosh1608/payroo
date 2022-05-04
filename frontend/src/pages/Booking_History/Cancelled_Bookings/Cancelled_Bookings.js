import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BookingWrapper } from "../../../components/BookingWrapper/BookingWrapper";
import { BookingStatus } from "../../../constants/Booking";

function Cancelled_Bookings() {
  const { booking_history } = useSelector((state) => state.hotel);

  // Setting component state
  const [cancelledBookings, setCancelledBookings] = useState([]);

  // Filter our cancelled bookings
  useLayoutEffect(() => {
    const cancelledBookings = booking_history.filter((booking) => {
      return booking.bookingStatus === BookingStatus.CANCELLED;
    });
    setCancelledBookings(cancelledBookings);
  }, []);

  const showCancelledBookings = cancelledBookings.map((booking) => {
    return <BookingWrapper booking={booking} />;
  });

  return (
    <div>
      {cancelledBookings.length > 0 ? (
        showCancelledBookings
      ) : (
        <div style={{ textAlign: "center" }}> No Cancelled Bookings found</div>
      )}
    </div>
  );
}

export default Cancelled_Bookings;
