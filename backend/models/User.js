const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Setup the user Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
    timestamps: true,
  }
);

// create passoward hash on save trigger
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 8);
    }
    next();
  } catch {
    throw new Error("Something wrong with password please try again");
  }
});

// create jwt token
userSchema.methods.createToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

// compare passwords
userSchema.methods.comparePasswords = async function (password) {
  const isAuthenticated = await bcrypt.compare(password, this.password);
  return isAuthenticated;
};

module.exports = mongoose.model("User", userSchema);
