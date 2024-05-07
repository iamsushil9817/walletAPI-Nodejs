const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required "],
    },
    remarks: {
      type: String,
      required: [true, "Remarks is required"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "user id is required"],
    },
    transaction_type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Transaction type is requied"],
    },
  },
  {
    timestamps: true,
  }
);

const transModel = mongoose.model("transaction", transactionSchema);

module.exports = transModel;
