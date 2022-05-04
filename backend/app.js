const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.set("trust proxy", true);

// Require routes
const { authRoutes, hotelRoutes } = require("./routes");

//Setup middlewares
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
    httpOnly: false,
  })
);

//Initialize routes
app.use("/api/auth", authRoutes);
app.use("/api/hotel", hotelRoutes);

module.exports = app;
