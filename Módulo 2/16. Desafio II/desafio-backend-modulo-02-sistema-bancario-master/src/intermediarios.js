const { banco } = require("./bancodedados");

function autenticar(req, res, next) {
  if (req.query.senha_banco === banco.senha) {
    next();
  } else {
    res.status(401);
    res.json({ erro: "Senha incorreta" });
  }
}

module.exports = autenticar;
