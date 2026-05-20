//responsavel para configurar o express e plugar rotas nele
const express = require('express');
const vagaRouter = require('../routers/vaga.router.js'); //importar rotas

const app = express();

//configurações do express
app.use(express.json());

//plugando rotas no sistema
app.use('/api', vagaRouter);

//exportando app
module.exports = app;