const { request, query } = require("express");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash, compare } = require("bcrypt");
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
    const user_id = request.user.id;

    const user = await knex("users")
      .select(["id", "name", "email", "avatar"])
      .where("id", user_id);

    return response.json(user);
  }

  async index(request, response) {

    const { name } = request.query;

    let users;

    if (name) {
      users = await knex("users")
        .select([
          "id",
          "name",
          "email",
          "avatar"
        ])
        .whereLike("name", `%${name}%`)
        .orderBy("name");
    } else {
      users = await knex("users")
        .select([
          "id",
          "name",
          "email",
          "avatar"
        ])
    }
    return response.json(users);
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("users").delete().where("id", id);

    return response.json();
  }

  async update(request, response) {
    const user_id = request.user.id;
    const { name, email, password, old_password, avatar } = request.body;

    const user = await knex("users").select().where({ id: user_id }).first();

    if (!user) {
      throw new AppError('Usuário não encontrado! Verifique o ID.')
    }

    if (password && !old_password) {
      throw new AppError('A senha antiga deve ser informada!');
    }

    if (password && old_password) {
      const correctOldPassword = await compare(old_password, user.password);

      if (!correctOldPassword) {
        throw new AppError('A senha antiga informada não confere.')
      }

      user.password = await hash(password, 8);
    }

    if (email) {
      const userWithThisEmail = await knex("users").select("id").where({ email }).first();

      if (userWithThisEmail && userWithThisEmail.id !== user.id) {
        throw new AppError('Este e-mail já está em uso.');
      }
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.avatar = avatar ?? user.avatar;

    await knex("users")
      .where({ id: user_id })
      .update({
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
        updated_at: knex.fn.now()
      })

    return response.json({ user: { name, email, avatar } });
  }

}

module.exports = UsersController;