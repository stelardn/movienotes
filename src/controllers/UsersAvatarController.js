const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

const AppError = require("../utils/AppError");

class UsersAvatarController {
  async update(request, response) {
    const user_id = request.user.id;

    console.log(request.file.filename);
    const fileName = request.file.filename;

    const diskStorage = new DiskStorage();

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("Somente usuários autenticados podem atualizar o avatar", 401);
    }

    if (user.avatar) {
      const oldAvatar = user.avatar;
      await diskStorage.deleteFile(oldAvatar)
    }

    const newAvatar = await diskStorage.saveFile(fileName);
    user.avatar = newAvatar;

    await knex("users").update(user).where({ id: user_id });

    return response.json(user);
  }
}

module.exports = UsersAvatarController;