const userRouter = require("./user.routes");
const movieNotesRouter = require("./movieNotes.routes");
const movieTagsRouter = require("./movieTags.routes");
const sessionsRouter = require("./sessions.routes");

const { Router } = require("express");

const routes = Router();

routes.use('/users', userRouter);
routes.use('/movie_notes', movieNotesRouter);
routes.use('/movie_tags', movieTagsRouter);
routes.use('/sessions', sessionsRouter);

module.exports = routes;