// arquivo main
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

const mongoose = require('mongoose');
const app = require('../src/utils/app'); //importando o app

const port = 3000;

const baseUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOSTS}/${process.env.DB_NAME}`;
const uri = process.env.DB_OPTIONS ? `${baseUri}?${process.env.DB_OPTIONS}` : baseUri;


async function run() {
  try {
    // Tenta conectar ao MongoDB
    await mongoose.connect(uri);
    console.log("Conectado com sucesso ao MongoDB!");
    // Só sobe o servidor Express se a conexão funcionar
    app.listen(port, () => {
      console.log(`Servidor rodando na porta: ${port}`);
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
  }
}

run();