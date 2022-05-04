const Hotel = require("../../models/Hotel");
module.exports = async (req, res) => {
  try {
    // Find all hotels in database
    const hotels = await Hotel.find();

    res.send(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).send([{ error: "Internal server error" }]);
  }
};
