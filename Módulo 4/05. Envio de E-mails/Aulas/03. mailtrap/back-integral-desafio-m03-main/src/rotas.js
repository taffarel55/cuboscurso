const express = require("express");
const rotas = express();
const usuarios = require("./controladores/usuarios");
const produtos = require("./controladores/produtos");

rotas.post("/usuario", usuarios.cadastrar);
rotas.post("/login", usuarios.login);
rotas.get("/usuario", usuarios.obterUsuario);
rotas.put("/usuario", usuarios.atualizarUsuario);

rotas.get("/produtos", produtos.listarProdutos);
rotas.get("/produtos/:id", produtos.obterProduto);
rotas.post("/produtos", produtos.cadastrar);
rotas.put("/produtos/:id", produtos.atualizar);
rotas.delete("/produtos/:id", produtos.deletar);

module.exports = rotas;
