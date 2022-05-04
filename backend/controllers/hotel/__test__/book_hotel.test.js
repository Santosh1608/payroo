const request = require("supertest");
const app = require("../../../app");
const mongoose = require("mongoose");
const Bookings = require("../../../models/Bookings");
const { bookingStatus } = require("../../../constants/booking");
const Hotel = require("../../../models/Hotel");
const { createHotel, createBooking, getFutureDate } = require("./helpers");

it("Send 401 if user try to book a hotel without signin", async () => {
  const hotel = await createHotel();
  await request(app).post(`/api/hotel/book_hotel/${hotel.id}`).expect(401);
});

it("Returns 400 if booking Date is not provided", async () => {
  const { cookie } = await global.register();
  const hotel = await createHotel();
  await request(app)
    .post(`/api/hotel/book_hotel/${hotel.id}`)
    .set("Cookie", cookie)
    .expect(400);
});

it("Should return 400 if booking date is not in future", async () => {
  const { cookie } = await global.register();
  const hotel = await createHotel();
  await request(app)
    .post(`/api/hotel/book_hotel/${hotel.id}`)
    .set("Cookie", cookie)
    .send({ bookingDate: new Date("29-03-2022") })
    .expect(400);
});

it("Should return 404 if hotel is not found with matching hotel id", async () => {
  const { cookie } = await global.register();
  const unknown_hotelId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .post(`/api/hotel/book_hotel/${unknown_hotelId}`)
    .set("Cookie", cookie)
    .send({ bookingDate: getFutureDate() })
    .expect(404);
});

it("Should return 400 if hotel is already reserved by someone", async () => {
  const { cookie } = await global.register();
  const hotel = await createHotel();
  await createBooking({ hotelId: hotel.id });
  await request(app)
    .post(`/api/hotel/book_hotel/${hotel.id}`)
    .set("Cookie", cookie)
    .send({ bookingDate: getFutureDate() })
    .expect(400);
});

it("Should book the hotel if everything sent correctly", async () => {
  const { cookie } = await global.register();
  const hotel = await createHotel();
  await request(app)
    .post(`/api/hotel/book_hotel/${hotel.id}`)
    .set("Cookie", cookie)
    .send({ bookingDate: getFutureDate() })
    .expect(200);

  const bookingCreated = await Bookings.findOne({ hotelId: hotel.id });
  expect(bookingCreated.bookingStatus).toEqual(bookingStatus.BOOKED);
});
