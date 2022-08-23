const { Router } = require("express");
const movieNotesRouter = Router();

const MovieNotesController = require("../controllers/MovieNotesController");
const movieNotesController = new MovieNotesController;


movieNotesRouter.post("/", movieNotesController.create);
movieNotesRouter.get("/", movieNotesController.index);
movieNotesRouter.get("/:id", movieNotesController.show);
movieNotesRouter.delete("/:id", movieNotesController.delete);

module.exports = movieNotesRouter;
