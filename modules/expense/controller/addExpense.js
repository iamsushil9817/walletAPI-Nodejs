const mongoose = require("mongoose");

const addExpense = async (req, res) => {
  const User = mongoose.model("users");
  const Transaction = mongoose.model("transaction");

  const { amount, remarks } = req.body;

  try {
    if (!amount) throw "please enter the amount";
    if (amount < 1) throw "please enter the right amount";
    if (!remarks) throw "please enter the remarks";
    if (remarks.length < 2) "please enter the valid remarks";
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
    return;
  }
  try {
    await Transaction.create({
      amount: amount,
      remarks: remarks,
      user_id: req.user._id,
      transaction_type: "expense",
    });

    await User.updateOne(
      {
        _id: req.user._id,
      },
      {
        $inc: {
          balance: amount * -1,
        },
      },
      {
        runValidator: true,
      }
    );
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
    return;
  }

  res.status(200).json({
    message: "expense is added",
  });
};

module.exports = addExpense;
