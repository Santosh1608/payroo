const { bookingStatus } = require("../../constants/booking");
const Hotel = require("../../models/Hotel");
const Bookings = require("../../models/Bookings");
const moment = require("moment");
const { isPastDate } = require("../../services/isPastDate");

module.exports = async (req, res) => {
  try {
    const bookingDate = moment(req.body.bookingDate).format("YYYY-MM-DD");

    const { hotelId } = req.params;

    //Check bookingDate is future date
    if (isPastDate(bookingDate)) {
      return res.status(400).send([{ error: "Cannot book for past dates" }]);
    }

    // Find the hotel that we need to book
    const hotel = await Hotel.findById(hotelId);

    //Check if hotel exists
    if (!hotel) {
      return res.status(404).send([{ error: "Hotel not found" }]);
    }

    //Check if hotel is reserved
    const Reserved = await hotel.isReserved(bookingDate);
    if (Reserved) {
      return res.status(400).send([{ error: "Hotel is already reserved" }]);
    }

    //Book the hotel
    const booking = new Bookings({
      hotelId: hotel._id,
      userId: req.user._id,
      bookingDate,
      bookingStatus: bookingStatus.BOOKED,
    });

    //Save the booking
    await booking.save();
    res.send(booking);
  } catch (error) {
    console.error(error);
    res.status(500).send([{ error: "Internal server error" }]);
  }
};
