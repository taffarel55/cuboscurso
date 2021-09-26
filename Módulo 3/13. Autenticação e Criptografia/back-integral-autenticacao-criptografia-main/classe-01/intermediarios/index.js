const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwt_secret");

async function autenticar(req, res, next) {
  if (!req.url.includes("pokemons")) return next();

  const { token } = req.body;
  if (!token)
    return res.status(400).json({ erro: `O campo 'token' é obrigatório` });

  try {
    const user = jwt.verify(token, jwtSecret);
    console.log(`${user.nome} está cadastrando um pokemon`);
    res.locals.user = user;
    next();
  } catch {
    return res.status(400).json({ erro: "O token é inválido" });
  }
}

module.exports = { autenticar };
