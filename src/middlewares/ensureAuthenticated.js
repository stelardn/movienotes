const authConfig = require("../configs/auth");
const jwt = require('jsonwebtoken');
const AppError = require("../utils/AppError");

function ensureAuthenticated(request, response, next) {
  const auth = request.headers.authorization;

  if (!auth) {
    throw new AppError("JWT token não encontrado", 401);
  }

  const [, token] = auth.split(" ");

  try {
    const { sub: user_id } = jwt.verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id)
    }

    return next();
  } catch {
    throw new AppError("JWT token inválido", 401);
  }

}

module.exports = ensureAuthenticated;