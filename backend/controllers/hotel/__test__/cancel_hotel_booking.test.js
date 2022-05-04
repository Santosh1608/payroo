const request = require("supertest");
const app = require("../../../app");
const mongoose = require("mongoose");
const Bookings = require("../../../models/Bookings");
const Hotel = require("../../../models/Hotel");
const { bookingStatus } = require("../../../constants/booking");
const { cancelBooking, createHotel, createBooking } = require("./helpers");

it("Send 401 if user try to cancel hotel booking without signin", async () => {
  const booking = await createBooking();
  await request(app)
    .delete(`/api/hotel/cancel_hotel_booking/${booking.id}`)
    .expect(401);
});

it("Return 400 if hotel is not booked already or cancelled before", async () => {
  const { cookie } = await global.register();
  const bookingId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .delete(`/api/hotel/cancel_hotel_booking/${bookingId}`)
    .set("Cookie", cookie)
    .expect(400);
});

it("Return 400 if hotel booking is cancelled", async () => {
  const { cookie } = await global.register();
  const booking = await cancelBooking();
  await request(app)
    .delete(`/api/hotel/cancel_hotel_booking/${booking.id}`)
    .set("Cookie", cookie)
    .expect(400);
});

it("Return 400 if booked Hotel date is in past", async () => {
  const { cookie } = await global.register();
  const booking = await cancelBooking({ bookedDate: "2020-03-29" });
  await request(app)
    .delete(`/api/hotel/cancel_hotel_booking/${booking.id}`)
    .set("Cookie", cookie)
    .expect(400);
});

it("Return 400 if user try to cancel booking for other user's booking", async () => {
  const { cookie } = await global.register();
  const booking = await createBooking();

  await request(app)
    .delete(`/api/hotel/cancel_hotel_booking/${booking.id}`)
    .set("Cookie", cookie)
    .expect(400);
});

it("Should cancel the booked hotel if everything sent correctly", async () => {
  const { cookie, user } = await global.register();
  const hotel = await createHotel();
  const booking = await createBooking({ hotelId: hotel.id, userId: user.id });
  await request(app)
    .delete(`/api/hotel/cancel_hotel_booking/${booking.id}`)
    .set("Cookie", cookie)
    .expect(200);

  const CancelledBooking = await Bookings.findById(booking.id);
  expect(CancelledBooking.bookingStatus).toEqual(bookingStatus.CANCELLED);
});
