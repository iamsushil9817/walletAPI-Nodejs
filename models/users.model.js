const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    address: {
      type: String,
    },
    balance: {
      type: Number,
      required: [true, "balance is required"],
    },
  },
  {
    timestamps: true,
  }
);

const newModel = mongoose.model("users", userSchema);

module.exports = newModel;
