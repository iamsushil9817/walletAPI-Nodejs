const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  const Model = mongoose.model("users");

  const { name, password, email, address, balance } = req.body;

  // validaton

  // creation
  const enpassword = await bcrypt.hash(password, 10);
  try {
    const newcreated = await Model.create({
      name,
      password: enpassword,
      email,
      address,
      balance,
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
    return;
  }
  res.status(200).json({
    message: "hello from register",
  });
};

module.exports = userRegister;
