const { Router } = require("express");

const userRouter = Router();

const UsersController = require("../controllers/UsersController");
const usersController = new UsersController;


userRouter.post('/', usersController.create);
userRouter.get('/:id', usersController.show);
userRouter.get('/', usersController.index);
userRouter.delete('/:id', usersController.delete);
userRouter.put('/:id', usersController.update);

module.exports = userRouter;