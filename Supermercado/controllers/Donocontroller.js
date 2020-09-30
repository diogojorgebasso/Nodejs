const Empresa = require('../models/Dono');


class DonoController{
  async store(req, res){
    const { filename } = req.file;
    const { nome, cnpj, description } = req.body;

    const dono = await Empresa.create({
      fotoLoja: filename,
      nome,
      cnpj,
      description
    });


    return res.json(dono)
  }
}

module.exports = new DonoController();
