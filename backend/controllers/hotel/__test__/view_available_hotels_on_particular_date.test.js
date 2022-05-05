const request = require("supertest");
const app = require("../../../app");
const moment = require("moment");
const { createHotel, createBooking } = require("./helpers");
const { dateFormat } = require("../../../constants/date-field");
it("Returns 401 if user try to view available hotels on particular date without signin", async () => {
  await request(app)
    .post("/api/hotel/view_available_hotels_on_particular_date")
    .expect(401);
});

it("Returns 400 if Date is not provided", async () => {
  const { cookie } = await global.register();
  await request(app)
    .post("/api/hotel/view_available_hotels_on_particular_date")
    .set("Cookie", cookie)
    .expect(400);
});

it("Should send all available hotels on particular date", async () => {
  const currentDate = moment().format(dateFormat);
  const { cookie } = await global.register();
  const hotel1 = await createHotel({ name: "Playfair", price: 1000 });
  const hotel2 = await createHotel({ name: "High Star", price: 2000 });
  const hotel3 = await createHotel({ name: "Ibis", price: 3000 });
  await createBooking({ hotelId: hotel1.id, bookingDate: currentDate });
  await createBooking({ hotelId: hotel2.id, bookingDate: currentDate });

  const { body: available_hotels } = await request(app)
    .post("/api/hotel/view_available_hotels_on_particular_date")
    .set("Cookie", cookie)
    .send({ searchDate: currentDate })
    .expect(200);

  expect(available_hotels.length).toEqual(1);
  expect(available_hotels[0].id).toEqual(hotel3.id);
});
