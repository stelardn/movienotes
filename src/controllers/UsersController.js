const { request } = require("express");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash } = require("bcrypt");
class UsersController {

  async create(request, response) {
    const { name, email, password, avatar } = request.body;

    if (!name || !email || !password) {
      throw new AppError('Informe nome, email e senha')
    }

    const userExists = await knex("users").select("email").where("email", email);

    if (userExists[0]) {
      throw new AppError("Este e-mail já está cadastrado!")
    }

    const hashedPassword = await hash(password, 8);

    const user_id = await knex("users")
      .insert({
        name: name,
        email: email,
        password: hashedPassword,
        avatar: avatar
      })

    return response.status(201).json({ name, email });
  }

  async show(request, response) {
    const { id } = request.params;

    const user = await knex("users")
      .select(["id", "name", "email", "avatar"])
      .where("id", id);

    return response.json(user);
  }

  async index(request, response) {
    const users = await knex("users")
      .select([
        "id",
        "name",
        "email",
        "avatar"
      ])

    return response.json(users);
  } // adicionar buscas

  async delete(request, response) {
    const { id } = request.params;

    await knex("users").delete().where("id", id);

    return response.json();
  }

}

module.exports = UsersController;