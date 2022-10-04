const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userRouter = Router();

const UsersController = require("../controllers/UsersController");
const usersController = new UsersController;


userRouter.post('/', usersController.create);
userRouter.get('/', ensureAuthenticated, usersController.show);
userRouter.get('/', usersController.index);
userRouter.delete('/', ensureAuthenticated, usersController.delete);
userRouter.put('/', ensureAuthenticated, usersController.update);

module.exports = userRouter;