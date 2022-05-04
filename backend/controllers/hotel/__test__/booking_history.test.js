const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../../app");
const { createBooking } = require("./helpers");

it("Send 401 if user try to view booking history without signin", async () => {
  await request(app).get("/api/hotel/booking_history").expect(401);
});

it("Should send booking history of only signedIn user and status 200", async () => {
  const { cookie, user } = await global.register();
  const userId1 = user.id;
  const userId2 = new mongoose.Types.ObjectId().toHexString();

  //Create first booking in database
  const firstBooking = await createBooking({ userId: userId1 });

  //Create second booking in database
  await createBooking({ userId: userId2 });

  const { body: booking_history } = await request(app)
    .get("/api/hotel/booking_history")
    .set("Cookie", cookie)
    .expect(200);

  expect(booking_history.length).toEqual(1);
  expect(booking_history[0].id).toEqual(firstBooking.id);
});
