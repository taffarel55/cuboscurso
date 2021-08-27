const express = require("express");
const rotas = require("../rotas/rotas");
const { autenticar, erros } = require("../intermediarios/intermediarios");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(express.json());
app.use(autenticar);
app.use(rotas);
app.use(erros);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(require("../swagger/swagger.json"))
);

module.exports = app;
