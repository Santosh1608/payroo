const mongoose = require("mongoose");
const { bookingStatus } = require("../constants/booking");
const Bookings = require("./Bookings");

// Setup the schema for hotels
const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// Check if hotel is already booked by someone on given date
hotelSchema.methods.isReserved = async function (bookingDate) {
  const bookedHotel = await Bookings.findOne({
    hotelId: this.id,
    bookingDate,
    bookingStatus: bookingStatus.BOOKED,
  });

  return bookedHotel;
};

module.exports = mongoose.model("Hotel", hotelSchema);
