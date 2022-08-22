const userRouter = require("./user.routes");
const movieNotesRouter = require("./movieNotes.routes");
const movieTagsRouter = require("./movieTags.routes");

const { Router } = require("express");

const routes = Router();

routes.use('/users', userRouter);
routes.use('/movie_notes', movieNotesRouter);
routes.use('/movie_tags', movieTagsRouter);

module.exports = routes;