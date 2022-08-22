const knex = require("../database/knex");
const { request } = require("express");
const AppError = require("../utils/AppError");

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating } = request.body;
    const { user_id } = request.query;

    if (!title) {
      throw new AppError("O título do filme deve ser informado.");
    }

    if (rating < 1 || rating > 5) {
      throw new AppError("Insira uma avaliação de 1 a 5.");
    }

    if (!Number.isInteger(rating)) {
      throw new AppError("Insira um número inteiro para a avaliação.")
    }

    await knex("movie_notes")
      .insert({
        title,
        description,
        rating,
        user_id
      })

    return response.json();
  }

}

module.exports = MovieNotesController;