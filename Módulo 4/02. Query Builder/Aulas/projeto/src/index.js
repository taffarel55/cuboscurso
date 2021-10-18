const express = require("express");
const knex = require("./conexao");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const mauricio = {
    nome: "Maurício Taffarel 2S",
    email: "mauricio@taffarel.com",
    telefone: "(99) 98765-4321",
  };
  const maria = {
    nome: "Maria Taffarel 2S",
    email: "mauricio@taffarel.com",
    telefone: "(99) 98765-4321",
  };
  const joao = {
    nome: "Joao Taffarel 2S",
    email: "mauricio@taffarel.com",
    telefone: "(99) 98765-4321",
  };
  // const agenda = await knex("agenda")
  //   .insert(mauricio)
  //   .returning(["id", "nome"]);
  const agenda = await knex("agenda").insert([maria, joao]).returning("*");
  return res.json(agenda);
});

app.put("/:id", async (req, res) => {
  const { nome, email, telefone } = req.body;
  const { id } = req.params;

  const agendaAtualizada = await knex("agenda")
    .update({
      nome,
      email,
      telefone,
    })
    .where("id", id)
    .returning("*");
  return res.json(agendaAtualizada);
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const agendaDeletada = await knex("agenda")
    .del()
    .where("id", id)
    .returning("*");
  return res.json(agendaDeletada);
});

app.post("/:id/anotacoes", async (req, res) => {
  const { id } = req.params;
  const { nota } = req.body;

  try {
    const anotacao = await knex("anotacoes")
      .insert({
        agenda_id: id,
        nota: nota,
      })
      .debug()
      .returning("*");

    return res.status(200).json("ok");
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

app.get("/anotacoes", async (req, res) => {
  const anotacoes = await knex("anotacoes")
    .join("agenda", "anotacoes.agenda_id", "agenda.id")
    .debug();

  // const anotacoes = await knex("anotacoes")
  //   .leftJoin("agenda", "anotacoes.agenda_id", "agenda.id")
  //   .debug();

  // const anotacoes = await knex("anotacoes")
  //   .rightJoin("agenda", "anotacoes.agenda_id", "agenda.id")
  //   .debug();

  return res.json(anotacoes);
});

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
