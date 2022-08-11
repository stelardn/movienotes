const userRouter = require("./user.routes");

const { Router } = require("express");

const routes = Router();
// const app = require("../server");

routes.use('/users', userRouter);

module.exports = routes;