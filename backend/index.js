//connect to database
require("./config/database");

const app = require("./app");
const PORT = process.env.PORT || 8000;

const start = () => {
  app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
};

// Start the server
start();
