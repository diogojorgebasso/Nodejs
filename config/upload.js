const multer = require('multer');
const path = require('path');

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..',  '..', 'uploads'), // Indo para a pasta de uploads, salvar a imagem que o usuário envia
    filename: (req,file,cb) =>{ //muda o nome da imagem a fim de padroniza-la
      const ext = path.extname(file.originalname);

      cb(null, `Foto-${Date.now()}${ext}`); //Cria a imagem
    },
  })
};
