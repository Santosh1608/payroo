const mongoose = require("mongoose");
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
  } catch (error) {
    console.error("Database not connected", error);
    process.exit(1);
  }
})();
