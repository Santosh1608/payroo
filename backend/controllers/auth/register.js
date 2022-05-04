const User = require("../../models/User");
module.exports = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    // Check if user not already registered in database
    if (!user) {
      user = await new User(req.body).save();

      // Create jwt token
      const token = user.createToken();

      // Store it on session object
      req.session = {
        jwt: token,
      };
      res.send(user);
    } else {
      return res.status(400).send([{ error: "Already Signed up" }]);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send([
      {
        error: "Something went wrong",
      },
    ]);
  }
};
