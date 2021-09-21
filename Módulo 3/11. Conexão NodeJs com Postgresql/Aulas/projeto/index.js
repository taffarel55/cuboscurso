const express = require("express");
const rotas = require("./rotas");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(rotas);

app.listen(port, () => console.log("Servidor iniciado na porta " + port));
