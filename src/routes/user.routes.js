const { Router } = require("express");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userRouter = Router();

const UsersController = require("../controllers/UsersController");
const usersController = new UsersController;

const UsersAvatarController = require("../controllers/UsersAvatarController");
const usersAvatarController = new UsersAvatarController;

const uploadConfig = require("../configs/upload");
const multer = require('multer');
const upload = multer(uploadConfig.MULTER);

userRouter.post('/', usersController.create);
userRouter.get('/', ensureAuthenticated, usersController.show);
userRouter.get('/', ensureAuthenticated, usersController.index);
userRouter.delete('/', ensureAuthenticated, usersController.delete);
userRouter.put('/', ensureAuthenticated, usersController.update);
userRouter.patch('/avatar', ensureAuthenticated, upload.single("avatar"), usersAvatarController.update);

module.exports = userRouter;