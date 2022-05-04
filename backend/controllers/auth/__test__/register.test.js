const request = require("supertest");
const app = require("../../../app");

it("returns a 400 with an invalid email", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Santhosh",
      email: "alskdflaskjfd",
      password: "Password123!@#",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Santhosh",
      email: "santhosh@gmail.com",
      password: "p",
    })
    .expect(400);
});

it("returns a 400 with an invalid name", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "S",
      email: "santhosh@gmail.com",
      password: "Password123!@#",
    })
    .expect(400);
});

it("returns 400 with missing email", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      password: "Password123!@#",
      name: "Santhosh",
    })
    .expect(400);
});

it("returns 400 with missing password", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      email: "test@test.com",
      name: "Santhosh",
    })
    .expect(400);
});

it("returns 400 with missing name", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      password: "Password123!@#",
      email: "nannisantosh@gmail.com",
    })
    .expect(400);
});

it("do not allows duplicate emails", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Santhosh",
      email: "test@test.com",
      password: "Password123!@#",
    })
    .expect(200);

  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Santhosh",
      email: "test@test.com",
      password: "Password123!@#",
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Santhosh",
      email: "test@test.com",
      password: "Password123!@#",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
