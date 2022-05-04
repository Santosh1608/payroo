const request = require("supertest");
const app = require("../../../app");
const { createHotel } = require("./helpers");

it("Returns 401 if user try to view hotels without Signed In", async () => {
  await request(app).get("/api/hotel/view_all_hotels").expect(401);
});

it("Should fetch all hotels from the database", async () => {
  const { cookie } = await global.register();
  // Create Hotels in database
  await Promise.all([createHotel(), createHotel(), createHotel()]);

  const { body: all_hotels } = await request(app)
    .get("/api/hotel/view_all_hotels")
    .set("Cookie", cookie)
    .expect(200);

  expect(all_hotels.length).toEqual(3);
});
