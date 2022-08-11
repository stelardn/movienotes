const { request } = require("express");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");
class UsersController {

  async create(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new AppError('Informe nome, email e senha')
    }

    const user_id = await knex("users")
      .insert({
        name: name,
        email: email,
        password: password
      })

    return response.status(201).json({ name, email });
  }
}

module.exports = UsersController;