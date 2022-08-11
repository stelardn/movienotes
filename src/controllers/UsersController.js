const AppError = require("../utils/AppError");
class UsersController {

  async create(req, res) {
    const { id, name } = req.body;

    if (!name) {
      throw new AppError('O nome deve ser informado.')
    }

    return res.status(201).json({ id, name });
  }
}

module.exports = UsersController;