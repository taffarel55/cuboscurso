const conexao = require("../conexao");
const bcrypt = require("bcrypt");
const { Erro } = require("../erro");
const segredo = require("../segredo");
const jwt = require("jsonwebtoken");
const nodemailer = require("../nodemailer");

const cadastrar = async (req, res, next) => {
  const params = ["nome", "email", "senha", "nome_loja"];
  for (param of params) {
    if (!Object.keys(req.body).includes(param)) {
      return next(new Erro(400, `Parâmetro '${param}' é obrigatório`));
    }
  }

  const { nome, email, senha, nome_loja } = req.body;

  try {
    const { rowCount } = await conexao.query(
      `select * from usuarios where email=$1`,
      [email]
    );
    if (rowCount > 0) {
      return next(new Erro(409, "Já existe este email cadastrado"));
    }
  } catch {
    return next(new Erro());
  }

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 11);
    const { rowCount } = await conexao.query(
      `
        insert into usuarios 
          (nome, nome_loja, email, senha) 
        values 
          ($1, $2, $3, $4)
      `,
      [nome, nome_loja, email, senhaCriptografada]
    );
    if (rowCount > 0) {
      const dadosEnvio = {
        from: "Market Cubos <nao-responder@mauriciotaffarel.com>",
        to: email,
        subject: "Bem vindo ao Market Cubos",
        text: `Olá ${nome}. Você realizou um cadastro no Market Cubos e pode fazer o login com o email: ${email}`,
      };

      nodemailer.sendMail(dadosEnvio);

      return res.status(204).json();
    }
  } catch (err) {
    return next(new Erro());
  }
};

const login = async (req, res, next) => {
  const params = ["email", "senha"];
  for (param of params) {
    if (!Object.keys(req.body).includes(param)) {
      return next(new Erro(400, `Parâmetro '${param}' é obrigatório`));
    }
  }

  const { email, senha } = req.body;

  try {
    const { rows, rowCount } = await conexao.query(
      `select * from usuarios where email = $1`,
      [email]
    );

    if (rowCount === 0) {
      return next(new Erro(404, "Usuário não encontrado"));
    }

    const usuario = rows[0];
    const senhaVerificada = await bcrypt.compare(senha, usuario.senha);

    if (!senhaVerificada) {
      return next(new Erro(400, "Email e senha não confere."));
    }

    const token = jwt.sign({ id: usuario.id }, segredo, {
      expiresIn: "1d",
    });

    const dadosEnvio = {
      from: "Market Cubos <nao-responder@mauriciotaffarel.com>",
      to: email,
      subject: "Um novo login acaba de ser feito na Market Cubos",
      template: "cadastro",
      context: {
        nome: usuario.nome,
        email: usuario.email,
      },
    };

    nodemailer.sendMail(dadosEnvio);

    return res.status(200).json({ token });
  } catch (err) {
    console.log(err.message);
    return next(new Erro());
  }
};

const obterUsuario = async (req, res, next) => {
  const usuario = res.locals.usuario;
  return res.status(200).json(usuario);
};

const atualizarUsuario = async (req, res, next) => {
  const usuario = res.locals.usuario;
  const params = ["nome", "email", "senha", "nome_loja"];
  for (param of params) {
    if (!Object.keys(req.body).includes(param)) {
      return next(new Erro(400, `Parâmetro '${param}' é obrigatório`));
    }
  }

  const { nome, email, senha, nome_loja } = req.body;

  try {
    const { rowCount } = await conexao.query(
      `select * from usuarios where email=$1 and id!=$2`,
      [email, usuario.id]
    );
    if (rowCount > 0) {
      return next(new Erro(409, "Já existe este email cadastrado"));
    }
  } catch {
    return next(new Erro());
  }

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 11);
    const { rowCount } = await conexao.query(
      `
        update usuarios set 
          nome=$1, 
          nome_loja=$2, 
          email=$3,
          senha=$4
        where id = $5
      `,
      [nome, nome_loja, email, senhaCriptografada, usuario.id]
    );
    if (rowCount > 0) {
      return res.status(204).json();
    }
  } catch (err) {
    return next(new Erro());
  }
};

module.exports = {
  cadastrar,
  login,
  obterUsuario,
  atualizarUsuario,
};
