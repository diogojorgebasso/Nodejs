const { Schema, model } = require('mongoose');

const ProdutosSchema = new Schema({
  nomeProdutos: String,
  descricaoProdutos: String,
  fotoProdutos: String,
  diaProdutos: String,
  quantidadeProdutos: Number,
  dono:{
    type: Schema.Types.ObjectId,
    ref: 'Dono'
  }
}, {
  toJSON:{
    virtuals: true
  }
});





ProdutosSchema.virtual('fotoProdutos_url').get(function(){
  return `http://localhost:3333/files/${this.fotoProdutos}`;
});

module.exports = model('Produtos', ProdutosSchema);
