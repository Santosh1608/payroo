import React, { useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Booking, BookingStatus } from "../../../constants/Booking";
import {
  cancel_booking,
  view_booking_history,
} from "../../../features/hotel/hotelSlice";
import { createAlert } from "../../../helpers/createAlert";
import { Alert } from "../../../constants/Alert";
import { Modal } from "../../../components/Modal/Modal";
import { ConfirmationCard } from "../../../components/ConfirmationCard/ConfirmationCard";
import { BookingWrapper } from "../../../components/BookingWrapper/BookingWrapper";

function UpComing_Bookings({ setShow }) {
  const dispatch = useDispatch();
  const { booking_history } = useSelector((state) => state.hotel);

  // Setting component state
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [cancelBooking, setCancelBooking] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Filter upcoming booking history
  useLayoutEffect(() => {
    const upcomingBookings = booking_history.filter((booking) => {
      return (
        moment(new Date(booking.bookingDate)).isSameOrAfter(
          moment(new Date()).format("YYYY-MM-DD")
        ) && booking.bookingStatus === BookingStatus.BOOKED
      );
    });
    setUpcomingBookings(upcomingBookings);
  }, [booking_history]);

  // Handlers
  const confirmCancellationHandler = async () => {
    try {
      await dispatch(cancel_booking(cancelBooking.id)).unwrap();
      await dispatch(view_booking_history()).unwrap();
      setModalOpen(false);
      setShow(Booking.CANCELLED);
      createAlert({
        alert: [{ success: "Booking Cancelled" }],
        type: Alert.SUCCESS,
      });
    } catch (error) {
      console.error(error);
      createAlert({ alert: error, type: Alert.ERROR });
    }
  };

  const onCancelBookingHandler = async (booking) => {
    setModalOpen(true);
    setCancelBooking(booking);
  };

  const showUpComingBookings = upcomingBookings.map((booking) => {
    return (
      <BookingWrapper
        key={booking.id}
        booking={booking}
        onCancelBookingHandler={onCancelBookingHandler}
      />
    );
  });

  return (
    <div>
      <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen}>
        <ConfirmationCard
          hotel={cancelBooking?.hotelId}
          date={cancelBooking?.bookingDate}
          confirmHandler={confirmCancellationHandler}
          setModalOpen={setModalOpen}
          isBookable={false}
        />
      </Modal>
      {upcomingBookings.length > 0 ? (
        showUpComingBookings
      ) : (
        <div style={{ textAlign: "center" }}>No UpComing Bookings made</div>
      )}
    </div>
  );
}

export default UpComing_Bookings;
