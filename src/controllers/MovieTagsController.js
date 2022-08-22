const knex = require("../database/knex");
const { request, response } = require("express");

class MovieTagsController {
  async index(request, require) {
    const { user_id } = request.query;

    const tags = await knex("movie_tags")
      .select()
      .where({ user_id });

    return response.json(tags);
  }
}

module.exports = MovieTagsController;