const express = require("express");
const rotas = express();
const usuario = require('../controladores/usuario');
const pokemons = require('../controladores/pokemons');

rotas.post("/usuario/cadastrar", usuario.cadastrar);
rotas.post("/usuario/logar", usuario.logar);

rotas.post("/pokemons/cadastrar", pokemons.cadastrar);
rotas.patch("/pokemons/atualizar", pokemons.atualizar);
rotas.get("/pokemons", pokemons.listar);
rotas.get("/pokemons/:id", pokemons.obter);
rotas.delete("/pokemons/:id", pokemons.deletar);

module.exports = rotas;
