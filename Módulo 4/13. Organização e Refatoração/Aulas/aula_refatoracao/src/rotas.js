const express = require("express");
const rotas = express();
const filtroLogin = require("./filtros/filtroLogin");
const autenticacaoControlador = require("./controladores/autenticacao");
const usuarioControlador = require("./controladores/usuarios");

rotas.post("/usuarios", usuarioControlador.cadastrarUsuario);
rotas.post("/login", autenticacaoControlador.login);

rotas.use(filtroLogin);

rotas.get("/perfil", usuarioControlador.obterPerfilUsuario);
rotas.put("/perfil", usuarioControlador.atualizarPerfilUsuario);

module.exports = rotas;
