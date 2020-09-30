const { Router } = require('express');
const multer = require('multer');
const UploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const DonoController = require('./controllers/DonoController');
const MotoristaController = require('./controllers/MotoristaController');
const ProdutosController = require('./controllers/ProdutosController');

const routes = new Router();
const upload = multer(UploadConfig);

routes.post('/sessions', SessionController.store);
routes.post('/motorista', MotoristaController.store);
routes.post('/dono', upload.single('fotoLoja'), DonoController.store);
routes.post('/produtos', upload.single('fotoProdutos') /*Quantas imagens a pessoa pode enviar por produto?*/ ,ProdutosController.store);

//lista todos os produtos disponíveis
routes.get('/produtos', ProdutosController.index);

//atualiza produtos
routes.put('/produtos/:produtos_id', upload.single('fotoProdutos'), ProdutosController.update);

routes.delete('/produtos', ProdutosController.destroy)

module.exports = routes;
