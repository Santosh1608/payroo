const request = require("supertest");
const app = require("../../../app");

it("returns a 401 if jwt token is not sent", async () => {
  await request(app).get("/api/auth/get_current_user").expect(401);
});

it("returns current signedIn user", async () => {
  const { cookie, user } = await global.register();
  const { body: currentUser } = await request(app)
    .get("/api/auth/get_current_user")
    .set("Cookie", cookie)
    .expect(200);

  expect(currentUser.name).toEqual(user.name);
  expect(currentUser.id).toEqual(user.id);
});
