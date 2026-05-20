const express = require('express');
const router = express.Router()
const vagaController = require('../controllers/vaga.controller'); //importando funções http do controller

//rotas http
router.get('/buscar-vagas', vagaController.buscarVagas);
router.get('/buscar-vagas/:id', vagaController.buscarVagaPorId);
router.post('criar-vagas', vagaController.criarVagas);
router.get('/vagas-adzuna', vagaController.buscarVagasAdzuna);
router.get('/vagas-jooble', vagaController.buscarVagasJooble);

//exportar rotas
module.exports = router;