const conexao = require("../conexao");
const securePassword = require("secure-password");
const pwd = securePassword();
const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwt_secret");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome) return res.status(400).json({ erro: "Campo nome é obrigatório" });
  if (!email)
    return res.status(400).json({ erro: "Campo email é obrigatório" });
  if (!senha)
    return res.status(400).json({ erro: "Campo senha é obrigatório" });

  try {
    const query = "select * from usuarios where email = $1";
    const usuario = await conexao.query(query, [email]);
    if (usuario.rowCount > 0) {
      return res.status(400).json({ erro: "Este email já cadastrado" });
    }
  } catch (erro) {
    return res.status(400).json(error.message);
  }

  try {
    const userPassword = Buffer.from(senha);
    const hash = (await pwd.hash(userPassword)).toString("hex");
    const query =
      "insert into usuarios (nome, email, senha) values ($1, $2, $3)";
    const usuario = await conexao.query(query, [nome, email, hash]);
    if (usuario.rowCount === 0) {
      return res
        .status(400)
        .json({ erro: "Não foi possível cadastrar o usuario" });
    }
    return res.status(200).json({ mensagem: "Usuário cadastrado com sucesso" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email)
    return res.status(400).json({ erro: "Campo email é obrigatório" });
  if (!senha)
    return res.status(400).json({ erro: "Campo senha é obrigatório" });
  try {
    const query = "select * from usuarios where email = $1";
    const usuarios = await conexao.query(query, [email]);
    if (usuarios.rowCount === 0) {
      return res.status(400).json({ erro: "Email ou senha incorretos" });
    }
    const usuario = usuarios.rows[0];

    const result = await pwd.verify(
      Buffer.from(senha),
      Buffer.from(usuario.senha, "hex")
    );

    switch (result) {
      case securePassword.INVALID_UNRECOGNIZED_HASH:
      case securePassword.INVALID:
        return res.status(400).json({ erro: "Email ou senha incorretos" });
      case securePassword.VALID:
        break;
      case securePassword.VALID_NEEDS_REHASH:
        try {
          const hash = (await pwd.hash(userPassword)).toString("hex");
          const query = "update usuarios set senha=$1 where email=$2";
          await conexao.query(query, [hash, email]);
        } catch (err) {
          console.log("Usuário logou!");
        }
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
    // res.status(200).json(`Colé! Seu usuário é ${usuario.nome}`);
  } catch (erro) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarUsuario,
  login,
};
