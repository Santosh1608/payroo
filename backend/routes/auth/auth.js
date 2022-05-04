const router = require("express").Router();
const { check } = require("express-validator");

const { login, register, get_current_user } = require("../../controllers/auth");
const { isSignedIn } = require("../../middlewares/require-auth");
const { validateRequest } = require("../../middlewares/validate-request");

// Login route
router.post(
  "/login",
  check("email").isEmail().withMessage("Must be a valid email"),
  validateRequest,
  login
);

// Register route
router.post(
  "/register",
  check("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("name must be minimum of 2 characters.."),
  check("email").isEmail().withMessage("Must be a valid email"),
  check("password")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{10,}$/, "i")
    .withMessage(
      "password should contain atleast 10 characters,one uppercase,one lowercase,one number and one special character"
    ),
  validateRequest,
  register
);

// Get Signed In user
router.get("/get_current_user", isSignedIn, get_current_user);

module.exports = router;
