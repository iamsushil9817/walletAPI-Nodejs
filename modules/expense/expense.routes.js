const express = require("express");
const auth = require("../../middleware/auth");
const addExpense = require("./controller/addExpense");

const expesneRouter = express.Router();

expesneRouter.use(auth);
expesneRouter.post("/add", addExpense);

module.exports = expesneRouter;
