const knex = require("../conexao");
const bcrypt = require("bcrypt");
const schema = require("../validacoes/schemaCadastroUsuario");
const schemaCadastroUsuario = require("../validacoes/schemaCadastroUsuario");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body;

  try {
    await schemaCadastroUsuario.validate(req.body);
    const usuarioBuscado = await knex("usuarios")
      .where("email", email)
      .first()
      .returning("*");

    if (usuarioBuscado) {
      return res.status(400).json("O email já existe");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const usuario = await knex("usuarios")
      .insert({ nome, email, senha: senhaCriptografada, nome_loja })
      .returning("*");

    if (usuario.lenght === 0) {
      return res.status(400).json("O usuário não foi cadastrado.");
    }

    return res.status(200).json("O usuario foi cadastrado com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
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
