const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userRouter = Router();

const UsersController = require("../controllers/UsersController");
const usersController = new UsersController;


userRouter.post('/', usersController.create);
userRouter.get('/', ensureAuthenticated, usersController.show);
userRouter.get('/', usersController.index);
userRouter.delete('/:id', usersController.delete);
userRouter.put('/:id', usersController.update);

module.exports = userRouter;