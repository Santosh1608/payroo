const Bookings = require("../../models/Bookings");

module.exports = async (req, res) => {
  try {
    //Find all booking history from Bookings collection
    const bookings = await Bookings.find({ userId: req.user._id })
      .populate("hotelId")
      .sort({ updatedAt: "desc" });
    res.send(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).send([{ error: "Internal server error" }]);
  }
};
