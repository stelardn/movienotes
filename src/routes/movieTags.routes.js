const { Router } = require("express");
const movieTagsRouter = Router();

const MovieTagsController = require("../controllers/MovieTagsController");
const movieTagsController = new MovieTagsController;

movieTagsRouter.get("/:user_id", movieTagsController.index)

module.exports = movieTagsRouter;