const Produtos = require('../models/Produtos');
const Dono = require('../models/Dono');


class ProdutosController{

  async index(req,res){
    const { nomeProdutos } =req.query;

    const produtosDisponiveis = await Produtos.find({nomeProdutos})

    return res.json(produtosDisponiveis)
  }

  async store(req, res){
    const { filename } = req.file;
    const { nomeProdutos, descricaoProdutos, diaProdutos, quantidadeProdutos} = req.body;
    const { dono_id } = req.headers;

    const produtos = await Produtos.create({
      dono: dono_id,
      fotoProdutos: filename,
      nomeProdutos,
      descricaoProdutos,
      diaProdutos,
      quantidadeProdutos,
    });

    return res.json(produtos)
  }

  async update(req,res){
    const { filename } = req.file;
    const { produtos_id } = req.params;
    const { nomeProdutos, descricaoProdutos, diaProdutos, quantidadeProdutos} = req.body;
    const { dono_id } = req.headers; //id do dono que colocou, teoricamente, o produto

    //comeca a checagem para ver se o usuário que está alterando o produto, é o mesmo que está
    //logado
    const dono = await Dono.findById(dono_id);
    const produtosChecagem = await Produtos.findById(produtos_id);

    if (String(dono._id) !== String(produtosChecagem.dono)){
      return res.status(401).json({error: 'Usuário não autorizado...'});
    }
    //acaaba a checagem

    await Produtos.updateOne({ _id: produtos_id}, {
      dono: dono_id,
      fotoProdutos: filename,
      nomeProdutos,
      descricaoProdutos,
      diaProdutos,
      quantidadeProdutos,
    });

    return res.send();
  }

  async destroy(req,res){
    const {produtos_id} = req.body; //produto_id caso não // DEBUG:
    const {dono_id} = req.headers;

    await Produtos.findByIdAndDelete({_id: produtos_id});
    
    return res.json({message: "Excluida com exímio"});
  }
}



module.exports = new ProdutosController();
