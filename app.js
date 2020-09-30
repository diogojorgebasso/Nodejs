//APLICAÇÃO PRINCIPAL

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');

class App {
  constructor() {
    //PACOTE QUE FACILITA A INICIALIAZAÇÃO DO SERVER
    this.server = express();

    //conecta com o servidor
    mongoose.connect('mongodb+srv://Devhouse:Devhouse@cluster0-ysyon.mongodb.net/test?retryWrites=true&w=majority', {
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
