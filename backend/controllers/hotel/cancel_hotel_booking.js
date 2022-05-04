const Booking = require("../../models/Bookings");
const { bookingStatus } = require("../../constants/booking");
const { isPastDate } = require("../../services/isPastDate");

module.exports = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Find the hotel that we need to cancel booking for
    const bookedHotel = await Booking.findById(bookingId);

    //check if hotel is not booked
    if (!bookedHotel || bookedHotel.bookingStatus === bookingStatus.CANCELLED) {
      return res.status(400).send([{ error: "Hotel is not booked" }]);
    }

    //Check if bookedHotel date is not in past
    if (isPastDate(bookedHotel.bookingDate)) {
      return res
        .status(400)
        .send({ error: "Cannot cancel past booking hotels" });
    }

    // Authorize the user to cancel the booking
    if (bookedHotel.userId.toString() !== req.user.id) {
      return res
        .status(400)
        .send({ error: "You are not authorized to cancel the booking" });
    }

    // Set booking status to cancelled
    bookedHotel.set({ bookingStatus: bookingStatus.CANCELLED });

    await bookedHotel.save();
    res.send({ cancelled_hotel: bookedHotel });
  } catch (error) {
    console.error(error);
    res.status(500).send([{ error: "Internal server error" }]);
  }
};
