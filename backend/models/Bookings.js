const mongoose = require("mongoose");
const { bookingStatus } = require("../constants/booking");

// Setup the schema for bookings
const bookingSchema = new mongoose.Schema(
  {
    bookingStatus: {
      type: String,
      enum: [bookingStatus.BOOKED, bookingStatus.CANCELLED],
      required: true,
    },
    bookingDate: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("Bookings", bookingSchema);
