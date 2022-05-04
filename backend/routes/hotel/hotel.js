const router = require("express").Router();
const { check } = require("express-validator");
const { isSignedIn } = require("../../middlewares/require-auth");
const {
  view_all_hotels,
  book_hotel,
  view_available_hotels_on_particular_date,
  cancel_hotel_booking,
  booking_history,
} = require("../../controllers/hotel");
const { validateRequest } = require("../../middlewares/validate-request");

// View all hotels exists in the database
router.get("/view_all_hotels", isSignedIn, view_all_hotels);

// View only available hotels on particular date
router.post(
  "/view_available_hotels_on_particular_date",
  isSignedIn,
  check("searchDate").not().isEmpty().withMessage("Must send date"),
  validateRequest,
  view_available_hotels_on_particular_date
);

// Book the hotel by providing hotel Id and booking date
router.post(
  "/book_hotel/:hotelId",
  isSignedIn,
  check("bookingDate").not().isEmpty().withMessage("Must send date"),
  validateRequest,
  book_hotel
);

// Cancel the booked Hotel by providing booking Id
router.delete(
  "/cancel_hotel_booking/:bookingId",
  isSignedIn,
  cancel_hotel_booking
);

// Get the history of bookings that have been placed be the user
router.get("/booking_history", isSignedIn, booking_history);

module.exports = router;
