const { Schema, model } = require('mongoose');

const DonoSchema = new Schema({
  fotoLoja: String,
  nome: String,
  cnpj: Number,
  description: String,
});

module.exports = model('Dono', DonoSchema);
