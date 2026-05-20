//controller vao servir para receber requisição, pedem para o mongoose ou Service fazer o trabalho devolvendo uma resposta

//importando modulos
const axios = require('axios');
const Vaga = require('../db/vaga.schema');
const { registrarVaga } = require('../services/vaga.service');

// metodo buscar-vagas que estao no mongoDB
const buscarVagas = async (req, res) =>{
  try{
    //Vaga find vai direto na colecao certa
    const listaDeVagas = await Vaga.find({});
    // devolve a lista de vagas com o status 200 (ok)
    res.status(200).json(listaDeVagas);
  } catch (error){ // caso aconteça algum erro o servidor nao crasha e desliga, ele vai capturar o erro e avisar o cliente
    console.error("Erro ao buscar as vagas: ", error);
    // se der o erro avisa quem fez a requisição
    res.status(500).json({ mensagem: "Erro interno ao buscar vagas" });
  }
};

// metodo buscar uma vaga especifica pelo id recebido na rota
const buscarVagaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const idNumerico = Number(id);

    const vaga = await Vaga.findOne({
      $or: [
        { _id: id },
        { _id: Number.isNaN(idNumerico) ? undefined : idNumerico },
        { id_vaga_external: Number.isNaN(idNumerico) ? undefined : idNumerico },
        { id_vaga_external: id },
      ].filter(Boolean),
    });

    if (!vaga) {
      return res.status(404).json({ mensagem: 'Vaga não encontrada' });
    }

    res.status(200).json(vaga);
  } catch (error) {
    console.error('Erro ao buscar vaga por id: ', error);
    res.status(500).json({ mensagem: 'Erro interno ao buscar a vaga' });
  }
};

// metodo criar-vagas post para adicionar uma vaga no banco de dados mongoDB
const criarVagas = async (req, res) =>{
  try{
    //Pegar dados que o cliente enviou
    const vaga = await registrarVaga(req.body);
    //Devolver uma resposta de sucesso com ID que o MongoDB gerou
    res.status(201).json({
      mensagem: "Vaga criada com sucesso!",
      id: vaga._id
    });
  } catch(error) {
    console.error("Erro ao criar vaga: ", error);
    res.status(500).json({mensagem: "Erro interno ao criar a vaga"});
  }
};

// metodo http get para buscar vagas da api adzuna
const buscarVagasAdzuna = async (req, res) => {
  try{
    //variavel para dados da adzuna utilizando .env
    const urlAdzuna = process.env.URL_ADZUNA;
    //Servidor vai para Adzuna e busca dados
    const resposta = await axios.get(urlAdzuna);
    const vagasExternas = resposta.data.results;

    //A REPENSAR
    //Mapeamento de adzuna para o MongoDB
    const promessasDeRegistro = vagasExternas.map(vaga => {
      const vagaFormatada = {
        name: vaga.title || "Sem nome",
        id_vaga_external: vaga.id,
        title: vaga.title,//required é obrigatorio
        description: vaga.description,
        location: vaga.location?.display_name || "Remoto / Não informado",
        redirect_url: vaga.redirect_url,
        company: vaga.company?.display_name || "Empresa Confidencial"//display name foi pq na hora de dar o post está vindo como objeto, ai pega somente o texto
      };
      //Salva no banco usando a função registrar vaga
      return registrarVaga(vagaFormatada);
    });

    //aguarda todos os registros serem processados
    await Promise.all(promessasDeRegistro);
    //Repassar os resultados direto para quem pediu
    res.status(200).json({mensagem: `${vagasExternas.length} vagas da adzuna foram processadas e sincronizadas. `});
  }catch(error) {
    console.error("ERRO ADZUNA:", error);
    res.status(500).json({erro: "Falha ao buscar vagas no Adzuna", detalhe: error.message});
  }
};

// metodo http para buscar vagas api jooble
const buscarVagasJooble = async (req, res) => {
  try{
    const urlJooble = process.env.URL_JOOBLE;
    //filtros para buscar
    const filtrosBuscas = {
      "keywords": "junior OR trainee OR estágio OR estagiário OR intern OR \"entry level\"",
      "location": "Brazil"
    }
    // O servidor faz um POST para o jooble usando biblioteca axios
    //eh enviado a url e depois os filtros de busca
    const respostaDojooble = await axios.post(urlJooble, filtrosBuscas);
    //pegar resposta da api jooble e repassar a mensagem
    res.status(200).json(respostaDojooble.data);
  } catch(error){
    console.error("Erro ao buscar no jooble: ", error);
    res.status(500).json({mensagem: "Deu ruim na busca com o Jooble"});
  }
};

//exportar para outros arquivos
module.exports = {
    buscarVagas,
  buscarVagaPorId,
    criarVagas,
    buscarVagasAdzuna,
    buscarVagasJooble
}