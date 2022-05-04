const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      throw new Error();
    }
    //compare passwords
    const isAuthenticated = await user.comparePasswords(req.body.password);
    if (!isAuthenticated) {
      throw new Error();
    }
    if (isAuthenticated) {
      //create jwt token
      const token = user.createToken();
      // Store it on session object
      req.session = {
        jwt: token,
      };
      res.send(user);
    }
  } catch (error) {
    res.status(400).send([
      {
        error: "Incorrect Credentials",
      },
    ]);
  }
};
