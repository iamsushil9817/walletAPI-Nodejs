const express = require("express");
const userRegister = require("./controller/userRegister");
const userLogin = require("./controller/userLogin");
const userDashboard = require("./controller/userDashboard");
const auth = require("../../middleware/auth");

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

// protected Routes....

userRouter.use(auth);

userRouter.get("/dashboard", userDashboard);

module.exports = userRouter;
