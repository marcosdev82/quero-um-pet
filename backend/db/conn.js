const mongoose = require('mongoose')


// Configurações da conexão
const dbUser = 'marcos';
const dbPassword = 'getapet';
const dbHost = 'mongo'; // Nome do serviço conforme definido no docker-compose
const dbPort = 27017;   // Porta padrão do MongoDB
const dbName = 'getapet'; // Substitua pelo nome do seu banco de dados, se necessário

// String de conexão
const mongoURI = `mongodb://127.0.0.1:27017/getapet`;
 

async function main() {
    await mongoose.connect(mongoURI)
    console.log('Conectou ao mongoose')
}

main().catch((err) => console.log('Erro ao conectar ao MongoDB:', err))

module.exports = mongoose  