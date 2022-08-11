const userRouter = require("./user.routes");

const { Router } = require("express");

const routes = Router();

routes.use('/users', userRouter);

module.exports = routes;