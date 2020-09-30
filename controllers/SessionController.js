const User = require('../models/User');

class SessionController{
  async store(req,res){
    const { email, nome, cpf, saldo } = req.body;

    const { produto_id } = req.headers;

    const usuario = await User.create({
      carrinho: produto_id,
      email,
      nome,
      cpf,
      saldo,
    });

    return res.json({usuario})
  }
}


module.exports = new SessionController();
