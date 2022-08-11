const { Router } = require("express");

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.send("Hello, user!")
})

module.exports = userRouter;