const { Router } = require("express");
const movieNotesRouter = Router();

const MovieNotesController = require("../controllers/MovieNotesController");
const movieNotesController = new MovieNotesController;

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

movieNotesRouter.use(ensureAuthenticated);


movieNotesRouter.post("/", movieNotesController.create);
movieNotesRouter.get("/", movieNotesController.index);
movieNotesRouter.get("/:id", movieNotesController.show);
movieNotesRouter.delete("/:id", movieNotesController.delete);
movieNotesRouter.put("/:id", movieNotesController.update);

module.exports = movieNotesRouter;
