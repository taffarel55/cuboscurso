const conexao = require("../conexao");
const { Erro } = require("../erro");

const cadastrar = async (req, res, next) => {
  const client = res.locals.user;
  try {
    const { nome, habilidades, imagem, apelido } = req.body;
    if (!nome) return next(new Erro(400, `O campo 'nome' é obrigatório`));
    if (!habilidades)
      return next(new Erro(400, `O campo 'habilidades' é obrigatório`));

    const pokemon = await conexao.query(
      "insert into pokemons (usuario_id, nome, habilidades, imagem, apelido) values ($1, $2, $3, $4, $5)",
      [client.id, nome, habilidades, imagem, apelido]
    );

    if (pokemon.rowCount === 0) {
      return next(new Erro(500, "Não foi possível cadastrar pokémon"));
    }

    res.status(201).json({ messagem: "Pokémon criado com sucesso" });
  } catch (e) {
    return next(new Erro(500, "Não foi possível cadastrar usuário"));
  }
};

const atualizar = async (req, res, next) => {
  res.send("não implementei pq é o mesmo");
};

const listar = async (req, res) => {
  res.send("não implementei pq é o mesmo");
};

const obter = async (req, res) => {
  res.send("não implementei pq é o mesmo");
};

const deletar = async (req, res) => {
  res.send("não implementei pq é o mesmo");
};

module.exports = { cadastrar, atualizar, listar, obter, deletar };
