const express = require('express');
const rotas = require('./rotas')
const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.use(rotas);

app.listen(port,()=>console.log(`Server na porta ${port}`));