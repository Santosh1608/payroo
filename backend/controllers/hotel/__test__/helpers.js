const Hotel = require("../../../models/Hotel");
const Bookings = require("../../../models/Bookings");
const mongoose = require("mongoose");
const { bookingStatus } = require("../../../constants/booking");
const moment = require("moment");
const { dateFormat } = require("../../../constants/date-field");

const getFutureDate = () => {
  const numberofDaysToAdd = 2;
  return moment().add(numberofDaysToAdd, "day").format(dateFormat);
};

const createHotel = async ({
  id = new mongoose.Types.ObjectId().toHexString(),
  name = "Royal Orchid",
  price = 1000,
  location = "hyderabad",
  ratings = 5,
  bookings = [],
} = {}) => {
  return await new Hotel({
    id,
    name,
    price,
    location,
    ratings,
    bookings,
  }).save();
};

const createBooking = async ({
  id = new mongoose.Types.ObjectId().toHexString(),
  bookingDate = getFutureDate(),
  userId = new mongoose.Types.ObjectId().toHexString(),
  hotelId = new mongoose.Types.ObjectId().toHexString(),
} = {}) => {
  return await new Bookings({
    id,
    bookingStatus: bookingStatus.BOOKED,
    bookingDate,
    userId,
    hotelId,
  }).save();
};

const cancelBooking = async ({
  id = new mongoose.Types.ObjectId().toHexString(),
  bookedDate = getFutureDate(),
  userId = new mongoose.Types.ObjectId().toHexString(),
  hotelId = new mongoose.Types.ObjectId().toHexString(),
} = {}) => {
  return await new Bookings({
    id,
    bookingStatus: bookingStatus.CANCELLED,
    bookingDate: bookedDate,
    userId,
    hotelId,
  }).save();
};

module.exports = {
  cancelBooking,
  createBooking,
  createHotel,
  getFutureDate,
};
