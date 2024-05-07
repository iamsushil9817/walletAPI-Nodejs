const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, password } = req.body;

  // validation
  try {
    if (!email) throw "please provide email to login";
    if (!password) throw "please provide the password";

    const getuser = await userModel.findOne({
      email: email,
    });

    if (!getuser) throw "you'r email doesnot matched";

    const matched = await bcrypt.compare(password, getuser.password);
    if (!matched) throw "password doesnot match";
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e,
    });
    return;
  }

  const getuseraccesstoken = await userModel.findOne({
    email: email,
  });

  const accesstoken = jwt.sign(
    {
      _id: getuseraccesstoken._id,
      email: getuseraccesstoken.email,
      name: getuseraccesstoken.name,
    },
    process.env.jwt_salt,
    { expiresIn: "90 days" }
  );

  res.status(200).json({
    message: "hello from user login",
    accesstoken,
  });
};

module.exports = userLogin;
