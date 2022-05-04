const { bookingStatus } = require("../../constants/booking");
const Bookings = require("../../models/Bookings");
const Hotel = require("../../models/Hotel");
const { isPastDate } = require("../../services/isPastDate");
const moment = require("moment");
module.exports = async (req, res) => {
  let searchDate = moment(req.body.searchDate).format("YYYY-MM-DD");

  try {
    // Should not get hotels for past dates
    if (isPastDate(searchDate)) {
      return res.status(400).send([{ error: "Cannot search for past dates" }]);
    }
    // Find all booked hotels id's in Bookings collection
    const AlreadyBookedHotels = await Bookings.find({
      bookingDate: searchDate,
      bookingStatus: bookingStatus.BOOKED,
    }).distinct("hotelId");

    //Find avaliable hotels by selecting all hotels from hotel collection except those booked hotels that we found in previous step
    const avaliableHotels = await Hotel.find({
      _id: { $nin: AlreadyBookedHotels },
    });

    res.send(avaliableHotels);
  } catch (error) {
    console.error(error);
    res.status(500).send([{ error: "Internal server error" }]);
  }
};
