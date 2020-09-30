const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  email: String,
  nome: String,
  cpf: Number,
  saldo: Number,
  pedidos:{
    type: Schema.Types.ObjectId,
    ref: 'Produtos'
  }
});

module.exports = model('User', UserSchema);
