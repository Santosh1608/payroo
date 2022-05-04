import React from "react";
import styleClasses from "./BookingWrapper.module.css";
export const BookingWrapper = ({ booking, onCancelBookingHandler }) => {
  return (
    <div className={styleClasses.BookingWrapper}>
      <div className={styleClasses.Booking}>
        <div className={styleClasses.Booking__details}>
          <h3 className={styleClasses.Booking__title}>Booking Details</h3>
          <ul>
            <li>Location: {booking.hotelId.location}</li>
            <li>Booking Id: {booking.id}</li>
            <li>Booking Date: {booking.bookingDate}</li>
            <li>Booking Status: {booking.bookingStatus}</li>
            <li>Hotel: {booking.hotelId.name}</li>
            <li>Price: {booking.hotelId.price}</li>
            {onCancelBookingHandler && (
              <li
                className={styleClasses.CancelBooking}
                onClick={() => onCancelBookingHandler(booking)}
              >
                Cancel Booking
              </li>
            )}
          </ul>
        </div>
        <div className={styleClasses.Booking__rip}></div>
        <div className={styleClasses.Booking__price}>
          <span className={styleClasses.heading}>Price</span>
          <span className={styleClasses.price}>
            &#8377;{booking.hotelId.price}
          </span>
        </div>
      </div>
    </div>
  );
};
