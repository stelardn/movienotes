const { Router } = require("express");

const userRouter = Router();

const UsersController = require("../controllers/UsersController");
const usersController = new UsersController;

userRouter.get('/', (req, res) => {
  res.send("Hello, user!")
})
userRouter.post('/', usersController.create);

module.exports = userRouter;