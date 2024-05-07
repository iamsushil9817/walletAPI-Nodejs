const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./modules/users/users.routes");
const incomeRouter = require("./modules/income/income.routes");
const expesneRouter = require("./modules/expense/expense.routes");
const app = express();

require("dotenv").config();
require("./models/users.model");
require("./models/transaction.model");
app.use(express.json());

mongoose
  .connect(process.env.mongo_connect, {})
  .then(() => {
    console.log("connection to mongodb successful");
  })
  .catch((e) => {
    console.log(" not connected ");
  });

app.use("/users", userRouter);
app.use("/income", incomeRouter);
app.use("/expense", expesneRouter);

app.listen(8000, (req, res) => {
  console.log("server started");
  //   res.status(200).send("server started");
});
