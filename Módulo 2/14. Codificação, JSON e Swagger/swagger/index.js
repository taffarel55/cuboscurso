const express = require("express");
const roteador = require("./roteador");
const autenticar = require("./intermediarios");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(express.json());
app.use(autenticar);
app.use(roteador);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(require("./swagger.json")));

app.listen(8000, () => {
  console.log("Servidor iniciado!");
});
