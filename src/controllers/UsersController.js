class UsersController {

  async create(req, res) {
    const { id, name } = req.body;

    return res.status(201).json();
  }
}

module.exports = UsersController;