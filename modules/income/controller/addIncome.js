const mongoose = require("mongoose");
const addIncome = async (req, res) => {
  const { amount, remarks } = req.body;

  const User = mongoose.model("users");
  const Transaction = mongoose.model("transaction");

  try {
    if (!amount) throw "please enter the amount";
    if (amount < 1) throw "please enter valid amount";
    if (!remarks) throw "please enter the remarks";
    if (remarks.length < 2) throw "please enter the valid remarks";
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
  try {
    await Transaction.create({
      amount: amount,
      remarks: remarks,
      user_id: req.user._id,
      transaction_type: "income",
    });
    await User.updateOne(
      {
        _id: req.user._id,
      },
      {
        $inc: {
          balance: amount,
        },
      },
      {
        runValidator: true,
      }
    );
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
    return;
  }

  res.status(200).json({
    message: "i am adding income",
  });
};
module.exports = addIncome;
