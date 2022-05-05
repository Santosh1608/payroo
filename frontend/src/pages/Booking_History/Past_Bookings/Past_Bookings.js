import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { BookingStatus } from "../../../constants/Booking";
import { BookingWrapper } from "../../../components/BookingWrapper/BookingWrapper";
function Past_Bookings() {
  const { booking_history } = useSelector((state) => state.hotel);

  // Setting component state
  const [pastBookings, setPastBookings] = useState([]);

  // Filter past bookings
  useLayoutEffect(() => {
    const pastBookings = booking_history.filter((booking) => {
      return (
        moment(new Date(booking.bookingDate)).isBefore(
          moment(new Date()).format("YYYY-MM-DD")
        ) && booking.bookingStatus === BookingStatus.BOOKED
      );
    });
    setPastBookings(pastBookings);
  }, []);

  const showPastBookings = pastBookings.map((booking) => {
    return <BookingWrapper key={booking.id} booking={booking} />;
  });

  return (
    <div>
      {pastBookings.length > 0 ? (
        showPastBookings
      ) : (
        <div style={{ textAlign: "center" }}>No Past Bookings</div>
      )}
    </div>
  );
}

export default Past_Bookings;
