const { Router } = require("express");
const movieNotesRouter = Router();

const MovieNotesController = require("../controllers/MovieNotesController");
const movieNotesController = new MovieNotesController;


movieNotesRouter.post("/", movieNotesController.create);

module.exports = movieNotesRouter;
