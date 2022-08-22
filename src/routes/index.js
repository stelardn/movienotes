const userRouter = require("./user.routes");
const movieNotesRouter = require("./movieNotes.routes");

const { Router } = require("express");

const routes = Router();

routes.use('/users', userRouter);
routes.use('/movie_notes', movieNotesRouter);


module.exports = routes;