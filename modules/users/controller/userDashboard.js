const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
  const User = mongoose.model("users");
  const Transaction = mongoose.model("transaction");

  const getdata = await User.findOne({
    _id: req.user._id,
  }).select("balance name");

  const getTransaction = await Transaction.find({
    user_id: req.user._id,
  }).sort("-createdAt");

  res.status(200).json({
    data: getdata,
    transaction: getTransaction,
  });
};

module.exports = userDashboard;
