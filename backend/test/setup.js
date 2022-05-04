const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

jest.setTimeout(60000);
let mongo;
beforeAll(async () => {
  // Connect to in memory mongo database
  mongo = new MongoMemoryServer();

  // Start in memory mongo database
  await mongo.start();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  // remove all the data from mongodb for each test case
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// close the mongodb database
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

// test register with the application
global.register = async () => {
  const name = "Santhosh";
  const email = "test@test.com";
  const password = "Password123!@#";

  const response = await request(app)
    .post("/api/auth/register")
    .send({
      name,
      email,
      password,
    })
    .expect(200);

  const cookie = response.get("Set-Cookie");

  return { cookie, user: response.body };
};
