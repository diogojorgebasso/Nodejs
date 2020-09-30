const { Schema, model } = require('mongoose');

const MotoristaSchema = new Schema({
  thumbnail: String,
  email: String,
  nome: String,
  cpf: Number,
  placa: String,
  saldo: Number,
  senha: String,
  telefone: Number,
  qualificacoes: String
});

module.exports = model('Motorista', MotoristaSchema);
