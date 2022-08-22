const knex = require("../database/knex");
const { request, query } = require("express");
const AppError = require("../utils/AppError");

class MovieNotesController {

  // Creates a movie with a title, a rating and a description
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

    return response.status(201).json();
  }

  // Deletes a movie note receiving its id number
  async delete(request, response) {
    const { id } = request.params;

    await knex("movie_notes")
      .delete()
      .where({ id });

    return response.json();
  }

  // Returns a list of all the movie notes from a single user, which can be filtered
  async index(request, response) {
    const { title, tags } = request.query;
    const { user_id } = request.params;

    let movieNotes;

    if (tags) {
      const filterTags = tags.split(",").map(tag => tag.trim());

      movieNotes = await knex("movie_tags")
        .select([
          "movie_notes.id",
          "movie_notes.user_id",
          "movie_notes.title",
          "movie_notes.rating"
        ])
        .where("movie_notes.user_id", user_id)
        .whereLike("movie_notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movie_notes", "movie_tags.note_id", "movie_notes.id")
        .orderBy("movie_notes.title");
    } else {
      movieNotes = await knex("movie_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await knex("movie_tags").where({ user_id });

    const moviesWithTags = movieNotes.map(movieNote => {
      const movieTags = userTags.filter(tag => movieNote.id === tag.note_id);

      return {
        ...movieNote,
        tags: movieTags
      }
    })

    return response.json(moviesWithTags);
  }

}

module.exports = MovieNotesController;