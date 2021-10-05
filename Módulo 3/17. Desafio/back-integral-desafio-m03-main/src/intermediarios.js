const jwt = require("jsonwebtoken");
const segredo = require("./segredo");
const conexao = require("./conexao");
const { Erro } = require("./erro");

async function autenticar(req, res, next) {
  if (
    req.url === "/login" ||
    (req.url === "/usuario" && req.method === "POST")
  ) {
    return next();
  }

  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.locals.erro = new Erro(
        403,
        "Autorização pelo header é obrigatória"
      );
      return next();
    }

    const token = authorization.replace("Bearer", "").trim();

    if (!token) {
      res.locals.erro = new Erro(
        403,
        "A autenticação através do token é obrigatória"
      );
      return next();
    }

    const { id } = jwt.verify(token, segredo);

    const query = `select * from usuarios where id=$1`;
    const { rows, rowCount } = await conexao.query(query, [id]);

    if (rowCount === 0) {
      res.locals.erro = new Erro(
        404,
        "O usuário deste token não foi encontrado"
      );
      return next();
    }

    const { senha, ...usuario } = rows[0];
    res.locals.usuario = usuario;
    next();
  } catch (err) {
    res.locals.erro = new Erro(400, 'Token inválido');
    return next();
  }
}

const errosAutenticacao = (req, res, next) => {
  if (res.locals.erro) {
    return next(res.locals.erro);
  }
  next();
};

const errosRotas = (err, req, res, next) => {
  if (!err) err = new Erro();
  res.status(err.status).json({ mensagem: err.mensagem });
};

module.exports = { autenticar, errosAutenticacao, errosRotas };
