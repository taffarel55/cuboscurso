const express = require("express");
const usuarios = require("./controladores/usuarios");
const login = require("./controladores/login");
const postagens = require("./controladores/postagens");
const verificaLogin = require("./filtros/verificaLogin")

const rotas = express();

rotas.post("/usuarios", usuarios.cadatrarUsuario);
rotas.post("/login", login.login);

rotas.use(verificaLogin);

rotas.post("/postagens", postagens.cadastrarPostagem);
rotas.patch("/postagens/:id", postagens.atualizarPostagem);

module.exports = rotas;
