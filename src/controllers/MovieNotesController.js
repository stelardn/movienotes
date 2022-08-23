const knex = require("../database/knex");
const { request, query } = require("express");
const AppError = require("../utils/AppError");


class MovieNotesController {

  // Creates a movie with a title, a rating and a description
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
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

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("Usuário informado não encontrado.")
    }

    const id = await knex("movie_notes")
      .insert({
        title,
        description,
        rating,
        user_id
      });

    if (tags) {
      const tagsInsert = tags.map(tag => {
        return {
          note_id: id,
          user_id,
          name: tag
        }
      })

      await knex("movie_tags").insert(tagsInsert);
    }


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
    const { title, tags, user_id } = request.query;

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
        tags: movieTags.map(tag => tag.name)
      }
    })

    return response.json(moviesWithTags);
  }

  // Returns a specific movie note according to its id
  async show(request, response) {
    const { id } = request.params;

    const idNote = await knex("movie_notes").where({ id }).first();

    if (!idNote) {
      throw new AppError("Nota do filme não encontrada.")
    }

    const movieTags = await knex("movie_tags").select("name").where({ note_id: id }).orderBy("name");
    const movieNote = await knex("movie_notes").where({ id }).first();

    return response.json({
      ...movieNote,
      tags: movieTags.map(tag => tag.name)
    })
  }

}

module.exports = MovieNotesController;