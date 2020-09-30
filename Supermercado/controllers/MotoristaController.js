class MotoristaController{
  async store(req, res){
    return res.json({ ok: true})
  }
}



module.exports = new MotoristaController();
