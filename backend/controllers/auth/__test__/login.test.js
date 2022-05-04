const request = require("supertest");
const app = require("../../../app");

it("returns a 400 with an invalid email", async () => {
  await request(app)
    .post("/api/auth/login")
    .send({
      email: "alskdflaskjfd",
      password: "Password123!@#",
    })
    .expect(400);
});

it("fails when a email that does not exist is supplied", async () => {
  await request(app)
    .post("/api/auth/login")
    .send({
      email: "test@test.com",
      password: "Password123!@#",
    })
    .expect(400);
});

it("Return 400 when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Santhosh",
      email: "test@test.com",
      password: "Password123!@#",
    })
    .expect(200);

  await request(app)
    .post("/api/auth/login")
    .send({
      email: "test@test.com",
      password: "aslkdfjalskdfj",
    })
    .expect(400);
});

it("responds with a cookie when valid credentials are sent", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Santhosh",
      email: "test@test.com",
      password: "Password123!@#",
    })
    .expect(200);

  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "test@test.com",
      password: "Password123!@#",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
