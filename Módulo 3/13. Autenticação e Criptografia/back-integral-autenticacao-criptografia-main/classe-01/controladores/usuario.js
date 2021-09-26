const conexao = require("../conexao");
const { Erro } = require("../erro");
const securePassword = require("secure-password");
const pwd = securePassword();
const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwt_secret");

const cadastrar = async (req, res, next) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome) return next(new Erro(400, `O campo 'nome' é obrigatório`));
    if (!email) return next(new Erro(400, `O campo 'email' é obrigatório`));
    if (!senha) return next(new Erro(400, `O campo 'senha' é obrigatório`));

    const busca = await conexao.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (busca.rowCount !== 0)
      return next(new Erro(409, "Este email já está cadastrado"));

    const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");

    const usuario = await conexao.query(
      "insert into usuarios (nome, email, senha) values ($1, $2, $3)",
      [nome, email, hash]
    );

    res.status(201).json({ messagem: "Usuário criado com sucesso" });
    
  } catch (e) {
    return next(new Erro(500, "Não foi possível cadastrar usuário"));
  }
};

const logar = async (req, res, next) => {
  const { email, senha } = req.body;
  if (!email) return next(new Erro(400, `O campo 'email' é obrigatório`));
  if (!senha) return next(new Erro(400, `O campo 'senha' é obrigatório`));

  const resposta = await conexao.query(
    "select * from usuarios where email = $1",
    [email]
  );

  if(resposta.rowCount===0) {
    return next(new Erro(401, `Email ou senha inválida`));
  }

  const usuario = resposta.rows[0];

  const result = await pwd.verify(
    Buffer.from(senha),
    Buffer.from(usuario.senha, "hex")
  );

  switch (result) {
    case securePassword.INVALID_UNRECOGNIZED_HASH:
    case securePassword.INVALID:
      return next(new Erro(401, `Email ou senha inválida`));
    case securePassword.VALID:
      break;
    case securePassword.VALID_NEEDS_REHASH:
      try {
        const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");
        await conexao.query(
          "update table usuarios set senha=$1 where email = $2",
          [hash, email]
        );
      } catch (err) {}
      break;
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    },
    jwtSecret
  );

  res.send(token);
};

module.exports = { cadastrar, logar };
