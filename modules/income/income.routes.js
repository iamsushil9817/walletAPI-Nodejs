const express = require("express");
const auth = require("../../middleware/auth");
const addIncome = require("./controller/addIncome");
// const auth = require("../../middleware/auth");

const incomeRouter = express.Router();

incomeRouter.use(auth);

incomeRouter.post("/add", addIncome);

module.exports = incomeRouter;
