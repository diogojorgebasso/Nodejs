//APLICAÇÃO PRINCIPAL
/*eslint-env es6*/
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');

class App {
  constructor() {
    this.server = express();

    //conecta com o servidor
    mongoose.connect('urlforMongoServices', { //change for your url Server
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.middleware();
    this.routes();
  }
  middleware(){
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads'))

    );
    this.server.use(express.json());

  }
  routes(){
    this.server.use(routes);
  }
}

module.exports = new App().server;
