const knex = require("../conexao");
const bcrypt = require("bcrypt");
const nodemailer = require("../nodemailer");

const cadastrarUsuario = async (req, res) => {
  console.log('entrei');
  res.json('ok');
  // const { nome, email, senha, nome_loja } = req.body;

  // if (!nome) {
  //   return res.status(404).json("O campo nome é obrigatório");
  // }

  // if (!email) {
  //   return res.status(404).json("O campo email é obrigatório");
  // }

  // if (!senha) {
  //   return res.status(404).json("O campo senha é obrigatório");
  // }

  // if (!nome_loja) {
  //   return res.status(404).json("O campo nome_loja é obrigatório");
  // }

  // try {
  //   const usuarioBuscado = await knex("usuarios")
  //     .where("email", email)
  //     .first()
  //     .returning("*");

  //   if (usuarioBuscado) {
  //     return res.status(400).json("O email já existe");
  //   }

  //   const senhaCriptografada = await bcrypt.hash(senha, 10);
  //   const usuario = await knex("usuarios")
  //     .insert({ nome, email, senha: senhaCriptografada, nome_loja })
  //     .returning("*");

  //   if (usuario.lenght === 0) {
  //     return res.status(400).json("O usuário não foi cadastrado.");
  //   }

  //   const dadosEnvio = {
  //     from: "Market Cubos <nao-responder@mauriciotaffarel.com>",
  //     to: email,
  //     subject: "Bem vindo ao Market Cubos",
  //     text: `Olá ${nome}. Você realizou um cadastro no Market Cubos e pode fazer o login com o email: ${email}`,
  //   };

  //   await nodemailer.sendMail(dadosEnvio);

  //   return res.status(200).json("O usuario foi cadastrado com sucesso!");
  // } catch (error) {
  //   return res.status(400).json(error.message);
  // }
};

const obterPerfil = async (req, res) => {
  return res.status(200).json(req.usuario);
};

const atualizarPerfil = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body;

  if (!nome && !email && !senha && !nome_loja) {
    return res
      .status(404)
      .json("É obrigatório informar ao menos um campo para atualização");
  }

  try {
    if (email && email !== req.usuario.email) {
      const usuarioBuscado = await knex("usuarios")
        .where("email", email)
        .first()
        .returning("*");

      if (usuarioBuscado) {
        return res.status(400).json("O email já existe");
      }
    }

    const senhaCriptografada = senha && (await bcrypt.hash(senha, 10));

    let obj = { nome, email, senha: senhaCriptografada, nome_loja };
    Object.keys(obj).forEach((key) =>
      obj[key] === undefined ? delete obj[key] : {}
    );

    const usuarioAtualizado = await knex("usuarios")
      .update(obj)
      .where("id", req.usuario.id);

    if (!usuarioAtualizado) {
      return res.status(400).json("O usuario não foi atualizado");
    }

    return res.status(200).json("Usuario foi atualizado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarUsuario,
  obterPerfil,
  atualizarPerfil,
};
